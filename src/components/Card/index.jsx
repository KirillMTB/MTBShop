import React from 'react';
import styles from './Card.Module.scss';

function Card({ id, name, imageUrl, alt, price, onFavorite, onPlus, favorited = false }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, name, imageUrl, alt, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, name, imageUrl, alt, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
    <div className="card">
        <div className="favorite" onClick={onClickFavorite}>
        <img src={isFavorite ? "./logo/heart-like.svg" : 
        "./logo/heart-unlike.svg"} alt="heart-unlike"/>
        </div>
        <div className="card-content">
            <img width={250} src={imageUrl} alt={alt}/>
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
            <div  className="d-flex flex-column">
                <span>Цена:  </span>
                <b> {price} руб</b>
            </div>
            {/*<button onClick={props.onPlus}> либо можно так ()=>onClickButton(), но предыдущий вариант лучше в записи */}
                <img className="plus" onClick={onClickPlus} src={isAdded ? "./logo/btn-checked.svg" : "./logo/btn-plus.svg"} alt="plus"/>
           
            </div>
        </div>
    </div>
</div>
    );
}
export default Card;

