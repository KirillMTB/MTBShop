
function Drawer({ onClose, onRemove, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} className="cu-p" src="./logo/btn-remove.svg" alt="Close" />
        </h2>
        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
                  <img className="mr-40 ml-10" width={100} src={obj.imageURL} alt={obj.alt}/>
                  <div className="mr-20 flex">
                  <p className="mb-5">{obj.name}</p>
                  <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="./logo/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
                ))}
            </div>
            <div className="cartTotalBlock">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>100 999 руб. </b>
              </li>
              <li>
                <span>Комиссия 5%:</span>
                <div></div>
                <b> 1599 руб. </b>
              </li>
            </ul>
            <button className="blueButton">
              Оформить заказ <img src="./logo/arrow.svg" alt="Arrow" />
            </button>
            </div>
          </div>
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img className="emptycart mb-20" width="120px" height="120px" src="./logo/empty-cart.svg" alt="Empty" />
              <h2>Корзина пустая</h2>
              <p className="opacity-6">Добавьте хотя бы один товар, чтобы сделать заказ.</p>
              <button onClick={onClose} className={"greenButton"}>
              <img className="arrowdrawerback " src={"./logo/arrow.svg"} alt={"Arrow"}/> Вернуться назад
            </button>
            </div>
            )}
      </div>
    </div>
    );
}
export default Drawer;


