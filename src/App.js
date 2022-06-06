import axios from "axios";
import { useState, useEffect } from "react";

import Form from "./components/Form";
import List from "./components/List";


const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false)

  const getDataFromAirTable = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer keyVGaLEBQlbn0svE"
        },
      }

      setLoading(true)
      const response = await axios.get("https://api.airtable.com/v0/appWHzrQEhVGSEqCh/Projects?maxRecords=100&view=Grid%20view", config)

      const newData = response.data.records.map(item => (
        {
          id: item.id,
          name: item.fields.name,
          description: item.fields.description,
          nominal: item.fields.nominal,
          type: item.fields.type,
        }
      ))

      setData(...data, newData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    getDataFromAirTable();
  }, []);



  const addData = async (newData) => {
    try {
      const sendData = JSON.stringify({
        records: [
          {
            fields: newData,
          },
        ],
      });
      const config = {
        headers: {
          Authorization: "Bearer keyVGaLEBQlbn0svE",
          'Content-Type': 'application/json'
        }
      }

      setPostLoading(true)
      const response = await axios.post(
        "https://api.airtable.com/v0/appWHzrQEhVGSEqCh/Projects",
        sendData,
        config
      );

      const responseData = response.data.records[0]
      const fixData = {
        id: responseData.id,
        name: responseData.fields.name,
        description: responseData.fields.description,
        nominal: responseData.fields.nominal,
        type: responseData.fields.type,

      }

      setData([...data, fixData]);
    } catch (error) {
      console.log(error)
    } finally {
      setPostLoading(false)
    }

  }

  const removeData = async (id) => {

    try {
      const axiosParams = {
        method: "delete",
        url: `https://api.airtable.com/v0/appWHzrQEhVGSEqCh/Projects/${id}`,
        headers: {
          Authorization: "Bearer keyVGaLEBQlbn0svE",
          'Content-Type': 'application/json',
        }
      };

      setLoading(true)

      await axios(axiosParams)

      const newData = data.filter((item) => item.id !== id)

      setData(newData);
      alert("berhasil delete data")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "105v bvh" }}>
      <div className="container text-white">
        <div className="row mb-4" >
          <h1 className="text-center mb-3">Aplikasi Tracking Keuangan</h1>
          <h2 className=" text-center mb-4 ">Bersama Saya</h2>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="/invoices.svg"
              alt="gambar"
              style={{
                objectFit: "scale-down",
                width: "15rem"
              }}
            />
          </div>
        </div >
        <div className="row mt-3">
          <List
            data={data}
            type="income"
            bg="primary"
            removeData={removeData}
            loading={loading}

          />
          <Form addData={addData} postLoading={postLoading} />
          <List
            data={data}
            type="expense"
            bg="success"
            removeData={removeData}
            loading={loading}
          />
        </div>
      </div >
    </div >
  )

};

export default App;