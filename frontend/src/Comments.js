import './Comments.css';
import CommentItem from './CommentItem';
import axios from 'axios';
import Cover from './assets/unknown.png';
import API from './Api'; 
import USER_ID from './Constant'; 
import {useState, useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';

function Comments() {
    const navigate = useNavigate();
    const params = useParams();
    const [id, setId] = useState(-1);
    const [name, setName] = useState('');
    const [memo, setMemo] = useState('');
    const [price, setPrice] = useState(0);
    const [original_price, setOriginalPrice] = useState(0);
    const [image_url, setImageUrl] = useState('');
    const [year, setYear] = useState(0);
    const [avg_evaluation, setAvgEvaluation] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let url = '/product/'+params.id;
        API.get(url)
        .then(response => {
            if(response.data.result.length > 0) {
                setId(response.data.result[0].Product_ID);
                setName(response.data.result[0].Product_Name);
                setMemo(response.data.result[0].Memo);
                setPrice(response.data.result[0].Price);
                setOriginalPrice(response.data.result[0].Original_Price);
                setImageUrl(response.data.result[0].Image_Url);
                setYear(response.data.result[0].Purchased_Year);
                if(response.data.result[0].AvgEvaluation !== null) {
                    setAvgEvaluation(response.data.result[0].AvgEvaluation);
                }
            }
        });
        let url2 = '/comment/product-comment/'+params.id;
        API.get(url2)
        .then(response => {
            setComments(response.data.result.reverse());
        });
    }, []);

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

    return(
        <div>
            <div className='comment_product_field'>
                {image_url !== null && image_url.length > 0
                ? <img src={image_url+".jpg"}></img>
                : <img src={Cover}></img>}
                <div className='comment_product_detail'>
                    <div className='comment_product_name'>{name}</div>
                    <div className='comment_product_memo'>{memo}</div>
                    <div className='comment_product_rating'>{avg_evaluation}</div>
                    <div className='comment_price_field'>
                        <a className='comment_price'>${price}&nbsp;</a>
                        <a className='comment_original_price'><strike>${original_price}</strike></a>
                    </div>
                    <div>
                        <a className='comment_year'>Purchased in&nbsp;</a>
                        <a className='comment_year_name'>{year}</a>
                    </div>
                    <div className='comment_send' onClick={onClickAddCart}>Add to Cart</div>
                </div>
            </div>
            <div className='comments'>
                <div className='comment_title'>Comments</div>
                {comments.length > 0
                ? <div className='comment_field'>
                    {comments.map(item => (
                        <CommentItem name={item.Name} evaluation={item.Evaluation} comment={item.Comment}></CommentItem>
                    ))}</div>
                : <div className='comment_message'>No Comments Now!</div>}
            </div>

        </div>
    );
}
export default Comments; 