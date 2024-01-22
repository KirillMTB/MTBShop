import React from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";

import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
const itemsUrl = 'http://localhost:3001/items';
const cartUrl = 'http://localhost:3001/cart';
const favoriteUrl = 'http://localhost:3001/favorites';

export default function App() {
  const [items,setItems] = React.useState([]);
  const [cartItems,setCartItems]=React.useState([]);
  const [favorites, setFavorites]=React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened]=React.useState(false);

 {/* fetch('https://659fa91c5023b02bfe8a1cbf.mockapi.io/items').then(res=>{return res.json();}).then(json=>{setItems(json);}); можно использовать только при первой загрузке, всегда будет подгружаться*/}
  {/*React.useEffect(()=>{fetch('https://659fa91c5023b02bfe8a1cbf.mockapi.io/items').then(res=>{return res.json();}).then(json=>{setItems(json);}) то же самое, но так делали раньше, в основном сейчас использую эксиос*/}
{/*axios.get('https://659fa91c5023b02bfe8a1cbf.mockapi.io/items').then(res=>{setItems(res.data);})
axios.get('https://659fa91c5023b02bfe8a1cbf.mockapi.io/cart').then(res=>{setCartItems(res.data);})
}, []);*/}
React.useEffect(()=>{
  axios.get(itemsUrl).then(res => {
    setItems(res.data);
  });
  axios.get(cartUrl).then(res => {
    setCartItems(res.data);
  });
  axios.get(favoriteUrl).then(res => {
    setFavorites(res.data);
  });
},[]);

const onAddToCart = (obj) => {
  const itemInCart = cartItems.find(item => item.id !== obj.id);
  if (itemInCart) {
    return;
  }

  axios.post(cartUrl, obj);
  setCartItems((prev) => [...prev, obj]);
};

const onRemoveItem = (id) => {
  axios.delete(`${cartUrl}/${id}`)
  .then(() => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  })
  .catch((error) => {
    console.error('Error deleting item from cart:', error);
  });
}; //удалить из корзины и бэкенда

     
const onAddToFavorite = (obj) => {
  const itemInFavorite = favorites.find(item => item.id !== obj.id);
  if (itemInFavorite) {
    return;
  }

  axios.post(favoriteUrl, obj);
  setFavorites((prev) => [...prev, obj]);
};
   

    const onChangeSearchInput=(event)=>{  //метод, который будет каждый раз вызываться, когда в поиске будет чтото прописываться
      setSearchValue(event.target.value);
    }

  return (
    <div className="wrapper clear">
      
       {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpened(false)}
       onRemove={onRemoveItem}/>} {/*если cartOpened true, значит Drawer показывается, если не true, то тогда не показывается, либо можно записать так:
       {cartOpened && <Drawer onClose={()=>setCartOpened(false)}/>}*/}

      <Header onClickCart={()=>setCartOpened(true)} />
      {/*<Routes>
        <Route path={"/favorits"} exact element={<Header onClickCart={()=>setCartOpened(true)} />}/>
      </Routes>*/}
    <Routes>
      <Route path={"/"} exact element={
        <Home 
        items={items} 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorite={onAddToFavorite}
        onAddToCart={onAddToCart}
        onRemoveItem={onRemoveItem}
        cartItems={cartItems}/>
              }>
       
      </Route>
      </Routes>
      
      <Routes>
      <Route path={"/"} exact element={
        <Favorites
        items={favorites}/>
              }>
       
      </Route>
      </Routes>
    </div>
  );
}