import './SearchItem.css';
import axios from 'axios';
import Cover from './assets/unknown.png';
import Cart from './assets/cart.png';
import API from './Api'; 
import USER_ID from './Constant'; 
import {useNavigate} from 'react-router-dom';

function SearchItem({id, name, seller, price, original_price, avg_evaluation, image_url}) {
    const navigate = useNavigate();

    const onClickAddCart = e => {
        let url = '/cart/'+USER_ID+'/'+id;
        API.get(url)
        .then(response => {
            API.put(url, {
                Student_ID: USER_ID,
                Product_ID: id,
                Quantity: response.data.result[0].Quantity+1
            })
            .then(response => {
                navigate(axios.getUri({url: '/sp22-cs411-team063-Bucks/cart'}));
            });
        })
        .catch(error => {
            API.post('/cart', {
                Student_ID: USER_ID,
                Product_ID: id,
                Quantity: 1
            })
            .then(response => {
                navigate(axios.getUri({url: '/sp22-cs411-team063-Bucks/cart'}));
            });
        })
    }

    const onClickComment = e => {
        let url = '/sp22-cs411-team063-Bucks/comments/'+id;
        navigate(axios.getUri({url: url}));
    }

    return(
        <div className="search_card">
            {image_url !== null && image_url.length > 0
            ? <img className='search_card_cover' src={image_url+".jpg"}></img>
            : <img className='search_card_cover' src={Cover}></img>}
            <div className='search_product'>
                <a className='search_product_name' onClick={onClickComment}>{name}</a>
                <a className='search_rating'>{avg_evaluation !== null ? avg_evaluation : 0}</a>
            </div>
            <div className='search_detail'>
                <div className='search_price_field'>
                    <a className='search_price'>${price}&nbsp;</a>
                    <a className='search_original_price'><strike>${original_price}</strike></a>
                </div>
                {seller !== undefined
                ? <div>
                    <a className='search_seller'>Sell by&nbsp;</a>
                    <a className='search_seller_name'>{seller}</a>
                </div>
                : null}
            </div>
            <div className='cart_btn' onClick={onClickAddCart}>
                <img src={Cart}></img>
                <a>Add to Cart</a>
            </div>
        </div>
    );
}
export default SearchItem; 