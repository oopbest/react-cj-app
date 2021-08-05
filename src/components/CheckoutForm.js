import React, { useState, useEffect } from "react";
import axios from "axios"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const CheckoutForm = ({cjOrders}) => {

    //console.log("orders >>",cjOrders)

    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const validationSchema = Yup.object().shape({
        // fname: Yup.string().required('Firstname is required'),
        // lname: Yup.string().required('Lastname is required'),
        // street: Yup.string().required('Street is required'),
        // telephone: Yup.number().required('Telephone is required'),
        // region: Yup.string().required('Region is required'),
        // city: Yup.string().required('City is required'),
        // postcode: Yup.number().required('Postcode is required'),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {

        const apiData = {
            "currency_id": "THB",
            "email": "mockup@topvalue.com",
            "shipping_address": {
                "firstname": "david",
                "lastname": "beck",
                "street": "1111/11 england",
                "city": "Bangsue",
                "country_id": "TH",
                "region": "Bangkok",
                "postcode": "10800",
                "telephone": "0882605611"
            },
            "items": [
                {
                    "product_id": 102839,
                    "qty": 2,
                    "price": 0
                }
            ]
        }
        console.log(apiData)

        axios.request({
          //--POST
          method: 'post',
          //url: 'https://topvalue.me/topvalue_cj/order/refund',
          url: 'https://topvalue.me/topvalue_cj/order/create',
          params: JSON.stringify(apiData),
          headers: {
            "Content-Type": "application/json",
          }
    
        }).then(response => {
          console.log(response.data);
        })
        .catch(err => console.log(err.response));
    }, []);


    const onSubmit = data => {
        setLoading(true);
        setIsError(false);
        // console.log(data)
        // console.log(JSON.stringify(data, null, 2));


        // const apiData = {
        //     origin: "*",
        //     credentials: true,
        //     currency_id: "THB",
        //     email: "mockup@topvalue.com",
        //     shipping_address: {
        //         firstname: data.fname,
        //         lastname: data.lname,
        //         street: data.street,
        //         city: data.city,
        //         country_id: "TH",
        //         region: data.region,
        //         postcode: data.postcode,
        //         telephone: data.telephone
        //     },
        //     items: cjOrders
        // }

        const apiData = {
            "origin": "*",
            "credentials": true,
            "currency_id": "THB",
            "email": "mockup@topvalue.com",
            "shipping_address": {
                "firstname": "david",
                "lastname": "beck",
                "street": "1111/11 england",
                "city": "Bangsue",
                "country_id": "TH",
                "region": "Bangkok",
                "postcode": "10800",
                "telephone": "0882605611"
            },
            "items": [
                {
                    "product_id": 102839,
                    "qty": 2,
                    "price": 0
                }
            ]
        }

        console.log(apiData)
        axios.request({
            method: 'post',
            url: 'https://topvalue.me/topvalue_cj/order/create',
            params: apiData,
        }).then(response => {
            console.log("checkout >>",response.data);
        })
        .catch(err => {
            console.log(err)
        });

    };

    return ( 
        <div className="checkout-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                <label>ชื่อ</label>
                <input
                    name="fname"
                    type="text"
                    {...register('fname')}
                    className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.fname?.message}</div>
                </div>

                <div className="form-group">
                <label>นามสกุล</label>
                <input
                    name="lname"
                    type="text"
                    {...register('lname')}
                    className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.lname?.message}</div>
                </div>

                <div className="form-group">
                <label>ที่อยู่</label>
                <input
                    name="street"
                    type="text"
                    {...register('street')}
                    className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.street?.message}</div>
                </div>

                <div className="form-group">
                <label>เบอร์โทร</label>
                <input
                    name="telephone"
                    type="text"
                    {...register('telephone')}
                    className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.telephone?.message}</div>
                </div>

                <div className="form-group">
                <label>จังหวัด</label>
                <input
                    name="region"
                    type="text"
                    {...register('region')}
                    className={`form-control ${errors.region ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.region?.message}</div>
                </div>

                <div className="form-group">
                <label>อำเภอ</label>
                <input
                    name="city"
                    type="text"
                    {...register('city')}
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.city?.message}</div>
                </div>

                <div className="form-group">
                <label>รหัสไปรษณีย์</label>
                <input
                    name="postcode"
                    type="text"
                    {...register('postcode')}
                    className={`form-control ${errors.postcode ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.postcode?.message}</div>
                </div>

                <div className="form-group">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                <button
                    type="button"
                    onClick={reset}
                    className="btn btn-warning float-right"
                >
                    Reset
                </button>
                </div>
            </form>
        </div>
     );
}
 
export default CheckoutForm;