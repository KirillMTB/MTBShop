import React, {useContext} from "react";
import AppContext from "../context";

const Info = ({name, description, image})=>{
    const {setCartOpened} = React.useContext(AppContext);
    return( <div className="cartEmpty d-flex align-center justify-center flex-column flex">
    <img className="emptycart mb-20" width="120px" src={image} alt="Empty" />
    <h2>{name}</h2>
    <p className="opacity-6"> {description}</p>
    <button onClick={()=>setCartOpened(false)} className={"greenButton"}>
    <img className="arrowdrawerback " src={"./logo/arrow.svg"} alt={"Arrow"}/> Вернуться назад
  </button>
  </div>)
}
export default Info;