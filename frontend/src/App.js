import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Toolbar from './Toolbar';
import HomePage from './HomePage';
import SearchResult from './SearchResult';
import Cart from './ShoppingCart';
import MyOrder from './MyOrder';
import Comments from './Comments';
import Category from './Category';
import MySales from './MySales';

function App() {
  return (
    <BrowserRouter>
      <Toolbar></Toolbar>
      <Routes>
        <Route exact path="/sp22-cs411-team063-Bucks" element={<HomePage></HomePage>}></Route>
        <Route exact path="/sp22-cs411-team063-Bucks/search" element={<SearchResult></SearchResult>}></Route>
        <Route exact path="/sp22-cs411-team063-Bucks/cart" element={<Cart></Cart>}></Route>
        <Route exact path="/sp22-cs411-team063-Bucks/orders" element={<MyOrder></MyOrder>}></Route>
        <Route exact path="/sp22-cs411-team063-Bucks/comments/:id" element={<Comments></Comments>}></Route>
        <Route exact path="/sp22-cs411-team063-Bucks/category/:id" element={<Category></Category>}></Route>
        <Route exact path="/sp22-cs411-team063-Bucks/sales/" element={<MySales></MySales>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;