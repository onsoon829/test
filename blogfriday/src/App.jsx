import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CartPage from "./page/Cart";
import CartItem from "./components/cart/CartItem";
import Cart from "./components/cart/Cart";
import Test from "./components/cart/Test";
// import PaymentPage from "./components/pay/PaymentPage";

function App() {
  return (
    <Router>
      <div className="container">
        {/* <h1>장바구니</h1> */}
        <Routes>
          {/* <Route path="/" element={<CartPage />} /> */}
          {/* <Route path="/boo" element={<TestPage />} /> */}
          {/* <Route path="/" element={<CartItem />} /> */}
          <Route path="/" element={<Cart />} />
          <Route path="/Test" element={<Test />} />
          {/* <Route path="/cart" element={<PaymentPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
