import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

import { Link } from "react-router-dom";

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Tên</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Vui lòng nhập tên hợp lệ</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Địa chỉ</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Vui lòng nhập địa chỉ hợp lệ</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Số điện thoại</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Vui lòng nhập số điện thoại hợp lệ</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>Quận</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Vui lòng nhập địa chỉ hợp lệ</p>}
      </div>
      <div className={classes.actions}>
        {/* <button type='button' onClick={props.onCancel}>
          Quay lại
        </button> */}
        <button className={classes.submit}>Xác nhận</button>
        <Link to ='/payment'>
          <button className={classes.submit}>Tiến hành thanh toán</button>
        </Link>
      </div>
    </form>
  );
};

export default Checkout;