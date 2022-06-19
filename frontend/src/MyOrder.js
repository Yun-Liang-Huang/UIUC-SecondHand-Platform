import './MyOrder.css';
import OrderItem from './OrderItem';
import USER_ID from './Constant'; 
import API from './Api'; 
import {useState, useEffect} from "react";

function MyOrder() {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        let url = '/order/'+USER_ID;
        API.get(url)
        .then(response => {
            setOrderItems(response.data.result.reverse());
        });
    }, []);

    return(
        <div className='order'>
            <div className='order_title'>My Order</div>
            {orderItems.length > 0
            ? <div className='order_field'>
                {orderItems.map(item => (
                    <OrderItem id={item.Order_ID} product_id={item.Product_ID} name={item.Product_Name} price={item.Price} quantity={item.Quantity} image_url={item.Image_Url} order_date={item.Order_Date}></OrderItem>
                ))}</div>
            : <a className='order_message'>You have not placed any orders</a>}
        </div>
    );
}
export default MyOrder; 