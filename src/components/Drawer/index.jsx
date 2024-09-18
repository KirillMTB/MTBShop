import React, { useState } from "react";
import Info from "./../info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from "./Drawer.module.scss";

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  {/*React.useEffect(() => {
    if (opened) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [opened]);*/}

  React.useEffect(() => {
    if (opened) {
      document.body.style.overflow='hidden';
    } else {
      document.body.style.overflow='unset';
    }
  }, [opened]);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const productIds = cartItems.map((item) => Number(item.id));
      const { data } = await axios.post("http://localhost:3001/orders", { productIds });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      cartItems.forEach(async (item) => {await axios.delete(`http://localhost:3001/cart/${item.id}`);})}
    catch (error) {
      alert("Не удалось оформить заказ! Повторите попытку позже");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина{" "}
          <img onClick={onClose} className="cu-p scrollon" src="./logo/btn-remove.svg" alt="Close" />
        </h2>
        {items.length > 0 ? (
          <div className={"d-flex flex-column"}>
            <div className="items" style={{ maxHeight: "500px", overflowY: "auto" }}>
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <img className="mr-40 ml-10" width={100} src={obj.imageURL} alt={obj.alt} />
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)} className="removeBtn" src="./logo/btn-remove.svg" alt="Remove" />
                </div>
              ))}
            </div>
            <div className="classTotalBlock">
              <ul>
                <li className=" justify-between mb-20">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб</b>
                </li>
                <li className=" justify-between mb-20">
                  <span>С учетом дисконта 5%:</span>
                  <div></div>
                  <b>{Math.ceil(totalPrice - totalPrice * 0.05)} руб</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="blueButton">
                Оформить заказ
                <img src="./logo/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (<Info
          name={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
          description={isOrderComplete ? `Ваш заказ с #${orderId} передан на сборку` : "Добавьте хотя бы один товар, чтобы сделать заказ."}
          image={isOrderComplete ? "./logo/complete-order.svg" :"./logo/empty-cart.svg"}
        />
         
          )}
    </div>
  </div>
  );
}
export default Drawer;
