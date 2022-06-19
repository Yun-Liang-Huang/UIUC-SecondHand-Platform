import './Toolbar.css';
import axios from 'axios';
import logo from './assets/deer.png';
import search_logo from './assets/search.png';
import cart_logo from './assets/cart.png';
import order_logo from './assets/order.png';
import add_logo from './assets/add.png';
import API from './Api'; 
import {useState, useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';

function Toolbar() {
    const fields = ['keyword'];
    const location = useLocation();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const getKeyword = () => {
        let params = new URLSearchParams(location.search);
        let result = params.get(fields[0]);
        return result === null ? '' : result;
    }
    const [keyword, setKeyword] = useState(getKeyword());

    const onClickLogo = () => {
        navigate(axios.getUri({url: '/sp22-cs411-team063-Bucks'}));
    }

    const onClickSearch = () => {
        let params = {};
        if(keyword.length > 0) {
            params[fields[0]] = keyword;
        }
        if(Object.keys(params).length > 0) {
            navigate(axios.getUri({url: '/sp22-cs411-team063-Bucks/search', params}));
        }
    }

    const onClickCart = () => {
        navigate(axios.getUri({url: '/sp22-cs411-team063-Bucks/cart'}));
    }

    const onClickOrder = () => {
        navigate(axios.getUri({url: '/sp22-cs411-team063-Bucks/orders'}));
    }

    const onClickSales = () => {
        navigate(axios.getUri({url: '/sp22-cs411-team063-Bucks/sales'}));
    }

    const onClickCategory = id => {
        let url = '/sp22-cs411-team063-Bucks/category/'+id;
        navigate(axios.getUri({url: url}));
    }

    useEffect(() => {
        setKeyword(getKeyword());
        API.get('/category')
        .then(response => {
            setCategories(response.data.result);
        });
    }, [location.search]);

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            onClickSearch();
        }
    }

    return(
        <div>
            <div className='toolbar'>
                <img className='logo' onClick={onClickLogo} src={logo}></img>
                <h1 onClick={onClickLogo}>Bucks Second-Hand</h1>
                <input value={keyword} onChange={e=>setKeyword(e.currentTarget.value)} onKeyUp={e=>handleKeyUp(e)}></input>
                <button onClick={onClickSearch}><img className='search_field' src={search_logo}></img></button>
                <div className='logos'>
                    <img className='options' onClick={onClickSales} src={add_logo}></img>
                    <img className='options' onClick={onClickOrder} src={order_logo}></img>
                    <img className='options' onClick={onClickCart} src={cart_logo}></img>
                </div>
            </div>
            <div className='categories'>
                {categories.map(item => (
                    <div className='category_option' onClick={e=>onClickCategory(item.Category_ID)}>{item.Name}</div>
                ))}
            </div>
        </div>
    );
}
export default Toolbar; 