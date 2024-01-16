export default function Drawer({onClose, onRemove, items=[]}){
    return(
        <div className="overlay">
        <div className="drawer">
          <h3 className="d-flex justify-between">
            Корзина <img onClick={onClose} className= "cu-p" src="./logo/btn-remove.svg" alt="Close"/>
          </h3>
          <div className={"cartEmpty d-flex align-center justify-center flex-column flex"}>
            <img className="emptycart mb-20" width={"120"} height={"120"} src="./logo/empty-cart.svg"/>
            <h2>Корзина пуста</h2>
            <p className={"opacity-6"}>Добавьте хотя бы один товар, чтобы сделать заказ</p>
            <button className={"greenButton"}>
              <img className="arrowdrawerback " src={"./logo/arrow.svg"} alt={"Arrow"}/> Вернуться назад
            </button>
          </div>

          <div className="items">{items.map((obj)=>(<div className="cartItem d-flex align-center mb-20">
              <img className="mr-40 ml-10" width={100} src={obj.imageURL} alt={obj.alt}/>
              {/*<div style={{backgroundImage: `url{(${obj.imageURL})}`}} className="cartItemImg"></div>*/}
              
              <div className="mr-20">
                <p className="pcart">
                  {obj.name}
                </p>
                <b>
                  {obj.price}
                </b>
              </div>
              <img onClick={()=>onRemove(obj.id)} className= "removeBtn" src="./logo/btn-remove.svg" alt="Remove"/>
            </div>))}
              
          </div>
          <div className="classTotalBlock">
            <ul>
              <li className=" justify-between mb-20">
                <span>Итого:</span>
                <div></div>
                <b>430 584 руб</b>
              </li>
              <li className=" justify-between mb-20">
                <span>С учетом дисконта 5%:</span>
                <div></div>
                <b>409 054 руб</b>
              </li>
            </ul>
            <button className="blueButton">Оформить заказ<img src="./logo/arrow.svg" alt="Arrow"/></button>
          </div>
        </div>
        </div>
    );
}