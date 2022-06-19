import './SearchResult.css';
import SearchItem from './SearchItem';
import API from './Api'; 
import {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';

function SearchResult() {
    const fields = ['keyword'];
    const location = useLocation();
    const [searchItems, setSearchItems] = useState([]);

    const getKeyword = () => {
        let params = new URLSearchParams(location.search);
        let result = params.get(fields[0]);
        return result === null ? '' : result;
    }
    const keyword = getKeyword();

    useEffect(() => {
        API.get('/product/search', {
            params: {
              keyword: keyword
            }
        })
        .then(response => {
            setSearchItems(response.data.result);
        });
    }, [location.search]);

    return(
        <div className='search_result'>
            <div className='search_top'>
                {searchItems.length > 0
                ? <a className='search_title'>{searchItems.length} results for&nbsp;</a>
                : <a className='search_title'>No results for&nbsp;</a>}
                <a className='search_keyword'>{keyword}</a>
            </div>
            <div className='search_result_field'>
                {searchItems.map(item => (
                    <SearchItem id={item.Product_ID} name={item.Product_Name} seller={item.Name} price={item.Price} original_price={item.Original_Price} avg_evaluation={item.AvgEvaluation} image_url={item.Image_Url}></SearchItem>
                ))}
            </div>
        </div>
    );
}
export default SearchResult; 