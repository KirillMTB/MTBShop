export default function Drawer({onClose,items=[]}){
    return(
        <div className="overlay">
        <div className="drawer">
          <h3 className="d-flex justify-between">
            Корзина <img onClick={onClose} className= "cu-p" src="./logo/btn-remove.svg" alt="Close"/>
          </h3>
          <div className="items">{items.map((obj)=>(<div className="cartItem d-flex align-center mb-20">
              {/*<img className="mr-40 ml-10" width={100} src="./img/gtforcesmall.jpg" alt="GT Force"/>*/}
              <div style={{backgroundImage: `url{(${obj.imageURL})}`}} className="cartItemImg"></div>
              
              <div className="mr-20">
                <p className="pcart">
                  {obj.name}
                </p>
                <b>
                  {obj.price}
                </b>
              </div>
              <img className= "removeBtn" src="./logo/btn-remove.svg" alt="Remove"/>
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