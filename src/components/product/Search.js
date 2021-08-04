import React, { useState, useEffect } from "react";
import axios from "axios"

const Search = ({onAdd}) => {

    const [name, setName] = useState('120025142');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);
  
    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);

        const apiData = {
            origin: "*",
            credentials: true,
            sku: name,
            // cust_search: 'CJO2000000024',
            // so_status: 'pending'
        }
        axios.request({
            //--GET
            method: 'get',
            url: 'https://topvalue.me/topvalue_cj/search/product/filtered',
            //url: 'https://topvalue.me/topvalue_cj/order/search',
            // url: 'https://topvalue.me/aaa/test.txt',
            params: apiData,
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            console.log(response.data);
            setData(response.data)
            setName('');
            setLoading(false);
        })
        .catch(err => {
            // console.log(err)
            setLoading(false);
            setIsError(true);
        });


    }

    return (
        <div className="container p-3">
            <div className="form-group">
                {/* <label htmlFor="name">SKU</label> */}
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter SKU"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>

            {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}

            <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>

            {data && 
                <div className="row"> 
                    {/* <div>
                        <strong>Output:</strong>
                        <br />
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                        
                    </div> */}
                    <div className="col-5 mb-3 col-4 mx-auto text-center">
                        <img src={data.thumbnail} alt={data.name} className="img-thumbnail" />
                    </div>
                    <h5>{data.name}</h5>

                    <div className="mt-3 d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-dark" onClick={ () => onAdd(data) }>ADD TO CART</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search