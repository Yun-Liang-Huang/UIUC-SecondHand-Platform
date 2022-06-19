import './ShoppingCart.css';
import CartItem from './CartItem';
import API from './Api'; 
import USER_ID from './Constant'; 
import {useState, useEffect} from "react";

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = () => {
        let url = '/cart/'+USER_ID;
        API.get(url)
        .then(response => {
            setCartItems(response.data.result);
        });
    }

    return(
        <div className='cart'>
            <div className='cart_title'>Shopping Cart</div>
            {cartItems.length > 0
            ? <div className='cart_field'>
                {cartItems.map(item => (
                    <CartItem id={item.Product_ID} name={item.Product_Name} price={item.Price} quantity={item.Quantity} image_url={item.Image_Url} onRefresh={fetchApi}></CartItem>
                ))}</div>
            : <a className='cart_message'>Your Cart is empty</a>}
        </div>
    );
}
export default ShoppingCart; 