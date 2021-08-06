import { useState } from 'react'
import Calculator from './monitor/Calculator'
import axios from 'axios';
import Search from './product/Search';
import CheckoutForm from './CheckoutForm';

const Monitor = ({products}) => {

    const [orders, setOrders] = useState([]);
    const [cj, setCj] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentSearch, setCurrentSearch] = useState(null)
    const [defaultQty, setDefaultQty] = useState(1);

    const addtoCart = (product, reqQty) => {
        //console.log(product)
        //console.log('reqQty >>',reqQty)

        let findProd = orders.find( (order) => order.product.product_id === product.product_id )
        let findCj = cj.find( (order) => order.product_id === product.product_id )

        if(findProd || findCj){

            const findProdInCart = orders.find( (order) => order.product.product_id === product.product_id )
            //let findUpd = {...findProdInCart}
            let findUpdQty = parseInt(findProdInCart.quantity) + parseInt(reqQty)
            console.log('findInCart>>',findProdInCart)
            console.log(findUpdQty)
            // const updOrderWithQty = {
            //     "product" : findUpd,
            //     "quantity" : findUpdQty
            // }
            setOrders(orders.map( (order) =>
                order.product.product_id === findProdInCart.product.product_id ? { ...order, quantity : findUpdQty } : order
            ));

            const findUpdCj = {...findCj}
            const updOrderWithQtyCj = {
                "product_id" : findUpdCj,
                "qty" : findUpdQty
            }
            setCj(cj.map( (order) => 
                order.product_id === findProd.product_id ? { ...order, updOrderWithQtyCj } : order
            ));
        }else{
            const prodSelect = {...product}
            const newOrder = {
                "product" : prodSelect,
                "quantity" : reqQty
            }
            setOrders([...orders, newOrder])

            const newOrderCj = {
                "product_id" : product.product_id,
                "qty" : reqQty,
                "price" : 0
            }
            setCj([...cj, newOrderCj])
            
        }
        //Summary
        let orderTotal = totalPrice + (parseInt(product.price) * parseInt(reqQty))
        setTotalPrice(orderTotal)
    }
    // console.log('orders>>',orders)
    // console.log('cj>>',orders)


    
    const deleteItem = (item) => {
        // console.log(item)
        let findProd = orders.find( (order) => order.product.product_id === item.product.product_id )
        let updOrder = orders.filter( (order) => order.product.product_id !== item.product.product_id);

        let updOrderCj = cj.filter( (order) => order.product_id !== item.product.product_id);

        // console.log(findProd)
        const orderTotal = totalPrice - (parseInt(findProd.quantity) * parseInt(findProd.product.price))
        setOrders(updOrder)
        setCj(updOrderCj)
        setTotalPrice(orderTotal)
    }

    const onSearchInProgress = (product) => {
        setCurrentSearch(product)
    }

    const clearOrderData = () => {
        setOrders([])
        setCj([])
        setTotalPrice(0)
        setCurrentSearch(null)
    }
    
    return (
        <div className="container-fluid">
            
            <div className="row">
                <div className="col-md-6">
                    <Search onAdd={addtoCart} onSearchInProgress={onSearchInProgress} currentSearch={currentSearch} defaultQty={defaultQty} />
                </div>
                <div className="col-md-6">
                    <Calculator totalPrice={totalPrice} orders={orders} onDel={deleteItem}/>
                    
                    {orders.length > 0 && 
                        <CheckoutForm orders={orders} cjOrders={cj} onClearData={clearOrderData}/>}
                </div>
            </div>
        </div>
    );
}
 
export default Monitor;