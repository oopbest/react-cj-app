import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <div className="container-fluid">
            <div className="row">
                <div className="col text-left">
                    <Link className="text-decoration-none" to="/">
                        <img style={{height: 50}} src="/images/logo/logo.svg" alt="" />
                    </Link>
                </div>
                {/* <div className="col-md-4 text-end">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <Link className="text-success text-decoration-none" to="/">หน้าหลัก</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link className="text-success text-decoration-none" to="/orders">รายการสั่งซื้อ</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link className="text-success text-decoration-none" to="/products">รายการสินค้า</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link className="text-success text-decoration-none" to="/about">เกี่ยวกับเรา</Link>
                        </li>
                    </ul>
                </div> */}
            </div>
            <hr />
        </div>
     );
}
 
export default Header;