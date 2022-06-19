import './CommentItem.css';
import User from './assets/user.png';

function CommentItem({name, evaluation, comment}) {
    return(
        <div>
            <div className='comment_user'>
                <div className='comment_rating'>{evaluation}</div>
                <img src={User}></img>
                <a>{name}</a>
            </div>
            <div className='comment_text'>{comment}</div>
        </div>
    );
}
export default CommentItem; 