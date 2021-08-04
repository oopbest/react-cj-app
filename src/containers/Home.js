import { useEffect,useState } from 'react'
import Header from "./Header"
import Monitor from '../components/Monitor'
import axios from 'axios'

const Home = () => {

    //## Fetch All Products by AXIOS JSON SERVER API ##
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products')
            // console.log(response);
            // console.log(response.data);
            return response.data
        } catch (err) {
            return "";
        }
    };

    useEffect(() => {
        const getProducts = async () => {
           const getProdsFromServer = await fetchProducts()
           setProducts(getProdsFromServer)
        }
        getProducts()
     }, [])

    return (
        <div>
            <Header />
            <Monitor products={products} />
        </div>
    );
}
 
export default Home;