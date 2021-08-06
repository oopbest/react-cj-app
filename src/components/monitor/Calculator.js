import { Trash } from 'react-bootstrap-icons';

const Calculator = ({ totalPrice, orders, onDel}) => {

    return ( 
        <div>
            <table className="table">
                <thead className="table-light">
                    <tr>
                        {/* <td className="text-start">ID</td> */}
                        <td className="text-start">รหัสสินค้า</td>
                        <td className="text-start">ชื่อสินค้า</td>
                        <td className="text-center">จำนวน</td>
                        <td className="text-center">ลบ</td>
                    </tr>
                </thead>
                <tbody>
                    { orders.length > 0 ? orders.map( (order) => (
                        <tr key={order.product.product_id} className="text-end title">
                            {/* <td className="text-start">{order.product.product_id}</td> */}
                            <td className="text-start">{order.product.sku}</td>
                            <td className="text-start">{order.product.name}</td>
                            <td className="text-center">{order.quantity}</td>
                            <td className="text-center"><button className="btn btn-light btn-sm border-0 bg-transparent" onClick={ () => onDel(order) }><Trash className="text-danger h4"/></button></td>
                        </tr>
                    )) : <tr className="text-center text-secondary title" ><td colSpan="4">ไม่พบสินค้าในตะกร้า</td></tr>}
                </tbody>
            </table>
            <h1 className="text-end">{totalPrice}</h1>
        </div>
     );
}
 
export default Calculator;