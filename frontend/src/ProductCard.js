import './ProductCard.css';
import axios from 'axios';
import Cover from './assets/unknown.png';
import {useNavigate} from 'react-router-dom';

function ProductCard({id, name, price, original_price, sellers, image_url}) {
    const navigate = useNavigate();

    const onClickProductCard = e => {
        if(id !== undefined) {
            let url = '/sp22-cs411-team063-Bucks/comments/'+id;
            navigate(axios.getUri({url: url}));
        }
    }

    return(
        <div className="card_holder" onClick={onClickProductCard}>
            {image_url !== null && image_url.length > 0
            ? <img src={image_url+".jpg"}></img>
            : <img src={Cover}></img>}
            <div className='card_product_name'>{name}</div>
            <div className='card_product_price_field'>
                <a className='card_product_price'>${price}&nbsp;</a>
                {original_price !== undefined 
                ? <a className='card_product_original_price'><strike>${original_price}</strike></a>
                : null}
            </div>
            {sellers > 0 ?
            <div className='card_product_sellers'>
                <a>Sold by&nbsp;</a>
                <a className='card_product_sellers_text'>{sellers}</a>
                <a>&nbsp;people</a>
            </div> : null}
        </div>
    );
}
export default ProductCard; 