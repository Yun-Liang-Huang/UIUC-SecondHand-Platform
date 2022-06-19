import './CartItem.css';
import axios from 'axios';
import Cover from './assets/unknown.png';
import API from './Api'; 
import USER_ID from './Constant'; 
import {useNavigate} from 'react-router-dom';

function CartItem({id, name, price, quantity, image_url, onRefresh}) {
    const navigate = useNavigate();

    const onClickDelete = () => {
        let url = '/cart/'+USER_ID+'/'+id;
        API.delete(url)
        .then(response => {
            onRefresh();
        });
    }

    const onQtyChange = e => {
        if(parseInt(e.target.value) === 0) {
            onClickDelete();
        }
        else {
            let url = '/cart/'+USER_ID+'/'+id;
            API.put(url, {
                Student_ID: USER_ID,
                Product_ID: id,
                Quantity: parseInt(e.target.value)
            })
            .then(response => {
                onRefresh();
            });
        }
    }

    const onClickComment = e => {
        let url = '/sp22-cs411-team063-Bucks/comments/'+id;
        navigate(axios.getUri({url: url}));
    }

    const onClickCheckout = e => {
        API.post('/order', {
            Buyer_ID: USER_ID,
            Product_ID: id,
            Quantity: quantity
        })
        .then(response => {
            let url = '/cart/'+USER_ID+'/'+id;
            API.delete(url)
            .then(response => {
                navigate(axios.getUri({url: '/sp22-cs411-team063-Bucks/orders'}));
            });
        });
    }

    return(
        <div className='cart_holder'>
            {image_url !== null 
            ? <img src={image_url+".jpg"}></img>
            : <img src={Cover}></img>}
            <div className='cart_item'>
                <div className='cart_product_name' onClick={onClickComment}>{name}</div>
                <div className='cart_selection'>
                    <select name="quantity" value={quantity} onChange={onQtyChange}>
                        <option value="0">0 (Delete)</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <a onClick={onClickDelete}>Delete</a>
                    <div className='cart_buy' onClick={onClickCheckout}>Buy Now</div>
                </div>
            </div>
            <a className='cart_product_price'>${price*quantity}&nbsp;</a>
        </div>
    );
}
export default CartItem; 