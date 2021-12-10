import { useContext, useState } from 'react';

import Modal from './Modal';
import CartItem from './CartDetail';
import CartContext from '../CartController/CartContext';
import classes from './Cart.module.css';
import { LinkContainer } from 'react-router-bootstrap';

const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `${cartContext.totalAmount.toLocaleString('vi-VN')} VND`;
  const nonemptyCart = cartContext.items.length > 0;

  const cartItemRemove = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAdd = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = () => {
    fetch('https://bkcoffee-211-default-rtdb.asia-southeast1.firebasedatabase.app//orders.json', {
      method: 'POST',
      body: JSON.stringify({
        orderedItems: cartContext.items
      })
    });
  };

  const cartItems = (
    <ul className = {classes['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key = {item.id}
          name = {item.name}
          amount = {item.amount}
          price = {item.price}
          onRemove = {cartItemRemove.bind(null, item.id)}
          onAdd = {cartItemAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  // const modalActions = (
  //   <div className={classes.actions}>
  //     <button className={classes['button--alt']} onClick={props.onClose}>
  //       Quay lại menu
  //     </button>
  //     {nonemptyCart && (
  //       <button className={classes.button} onClick={orderHandler}>
  //         Đặt hàng
  //       </button>
  //     )}
  //   </div>
  // );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Thành tiền</span>
        <span>{totalAmount}</span>
      </div>
          {/* {isCheckout && (
          <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
        )}
        {!isCheckout && modalActions} */}
      <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Quay lại menu
      </button>
      {nonemptyCart && 
      <LinkContainer to ='/payment'>
        <button className={classes.button} onClick={orderHandler && submitOrderHandler}>
          Tiến hành thanh toán
        </button>
      </LinkContainer>

      }
    </div>
    </Modal>
  );

};

export default Cart;
