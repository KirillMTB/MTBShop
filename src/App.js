import React from "react";
import Card from "./components/Card/";
import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer.jsx";

{/*const arr=[ {
  name:'GT 27.5 FORCE CRB EXPERT',
  price: 430584,
  imageURL: './img/gtforcesmall.jpg',
  alt: 'GT Force'
},

{
  name:'GT 27.5 AVALANCHE COMP',
  price: 53460,
  imageURL: './img/gtavalanche.jpg',
  alt: 'GT Avalanche COMP'
},

{
  name:'CANNONDALE TRAIL SE 2',
  price: 155246,
  imageURL: './img/cannondaletrail.jpg',
  alt: 'CANNONDALE TRAIL SE 2'
},

{
  name:'CANNONDALE TRAIL SE 1',
  price: 168620,
  imageURL: './img/cannondaletrailse.jpg',
  alt: 'CANNONDALE TRAIL SE 1'
},

{
  name:'CANNONDALE F-SI CRB 4',
  price: 323615,
  imageURL: './img/cannondalefsi.jpg',
  alt: 'CANNONDALE F-SI CRB 4'
},

{
  name:'CANNONDALE SCALPEL CRB 3',
  price: 447595,
  imageURL: './img/cannondalescalpel.jpg',
  alt: 'CANNONDALE SCALPEL CRB 3'
},
{
  name:'Corratec VERT ELITE',
  price: 113630,
  imageURL: './img/corratecvertelite.jpg',
  alt: 'Corratec VERT ELITE'
},

{
  name:'Outleap RADIUS PRO 29',
  price: 106700,
  imageURL: './img/outleapradiuspro.jpg',
  alt: 'Outleap RADIUS PRO 29'
},
{
  name:'Jamis HARDLINE C2',
  price: 640024,
  imageURL: './img/jamishardlinec2.jpg',
  alt: 'Jamis HARDLINE C2'
},
{
  name:'Jamis HARDLINE C3',
  price: 537660,
  imageURL: './img/jamishardline.jpg',
  alt: 'Jamis HARDLINE C3'
},
]*/}

export default function App() {
  const [items,setItems] = React.useState([]);
  const [cartItems,setCartItems]=React.useState([]);
  const [cartOpened, setCartOpened]=React.useState(false);

 {/* fetch('https://659fa91c5023b02bfe8a1cbf.mockapi.io/items').then(res=>{return res.json();}).then(json=>{setItems(json);}); можно использовать только при первой загрузке, всегда будет подгружаться*/}
  React.useEffect(()=>{fetch('https://659fa91c5023b02bfe8a1cbf.mockapi.io/items').then(res=>{return res.json();}).then(json=>{setItems(json);})}, []);

  const onAddToCart=(obj)=>{
    setCartItems((prev)=>[...prev, obj]);};
    console.log(cartItems);

  return (
    <div className="wrapper clear">
      
       {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpened(false)}/>} {/*если cartOpened true, значит Drawer показывается, если не true, то тогда не показывается, либо можно записать так:
       {cartOpened && <Drawer onClose={()=>setCartOpened(false)}/>}*/}

      
      <Header onClickCart={()=>setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все велосипеды</h1>
          <div className="search-block d-flex">
            <img width={18} src="./logo/Search.svg" alt="Search" />
            <input placeholder="Поиск..."/>
          </div>
        </div>
        <div className="bikes">
          {items.map((item)=>(<Card name={item.name} price={item.price} imageURL={item.imageURL} alt={item.alt} onFavorite={()=>console.log('Добавили в закладки')} onPlus={(obj)=>onAddToCart(obj)}/>))}
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