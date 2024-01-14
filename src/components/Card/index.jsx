import React from "react";
import styles from "./Card.Module.scss";

export default function Card({onFavorite, imageURL, alt, name, price, onPlus}){
    const [isAdded, setIsAdded] = React.useState(false);
    const onClickPlus=()=>{
        onPlus({imageURL, alt, name, price});
        setIsAdded(!isAdded)};
   
    const [isAddedlike, setIsAddedlike] = React.useState(false);
    const onClickPlus1=()=>{setIsAddedlike(!isAddedlike)};
    return(
        <div className={styles.card}>
            <div className="card">
                <div className="favorite" onClick={onFavorite}>
                <img onClick={onClickPlus1} src={isAddedlike ? "./logo/heart-like.svg" : "./logo/heart-unlike.svg"} alt="heart-unlike"/>
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