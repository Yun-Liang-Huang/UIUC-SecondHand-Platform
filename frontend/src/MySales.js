import './MySales.css';
import axios from 'axios';
import API from './Api'; 
import USER_ID from './Constant'; 
import { default as ReactSelect } from "react-select";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';

function MySales() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [my_categories, setMyCategories] = useState([]);
    const [name, setName] = useState('');
    const [memo, setMemo] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [original_price, setOriginalPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchased_year, setPurchasedYear] = useState(2022);

    const getYears = () => {
        let result = [];
        for(let y = 2022; y >=2000; y--) {
            result.push({'value': y, 'label': y});
        }
        return result;
    }
    
    const onCategoryChange = selected => {
        setMyCategories(selected);
    }

    const onYearChange = year => {
        setPurchasedYear(year['value'])
    }

    const onClickSend = e => {
        if(name.length > 0 && price.length > 0 && original_price.length > 0 && quantity.length > 0) {
            API.post('/product', {
                Seller_ID: USER_ID,
                Product_Name: name,
                Price: parseInt(price),
                Original_Price: parseInt(original_price),
                Purchased_Year: purchased_year,
                Memo: memo,
                Image_Url: image_url,
                Quantity: parseInt(quantity)
            })
            .then(response => {
                let id = response.data.Product_ID;
                let apis = []
                for(let i = 0; i < my_categories.length; i++) {
                    apis.push(getClassificationAPI(my_categories[i].Category_ID, id));
                }
                axios.all(apis)
                .then(response => {
                    let url = '/sp22-cs411-team063-Bucks/comments/'+id;
                    navigate(axios.getUri({url: url}));
                });
            });
        }
        for(let i = 0; i < my_categories.length; i++) {
            console.log(my_categories[i].Category_ID);
        }
    }

    const getClassificationAPI = (cat_id, prod_id) => {
        return API.post('/classification', {
            Category_ID: cat_id,
            Product_ID: prod_id
        });
    }

    useEffect(() => {
        API.get('/category')
        .then(response => {
            setCategories(response.data.result);
        });
    }, []);

    return(
        <div className='sales'>
            <div className='sales_title'>Sell your second-hand items</div>
            <div className='sales_field'>
                <div className='sales_option_title'>1. Please select categories</div>
                <span
                    class="d-inline-block"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please select categories">
                    <ReactSelect
                        options={categories}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        getOptionLabel={(option) => option.Name}
                        getOptionValue={(option) => option.Category_ID}
                        value={my_categories}
                        onChange={onCategoryChange}
                        allowSelectAll={true} />
                </span>
                <div className='sales_option_space'></div>
                <div className='sales_option_title'>2. Please enter product name</div>
                <input className='sales_option_input' placeholder='Product Name' onChange={e=>setName(e.target.value)}></input>
                <div className='sales_option_space'></div>
                <div className='sales_option_title'>3. Please enter memo</div>
                <input className='sales_option_input' placeholder='Product Memo' onChange={e=>setMemo(e.target.value)}></input>
                <div className='sales_option_space'></div>
                <div className='sales_option_title'>4. Please enter product photo url</div>
                <input className='sales_option_input' placeholder='Product Photo Url' onChange={e=>setImageUrl(e.target.value)}></input>
                <div className='sales_option_space'></div>
                <div className='sales_option_title'>5. Please enter prices</div>
                <div>
                    <input className='sales_option_small_input' placeholder='Price' type='number' onChange={e=>setPrice(e.target.value)}></input>
                    <input className='sales_option_small_input' placeholder='Original Price' type='number' onChange={e=>setOriginalPrice(e.target.value)}></input>
                </div>
                <div className='sales_option_space'></div>
                <div className='sales_option_title'>6. Please enter quantity</div>
                <input className='sales_option_small_input' placeholder='Quantity' type='number' onChange={e=>setQuantity(e.target.value)}></input>
                <div className='sales_option_space'></div>
                <div className='sales_option_title'>7. Please enter the year you purchased the product</div>
                <span
                    class="d-inline-block"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please select categories">
                    <ReactSelect
                        options={getYears()}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        value={{'value': purchased_year, 'label': purchased_year}}
                        onChange={onYearChange}/>
                </span>
                <div className='sales_send' onClick={onClickSend}>Submit</div>
            </div>
        </div>
    );
}
export default MySales; 
