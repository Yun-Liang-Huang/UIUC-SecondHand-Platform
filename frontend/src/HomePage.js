import './HomePage.css';
import ProductCard from './ProductCard';
import API from './Api'; 
import {useState, useEffect} from "react";

function HomePage() {
    const [popularItems, setPopularItems] = useState([]);
    const [iphones, setIphones] = useState([]);
    const [finalSales, setFinalSales] = useState([]);
    const [highDiscounts, setHighDiscount] = useState([]);
    const [mediumDiscount, setMediumDiscount] = useState([]);

    useEffect(() => {
        API.get('/popular-item')
        .then(response => {
            setPopularItems(response.data.result.slice(0, 10));
        });
        API.get('/iphone-avgprice')
        .then(response => {
            setIphones(response.data.result.slice(0, 5));
        });
        API.get('/discount-type')
        .then(response => {
            let result = response.data.result[0];
            setFinalSales(result.filter(item => item.Discount_Type == 'Final Sale').slice(0, 10));
            setHighDiscount(result.filter(item => item.Discount_Type == 'HighDiscount').slice(0, 10));
            setMediumDiscount(result.filter(item => item.Discount_Type == 'MediumDiscount').slice(0, 10));
        });
    }, []);

    return(
        <div>
            <div className='best_seller'>
                <h2>Best Sellers:<br></br>Most popular items on Bucks Second-Hand</h2>
                <div className='best_seller_blocks'>
                    {popularItems.map(item => (
                        <ProductCard name={item.Product_Name} price={item.Avg_Price} sellers={item.Num_Sellers} image_url={item.Image_Url}></ProductCard>
                    ))}
                </div>
            </div>
            <div className='iphone_field'>
                <h2>Best place to buy used iPhones/iPad</h2>
                <div className='iphone_blocks'>
                    {iphones.map(item => (
                        <ProductCard name={item.Product_Name} price={item.AvgPrice} image_url={item.Image_Url}></ProductCard>
                    ))}
                </div>
            </div>
            <div className='best_seller'>
                <h2>Final Sales:</h2>
                <div className='iphone_blocks'>
                    {finalSales.map(item => (
                        <ProductCard id={item.Product_ID} name={item.Product_Name} price={item.Price} original_price={item.Original_Price} image_url={item.Image_Url}></ProductCard>
                    ))}
                </div>
            </div>
            <div className='iphone_field'>
                <h2>High Discounts:</h2>
                <div className='iphone_blocks'>
                    {highDiscounts.map(item => (
                        <ProductCard id={item.Product_ID} name={item.Product_Name} price={item.Price} original_price={item.Original_Price} image_url={item.Image_Url}></ProductCard>
                    ))}
                </div>
            </div>
            <div className='best_seller'>
                <h2>Medium Discounts:</h2>
                <div className='iphone_blocks'>
                    {mediumDiscount.map(item => (
                        <ProductCard id={item.Product_ID} name={item.Product_Name} price={item.Price} original_price={item.Original_Price} image_url={item.Image_Url}></ProductCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default HomePage; 