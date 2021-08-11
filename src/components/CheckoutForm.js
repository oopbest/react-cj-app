import React, { useState } from "react";
import axios from "axios"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2'

const CheckoutForm = ({orders, cjOrders, onClearData}) => {

    //**TELEPHONE FORMAT "xxx-xxx-xxxx"
    // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

    //**TELEPHONE FORMAT no dash
    const phoneRegExp = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/
    const zipcodeRegExp = /^\d{5}(-\d{5})?(?!-)$/

    //console.log("orders >>",cjOrders)
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const validationSchema = Yup.object().shape({
        fname: Yup.string().required('โปรดระบุ ชื่อ'),
        lname: Yup.string().required('โปรดระบุ นามสกุล'),
        street: Yup.string().required('โปรดระบุ ที่อยู่').max(100, 'Max characters 100 digits'),
        telephone: Yup.string().matches(phoneRegExp, 'ระบุ เบอร์โทรศัพท์ ไม่ถูกต้อง'),
        region: Yup.string().required('โปรดระบุ จังหวัด'),
        city: Yup.string().required('โปรดระบุ อำเภอ'),
        postcode: Yup.string().matches(zipcodeRegExp, 'ระบุ รหัสไปรษณีย์ ไม่ถูกต้อง'),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = (data) => {
        setLoading(true);
        setIsError(false);
        // console.log(data)
        // console.log(JSON.stringify(data, null, 2));

        const apiData = {
            origin: "*",
            credentials: true,
            currency_id: "THB",
            email: "mockup@topvalue.com",
            shipping_address: {
                firstname: data.fname,
                lastname: data.lname,
                street: data.street,
                city: data.city,
                country_id: "TH",
                region: data.region,
                postcode: data.postcode,
                telephone: data.telephone
            },
            items: cjOrders
        }
        //console.log('apiData>>',apiData)


        if(orders && orders.length > 0){
            axios.request({
                method: 'post',
                url: 'https://topvalue.me/topvalue_cj/order/create',
                params: apiData,
            }).then(response => {
                console.log("checkout >>",response.data);
                
                reset();
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'รายการสั่งซื้อถูกสร้างเรียบร้อยแล้วโปรดชำระเงินในขั้นตอนถัดไป',
                    html:
                        '<p>เลขที่คำสั่งซื้อ : ' + response.data.order_id +'</p>'+
                        '<p>'+response.data.customer_firstname +' '+ response.data.customer_lastname +'</p>'+
                        '<p>'+response.data.customer_tel+'</p>',
                    showCloseButton: true,
                    showConfirmButton: false,
                })
                onClearData()
            })
            .catch(err => {
                console.log('errorCheckout>>',err.response)

                if(err.response.status === 400){
                    let products = err.response.data.saleable
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        //title: err.response.data.message,
                        title: 'แจ้งเตือนสินค้าคงเหลือ',
                        html: products.map( (prod) => 
                            '<p>'+ prod.sku +" "+ prod.name +" คงเหลือ "+ prod.saleable_qty +'</p>'),
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }

                setLoading(false);
                setIsError(true);
                onClearData()
            });
        }else{
            onClearData()
        }
    };

    return ( 
        <div className="checkout-form">
            <hr />
            <form className="row g-3 mb-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="col">
                    <label htmlFor="fname" className="form-label">ชื่อ</label>
                    <input
                        name="fname" id="fname"
                        type="text"
                        {...register('fname')}
                        className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.fname?.message}</div>
                </div>

                <div className="col">
                    <label htmlFor="lname" className="form-label">นามสกุล</label>
                    <input
                        name="lname" id="lname"
                        type="text"
                        {...register('lname')}
                        className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.lname?.message}</div>
                </div>

                <div className="col-12">
                    <label htmlFor="street" className="form-label">ที่อยู่</label>
                    <input
                        name="street" id="street"
                        type="text"
                        {...register('street')}
                        className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.street?.message}</div>
                </div>

                <div className="col-12">
                    <label htmlFor="telephone" className="form-label">เบอร์โทร</label>
                    <input
                        name="telephone" id="telephone"
                        type="text"
                        {...register('telephone')}
                        className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.telephone?.message}</div>
                </div>

                <div className="col-6">
                    <label htmlFor="region" className="form-label">จังหวัด</label>
                    <input
                        name="region" id="region"
                        type="text"
                        {...register('region')}
                        className={`form-control ${errors.region ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.region?.message}</div>
                </div>

                <div className="col-6">
                    <label htmlFor="city" className="form-label">อำเภอ</label>
                    <input
                        name="city" id="city"
                        type="text"
                        {...register('city')}
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.city?.message}</div>
                </div>

                <div className="col-6">
                    <label htmlFor="postcode" className="form-label">รหัสไปรษณีย์</label>
                    <input
                        name="postcode" id="postcode"
                        type="text"
                        {...register('postcode')}
                        className={`form-control ${errors.postcode ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.postcode?.message}</div>
                </div>
                <div className="col-6">
                    <p className="text-danger pt-4">* โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยัน</p>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-danger fs-5" disabled={loading}>
                        {loading && <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                    </div>}
                        {!loading && <span>ยืนยันรายการสั่งซื้อ</span>}
                    </button>
                </div>
                <div className="d-grid gap-2">
                    <input type="button" className="btn btn-secondary fs-5" value="ล้างข้อมูล" disabled={loading} onClick={() => {
                        reset({
                            fname: "",
                            lname: "",
                            street: "",
                            telephone: "",
                            region: "",
                            city: "",
                            postcode: "",
                        }, {
                            keepErrors: true, 
                            keepDirty: true,
                            keepIsSubmitted: false,
                            keepTouched: false,
                            keepIsValid: false,
                            keepSubmitCount: false,
                        });
                    }} />
                </div>
            </form>
            {/* <button className="btn btn-secondary title" onClick={onCancel}>Cancel</button> */}
        </div>
     );
}
 
export default CheckoutForm;