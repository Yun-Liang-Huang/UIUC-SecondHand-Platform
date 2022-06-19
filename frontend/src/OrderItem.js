import './OrderItem.css';
import axios from 'axios';
import Cover from './assets/unknown.png';
import API from './Api'; 
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';

function OrderItem({id, product_id, name, price, quantity, image_url, order_date}) {
    const navigate = useNavigate();
    const date = order_date.substring(0, order_date.indexOf('T'));
    const [comment, setComment] = useState('');
    const [evaluation, setEvaluation] = useState(0);
    const [hasComment, setHasComment] = useState(false);

    useEffect(() => {
        let url = '/comment/order-comment/'+id;
        API.get(url)
        .then(response => {
            if(response.data.result.length > 0) {
                setComment(response.data.result[0].Comment);
                setEvaluation(response.data.result[0].Evaluation);
                setHasComment(true);
            }
        });
    }, []);

    const onClickComment = e => {
        let url = '/sp22-cs411-team063-Bucks/comments/'+product_id;
        navigate(axios.getUri({url: url}));
    }

    const onClickUpdate = e => {
        if(hasComment) {
            let url = '/comment/'+id;
            API.put(url, {
                Comment: comment,
                Evaluation: evaluation
            })
            .then(response => {
                setHasComment(true);
            });
        }
        else {
            API.post('/comment', {
                Order_ID: id,
                Comment: comment,
                Evaluation: evaluation
            })
            .then(response => {
                setHasComment(true);
            });
        }
    }

    return (
        <div className='order_holder'>
            <div className='order_date'>Purchase on {date}</div>
            <div className='order_detail'>
                {image_url !== null 
                ? <img src={image_url+".jpg"}></img>
                : <img src={Cover}></img>}
                <div className='order_item'>
                    <div className='order_product_name' onClick={onClickComment}>{name}</div>
                    <div className='order_item_text'>Quantity: {quantity}&nbsp;&nbsp;&nbsp;&nbsp;Price: {price*quantity}</div>
                    <div className='order_item_text'>Evaluation:</div>
                    <div className='order_evaluation'>
                        <button className='order_evaluation_option' onClick={e=>setEvaluation(1)} style={{backgroundColor: evaluation==1 ? "blue" : "white", color: evaluation==1 ? "white" : "black"}}>1</button>
                        <button className='order_evaluation_option' onClick={e=>setEvaluation(2)} style={{backgroundColor: evaluation==2 ? "blue" : "white", color: evaluation==2 ? "white" : "black"}}>2</button>
                        <button className='order_evaluation_option' onClick={e=>setEvaluation(3)} style={{backgroundColor: evaluation==3 ? "blue" : "white", color: evaluation==3 ? "white" : "black"}}>3</button>
                        <button className='order_evaluation_option' onClick={e=>setEvaluation(4)} style={{backgroundColor: evaluation==4 ? "blue" : "white", color: evaluation==4 ? "white" : "black"}}>4</button>
                        <button className='order_evaluation_option' onClick={e=>setEvaluation(5)} style={{backgroundColor: evaluation==5 ? "blue" : "white", color: evaluation==5 ? "white" : "black"}}>5</button>
                    </div>
                    <div className='order_item_text'>Comments:</div>
                    <textarea className='order_comment' defaultValue={comment} onChange={e=>setComment(e.target.value)}></textarea>
                    <div className='order_comment_send' onClick={onClickUpdate}>Update</div>
                </div>
            </div>

        </div>
    );
}
export default OrderItem; 