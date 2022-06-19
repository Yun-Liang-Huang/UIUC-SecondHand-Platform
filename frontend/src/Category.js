import './SearchResult.css';
import SearchItem from './SearchItem';
import API from './Api'; 
import {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';


function Category() {
    const params = useParams();
    const [categoryItems, setCategoryItems] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        let url = '/classification/'+params.id;
        API.get(url)
        .then(response => {
            setCategoryItems(response.data.result);
            if(response.data.result.length > 0) {
                setCategoryName(response.data.result[0].Category_Name);
            }
        });
    }, [params]);

    return(
        <div className='search_result'>
            <div className='search_top'>
                <a className='search_title'>{categoryItems.length} results for&nbsp;</a>
                <a className='search_keyword'>{categoryName}</a>
            </div>
            <div className='search_result_field'>
                {categoryItems.map(item => (
                    <SearchItem id={item.Product_ID} name={item.Product_Name} price={item.Price} original_price={item.Original_Price} avg_evaluation={item.AvgEvaluation} image_url={item.Image_Url}></SearchItem>
                ))}
            </div>
        </div>
    );
}
export default Category; 