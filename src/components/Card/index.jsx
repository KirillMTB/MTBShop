import React from "react";
import styles from "./Card.Module.scss";

export default function Card({onFavorite, imageURL, alt, name, price, onPlus, onRemove, id, cartItems, cartFavorite}){
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);
    const onClickPlus=()=>{
        onPlus({imageURL, alt, name, price});
        
    setIsAdded(!isAdded);};

    {/*const onClickPlus=()=>{
     const itemInCart = cartItems.find(item=>item.id===id);
     if (itemInCart) {
        onRemove(id);
     } else {
        onPlus({imageURL, alt, name, price});
     }  
        setIsAdded(!isAdded);};

        const onClickFavorite=()=>{
            const itemInFavorite = cartFavorite.find(item=>item.id===id);
            if (itemInFavorite) {
               onRemove(id);
            } else {
               onFavorite({imageURL, alt, name, price});
            }  
               setIsFavorite(!isFavorite);};*/}
   

        const onClickFavorite=()=>{setIsFavorite(!isFavorite);};
    return(
        <div className={styles.card}>
            <div className="card">
                <div className="favorite" onClick={onClickFavorite}>
                <img src={isFavorite ? "./logo/heart-like.svg" : 
                "./logo/heart-unlike.svg"} alt="heart-unlike"/>
                </div>
                <div className="card-content">
                    <img width={250} src={imageURL} alt={alt}/>
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