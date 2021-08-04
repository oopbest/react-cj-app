import { useState } from 'react'
import Calculator from './monitor/Calculator'
import axios from 'axios';
import Search from './product/Search';

const Monitor = ({products}) => {

    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [confirm, setConfirm] = useState(false)
    const [msg, setMsg] = useState('')

    const addtoCart = (product) => {
        // console.log(product)
        // console.log(orders)
        let findProd = orders.find( (order) => order.product.product_id === product.product_id )
        if(findProd){
            const findUpd = {...findProd}
            const updOrderWithQty = {
                "product" : findUpd,
                "quantity" : findProd.quantity++
            }
            setOrders(orders.map( (order) => 
                order.product.product_id === findProd.product_id ? { ...order, updOrderWithQty } : order
            ));

        }else{
            const prodSelect = {...product}
            const newOrder = {
                "product" : prodSelect,
                "quantity" : 1
            }
            setOrders([...orders, newOrder])
        }
        //Summary
        let orderTotal = totalPrice + parseInt(product.price)
        setTotalPrice(orderTotal)
    }
    const deleteItem = (item) => {
        // console.log(item)
        let findProd = orders.find( (order) => order.product.product_id === item.product.product_id )
        let updOrder = orders.filter( (order) => order.product.product_id !== item.product.product_id);

        // console.log(findProd)
        const orderTotal = totalPrice - (parseInt(findProd.quantity) * parseInt(findProd.product.original_price))
        setOrders(updOrder)
        setTotalPrice(orderTotal)
    }

    const cancelOrder = () => {
        setTotalPrice(0)
        setOrders([])
        setConfirm(false)
    }

    const checkoutOrder = () => {
        // console.log(orders)
        // console.log(totalPrice)

        if(orders && orders.length > 0){
            axios({
                method: 'post',
                url: 'http://localhost:5000/orders',
                data: {
                    orderDate: new Date(),
                    totalPrice: totalPrice,
                    orders: orders
                }
            })
            .then(res => {
                setTotalPrice(0)
                setOrders([])
                setConfirm(true)
                setMsg('The order has been saved successfully')
            });
        }else{
            setTotalPrice(0)
            setOrders([])
            setConfirm(true)
            setMsg('Please select a product')
        }
    }
    
    return (
        <div className="container-fluid">
            {/* {confirm &&
                <div className="alert alert-secondary title text-end">{msg}</div>} */}
            
            <div className="row">
                <div className="col-md-6">
                    <Search onAdd={addtoCart}/>
                </div>
                <div className="col-md-6">
                    <Calculator totalPrice={totalPrice} orders={orders} onDel={deleteItem} onCancel={cancelOrder} onConfirm={checkoutOrder}/>
                </div>
            </div>
        </div>
    );
}
 
export default Monitor;