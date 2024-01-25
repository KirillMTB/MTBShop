import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) {
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
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              {...item}
            />
            ))}
      </div>
    </div>
    );
}

export default Home;




