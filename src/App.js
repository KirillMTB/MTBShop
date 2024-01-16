import React from "react";
import axios from "axios";
import Card from "./components/Card/";
import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer.jsx";

const itemsUrl = 'http://localhost:3001/items';
const cartUrl = 'http://localhost:3001/cart';

export default function App() {
  const [items,setItems] = React.useState([]);
  const [cartItems,setCartItems]=React.useState([]);
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
},[]);

const onAddToCart = (obj) => {
  const itemInCart = cartItems.find(item => item.id === obj.id);
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
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все велосипеды'}</h1>
          <div className="search-block d-flex">
            <img width={18} src="./logo/Search.svg" alt="Search" />
            {searchValue && (
            <img onClick={()=>setSearchValue('')} className="clear cu-p" src="./logo/btn-remove1.svg" alt="Clear"/>) } {/* либо можно так {searchValue ? <img onClick={()=>setSearchValue('')}чтобы очищалось при нажатии на кнопку className="clear cu-p" src="./logo/btn-remove1.svg" alt="Clear"/> : null} */}
            <input maxLength={24} onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." /> {/* при каждом добавлении/удалении символов в поисковой строке выполняется данный метод */}
          </div>
        </div>
        <div className="bikes">
          {items.filter(item=>item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item,index)=>(<Card key={index} name={item.name} price={item.price} imageURL={item.imageURL} alt={item.alt} onFavorite={()=>console.log('Добавили в закладки')} onPlus={(obj)=>onAddToCart(obj)}/>))} {/* .filter(item=>item.name.toLowerCase().includes(searchValue)) фильтрует с учетом поискового запроса, toLowerCase() понижение в регистре, чтобы поиск был без учета регистра */}
          {/*<Cad name="GT 27.5 FORCE CRB EXPERT" price={430584} imageURL="./img/gtforcesmall.jpg" alt="GT Force"/>
          <div className="card">
            <div className="favorite">
              <img src="./logo/heart-unlike.svg" alt="heart-unlike"/>
            </div>
            <img width={250} src="./img/gtavalanche.jpg" alt="GT Avalanche COMP"/>
            <h5>GT 27.5 AVALANCHE COMP</h5>
            <div className="d-flex justify-between align-center">
              <div  className="d-flex flex-column">
                <span>Цена:  </span>
                <b> 53 460 руб</b>
              </div>
              <button className="button_plus">
                <img width={11} height={11} src="./logo/Plus.svg" alt="plus"/>
              </button>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <img src="./logo/heart-unlike.svg" alt="heart-unlike"/>
            </div>
            <img width={250} src="./img/cannondaletrail.jpg" alt="Cannondaile Trail SE2"/>
            <h5>CANNONDALE TRAIL SE 2</h5>
            <div className="d-flex justify-between align-center">
              <div  className="d-flex flex-column">
                <span>Цена:  </span>
                <b> 155 246 руб</b>
              </div>
              <button className="button_plus">
                <img width={11} height={11} src="./logo/Plus.svg" alt="plus"/>
              </button>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <img src="./logo/heart-unlike.svg" alt="heart-unlike"/>
            </div>
            <img width={250} src="./img/cannondaletrailse.jpg" alt="Cannondaile Trail SE1"/>
            <h5>CANNONDALE TRAIL SE 1</h5>
            <div className="d-flex justify-between align-center">
              <div  className="d-flex flex-column">
                <span>Цена:  </span>
                <b> 168 620 руб</b>
              </div>
              <button className="button_plus">
                <img width={11} height={11} src="./logo/Plus.svg" alt="plus"/>
              </button>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <img src="./logo/heart-unlike.svg" alt="heart-unlike"/>
            </div>
            <img width={250} src="./img/cannondalefsi.jpg" alt="Cannondale F-SI CRB 4"/>
            <h5>CANNONDALE F-SI CRB 4</h5>
            <div className="d-flex justify-between align-center">
              <div  className="d-flex flex-column">
                <span>Цена:  </span>
                <b> 323 615 руб</b>
              </div>
              <button className="button_plus">
                <img width={11} height={11} src="./logo/Plus.svg" alt="plus"/>
              </button>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <img src="./logo/heart-unlike.svg" alt="heart-unlike"/>
            </div>
            <img width={250} src="./img/cannondalescalpel.jpg" alt="Cannondale SCALPEL CRB 3"/>
            <h5>CANNONDALE SCALPEL CRB 3</h5>
            <div className="d-flex justify-between align-center">
              <div  className="d-flex flex-column">
                <span>Цена:  </span>
                <b> 447 595 руб</b>
              </div>
              <button className="button_plus">
                <img width={11} height={11} src="./logo/Plus.svg" alt="plus"/>
              </button>
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  );
}