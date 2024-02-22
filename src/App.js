    
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer/index';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from "./context";
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(  () => {
    async function fetchData(){
      try {
      setIsLoading(true);
      const cartResponce=await axios.get('http://localhost:3001/cart');
      const favoritesResponse=await axios.get('http://localhost:3001/favorites');
      const itemsResponse=await axios.get('http://localhost:3001/items');
      //const [cartResponce, favoritesResponse, itemsResponse] = 
      //await Promise.all([axios.get('http://localhost:3001/cart'),
      //axios.get('http://localhost:3001/favorites'),
     // axios.get('http://localhost:3001/items')]);
   
      //const =await axios.get('http://localhost:3001/favorites');
      //const =await axios.get('http://localhost:3001/items');
     
      setIsLoading(false);
    setCartItems(cartResponce.data);
    setFavorites(favoritesResponse.data);
    setItems(itemsResponse.data);
  }catch(error){ 
    alert("Ошибка при загрузке данных! Повторите попытку позже!");
    console.log(error);}};
    fetchData();
    }, []);

    

    const onAddToCart = (obj) => {
      if(cartItems.find((item)=> Number(item.id)=== Number(obj.id))){
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
        setCartItems((prev)=> prev.filter((item)=> Number(item.id)!== Number(obj.id)));
      }
      else{
        axios.post('http://localhost:3001/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
    };
  
    const onRemoveItem = (id) => {
      axios.delete(`http://localhost:3001/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    };
  
    const onAddToFavorite = async (obj) => {
      try {
        if (favorites.find((favObj) => favObj.id === obj.id)) {
          axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        } else {
          const { data } = await axios.post('http://localhost:3001/favorites', obj);
          setFavorites((prev) => [...prev, data]);
        }
      } catch (error) {
        alert('Не удалось добавить в фавориты');
      }
    };
  
    const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
    };
  
    const isItemAdded = (id) =>{
      return cartItems.some((obj)=>Number(obj.id)===Number(id));
    }
  
    const afterOpenModal=()=> {
      document.body.style.overflow = 'hidden';
    }
  

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
    <div className="wrapper clear">
    <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route path="/" element={<Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
          afterOpenModal={afterOpenModal}
    
        />} />
        <Route path="/favorites" element={<Favorites/>} />

        <Route path="/orders" element={<Orders/>} />
      </Routes>
    </div>
  </AppContext.Provider>
    );
}

export default App;