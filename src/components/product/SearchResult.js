import { useState } from 'react'
import { QuantityPicker } from 'react-qty-picker';

const SearchResult = ({currentSearch, onAdd, defaultQty}) => {
    // console.log('searhResult>>',defaultQty)
    const [qty, setQty] = useState(1)

    const currentStockProd = currentSearch.qty
    const getPickerQty = (value) =>{
        // console.log('pickerQty >>',value)
        setQty(value)
    }

    return ( 
        <div>
            {currentSearch.status_code === "01" ? 
                <h4 className="text-center pt-3 text-danger">ไม่พบสินค้า</h4> :
                <div className="row"> 
                    {/* <div>
                        <strong>Output:</strong>
                        <br />
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                        
                    </div> */}
                    <div className="col-5 mb-3 col-4 mx-auto text-center">
                        <img src={currentSearch.thumbnail} alt={currentSearch.name} className="img-thumbnail" />
                    </div>
                    <div className="text-center">
                        <h5>{currentSearch.name}</h5>
                    </div>

                    <div className="d-flex justify-content-center">
                        <QuantityPicker value={defaultQty} min={1} max={currentStockProd} onChange={getPickerQty} smooth />
                    </div>
                    <div className="d-flex justify-content-center p-3">
                        <small className="text-danger">เหลือสินค้าอยู่ {currentStockProd} ชิ้น</small>
                    </div>

                    <div className="mt-3 d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-dark fs-4" onClick={ () => onAdd(currentSearch, qty) }>เพิ่มรายการ</button>
                    </div>
                    
                </div> 
            }
        </div>
     );
}
 
export default SearchResult;