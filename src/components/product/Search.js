import React, { useState } from "react";
import axios from "axios"
import SearchResult from "./SearchResult";

const Search = ({ onAdd, onSearchInProgress, currentSearch }) => {

    // const [sku, setSku] = useState('120025142');
    const [sku, setSku] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [qty, setQty] = useState(1);
  
    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);

        const apiData = {
            origin: "*",
            credentials: true,
            sku: sku,
        }
        axios.request({
            method: 'get',
            url: 'https://topvalue.me/topvalue_cj/search/product/filtered',
            params: apiData,
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            // console.log("product >>",response.data);
            onSearchInProgress(response.data)
            setSku('');
            setQty(1)
            setLoading(false);
        })
        .catch(err => {
            console.log('errorSearch >>',err.response)
            setLoading(false);
            setIsError(true);
        });
    }
    // console.log('currentSearch>>',currentSearch)

    const decrementQty = () =>{
        if(qty > 1){
            setQty(qty-1);
        }
    }
    const incrementQty = () =>{
        const currentStockProd = currentSearch.qty
        if(qty < currentStockProd){
            setQty(qty+1);
        }
        
    }
    const resetQty = () =>{
        setQty(1);
    }
    // console.log(qty)

    return (
        <div className="container p-3">
            <div className="form-group">
                {/* <label htmlFor="name">SKU</label> */}
                <input
                    type="text"
                    className="form-control"
                    id="sku"
                    placeholder="Enter SKU"
                    value={sku}
                    onChange={e => setSku(e.target.value)} />
            </div>

            {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}

            <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
            
            {currentSearch && 
                <SearchResult currentSearch={currentSearch} onAdd={onAdd} qtyStart={qty} incrementQty={incrementQty} decrementQty={decrementQty} resetQty={resetQty} />}
            
        </div>
    )
}

export default Search