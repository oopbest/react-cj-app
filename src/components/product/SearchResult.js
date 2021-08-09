const SearchResult = ({currentSearch, onAdd, qtyStart, incrementQty, decrementQty, resetQty}) => {
    const currentStockProd = currentSearch.qty

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

                    <div className="d-grid gap-2 col-md-4 mx-auto">
                        <div className="input-group">
                            <button type="button" className="btn btn-outline-dark" onClick={ decrementQty }>
                                -
                            </button>
                            <input type="text" className="form-control text-center" namme="quantity" value={ qtyStart } readOnly/>
                            <button type="button" className="btn btn-outline-dark" onClick={ incrementQty }>
                                +
                            </button>
                            {/* <button className='reset' onClick={resetQty}>Reset</button> */}
                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-center p-3">
                        <small className="text-danger">เหลือสินค้าอยู่ {currentStockProd} ชิ้น</small>
                    </div>

                    <div className="mt-3 d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-dark fs-4" onClick={ () => onAdd(currentSearch, qtyStart, currentStockProd) }>เพิ่มรายการ</button>
                    </div>
                    
                </div> 
            }
        </div>
     );
}
 
export default SearchResult;