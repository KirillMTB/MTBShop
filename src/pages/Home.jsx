import React from "react";
import Card from '../components/Card';


function Home({
  items,
 // favorites, добавили, чтобы показывалось состояние после перезагрузки страницы на самой странице
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
 
  const renderItems = ()=>{
    
    const filtredItems= items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => (
              <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
              />
              )); 
  };
 

  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все велосипеды'}</h1>
        <div className="search-block d-flex">
            <img width={18} src="./logo/Search.svg" alt="Search" />
            {searchValue && (
            <img onClick={()=>setSearchValue('')} className="clear cu-p" src="./logo/btn-remove1.svg" alt="Clear"/>) } {/* либо можно так {searchValue ? <img onClick={()=>setSearchValue('')}чтобы очищалось при нажатии на кнопку className="clear cu-p" src="./logo/btn-remove1.svg" alt="Clear"/> : null} */}
            <input maxLength={21} onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." /> {/* при каждом добавлении/удалении символов в поисковой строке выполняется данный метод */}
          </div>
      
          <div className="bikes">
          {renderItems()}
      </div></div>
{/*
      <div className="bikes">
        {items
          .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              added={cartItems.some(obj=>Number(obj.id)===Number(item.id))}
              favorited={favorites.some(obj=>Number(obj.id)===Number(item.id))} //если хотя бы одно условие совпало, то выведет тру, если нет, то фолс, //добавили, чтобы показывалось состояние после перезагрузки страницы на самой странице
              {...item}
            />
            ))}
          </div>*/}
    </div>
    );
}

export default Home;



