import { FaTrash } from "react-icons/fa"
import Loading from "./Loading";


const List = (props) => {

    const filterData = props.data?.filter((item) => item.type === props.type)

    const formatToRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR'
        }).format(number);
    };

    return (
        <div className={`col-4 bg-${props.bg} bg-primary px-3 py-3`} style={{
            borderRadius: '5px',
        }}>
            <h2 className="text-white text-center">
                {props.type === "expense" ? "Pengeluaran" : "pemasukan"}
            </h2>


            {props.loading ? (<Loading />) : (<>
                <h3 className="text-center text-white ">
                    {formatToRupiah(
                        filterData?.reduce((acc, curr) => acc + curr.nominal, 0)
                    )}
                </h3>
                <ul className="list-group mt-3">
                    {filterData?.map((item) => (
                        <li className="list-group-item justify-content-between d-flex" key={item.id}>
                            <span>{item.name}</span>
                            <div>
                                <span>{formatToRupiah(item.nominal)}</span>
                                <FaTrash
                                    className="text-danger"
                                    size={16}
                                    style={{
                                        marginLeft: "10px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => props.removeData(item.id)}
                                />
                            </div>

                        </li>
                    ))}
                </ul>
            </>)}

        </div >
    )
}

export default List