import { useState } from 'react'
import Calculator from './monitor/Calculator'
import Search from './product/Search';
import CheckoutForm from './CheckoutForm';
import Swal from 'sweetalert2'

const Monitor = ({products}) => {

    const [orders, setOrders] = useState([]);
    const [cj, setCj] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentSearch, setCurrentSearch] = useState(null)

    const addtoCart = (product, reqQty, currentStock) => {
        //console.log(product)
        //console.log('reqQty >>',reqQty)

       
        let findProd = orders.find( (order) => order.product.product_id === product.product_id )
        let findCj = cj.find( (order) => order.product_id === product.product_id )

        if(findProd || findCj){

            const findProdInCart = orders.find( (order) => order.product.product_id === product.product_id )

            //check stock
            let stockTotal = currentStock
            let stockReq = reqQty
            let inCartQty = findProdInCart.quantity
            let stockAvailable = (parseInt(stockTotal) - (parseInt(inCartQty) + parseInt(stockReq)))
            // console.log('stockTotal>>',stockTotal)
            // console.log('stockReq>>',stockReq)
            // console.log('qtyCart>>',inCartQty)
            // console.log('stockAvailable>>',stockAvailable)

            if(stockAvailable < 0){
                Swal.fire({
                    icon: 'error',
                    text: 'ไม่สามารถเพิ่มจำนวนสินค้านี้ได้ เนื่องจากคุณเพิ่มสินค้านี้ไว้ในรถเข็นแล้ว '+ inCartQty +' ชิ้น',
                    confirmButtonText: 'ตกลง'
                })
                return false
            }

            //** UPDATE Orders State
            //let findUpd = {...findProdInCart}
            let findUpdQty = parseInt(findProdInCart.quantity) + parseInt(reqQty)
            // console.log('findInCart>>',findProdInCart)
            // console.log(findUpdQty)
            // const updOrderWithQty = {
            //     "product" : findUpd,
            //     "quantity" : findUpdQty
            // }
            setOrders(orders.map( (order) =>
                order.product.product_id === findProdInCart.product.product_id ? { ...order, quantity : findUpdQty } : order
            ));

            //**UPDATE CJ State
            const findProdCjInCart = cj.find( (order) => order.product_id === product.product_id )
            let findUpdCjQty = parseInt(findProdCjInCart.qty) + parseInt(reqQty)
            setCj(cj.map( (order) => 
                order.product_id === findProdCjInCart.product_id ? { ...order, qty: findUpdCjQty } : order
            ));
        }else{
            //console.log('currentStock>>',currentStock)
            if(currentStock === 0){
                Swal.fire({
                    icon: 'error',
                    text: 'สินค้าหมดชั่วคราว',
                    confirmButtonText: 'ตกลง'
                })
                return false
            }

            const prodSelect = {...product}
            const newOrder = {
                "product" : prodSelect,
                "quantity" : reqQty
            }
            setOrders([...orders, newOrder])

            const newOrderCj = {
                "product_id" : product.product_id,
                "sku": product.sku,
                "name" : product.name,
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
    // console.log('cj>>',cj)


    
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
                    <Search onAdd={addtoCart} onSearchInProgress={onSearchInProgress} currentSearch={currentSearch} />
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