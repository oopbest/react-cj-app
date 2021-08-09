import { ReactComponent as Logo } from "../logo.svg";

const Header = () => {
    return ( 

        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container-fluid">
                <Logo className="mt-2 me-2"/>
                {/* <Link className="navbar-brand fw-bold" to="/">Business Insight</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">ภารรวมทุกช่องทาง</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">การเข้าชม</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">สินค้า</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">ยอดขาย</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">ลูกค้า</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">ลงทะเบียน</Link>
                        </li>
                    </ul>
                </div> */}
            </div>
        </nav>

     );
}
 
export default Header;