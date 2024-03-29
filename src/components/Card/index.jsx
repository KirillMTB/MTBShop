import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.Module.scss';
import AppContext from "../../context";


function Card({
  id,
  name,
  imageURL,
  alt, 
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading= false
}) {
  const {isItemAdded} =React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id,name, imageURL, alt,  price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, name, imageURL, alt,  price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className="card">
      
      {
        loading ? <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="150" />
          <rect x="0" y="160" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="185" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
    </ContentLoader> : <>
    <div className="favorite" onClick={onClickFavorite}>
      <img src={isFavorite ? './logo/heart-like.svg' : './logo/heart-unlike.svg'} alt="Unliked" />
    </div>
    <img width={200} src={imageURL} className={"ml-20"} alt={alt} />
    <h5>{name}</h5>
    <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <span>Цена:</span>
        <b>{price} руб.</b>
      </div>
      <img
        className="plus"
        onClick={onClickPlus}
        src={isItemAdded(id) ? './logo/btn-checked.svg' : './logo/btn-plus.svg'}
        alt="Plus"
      />
    </div></>
      }
</div>
    </div>
    
    );
}
export default Card;

