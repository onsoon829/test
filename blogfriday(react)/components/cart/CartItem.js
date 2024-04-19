import "./CartItem.css";
import { useState } from "react";

const CartItem = ({ image, name, price, count }) => {
  const [countValue, setCountValue] = useState(count);

  return (
    <div className="">
      <input type="checkbox" />
      <img src={image} alt={image} />
      <p>{name}</p>
      <p>{price}</p>
      <input
        type="number"
        value={countValue}
        onChange={(e) => {
          setCountValue(e.target.value);
        }}
      />
      <button>삭제</button>
    </div>
  );
};

export default CartItem;
