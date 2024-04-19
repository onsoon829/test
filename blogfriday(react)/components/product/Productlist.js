import React, { useEffect } from "react";
import "./Productlist.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";

const Productlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user_id = 1;

  const { productList, productImages } = useSelector((state) => state.product);

  const savemenunavi = (e) => {
    navigate(`/seller/product/save/${user_id}`);
  };

  const listmenunavi = (e) => {};

  useEffect(() => {
    console.log("+++++++++", user_id);
    dispatch(productActions.getSellerList(user_id));
  }, []);
  const imagePath = `/public/shopimg/44_product_img0_바밤바.png`;
  return (
    <>
      <div className="savelist_upperl">
        <div className="savelist_upperh">도움말</div>
      </div>
      <div className="seller_body">
        <div className="seller_menu_box">
          <div className="seller_menu_button_c" onClick={listmenunavi}>
            물품 리스트
          </div>
          <div className="seller_menu_button" onClick={savemenunavi}>
            물품 등록
          </div>
          <div className="seller_menu_button">정산</div>
        </div>
        <div className="seller_list_body">
          <div className="seller_list_body_listm">
            <div className="slbl_c">box</div>
            <div className="slbl_b">NO.</div>
            <div className="slbl_ct">category</div>
            <div className="slbl_n">이름</div>
            <div className="slbl_a">수량</div>
            <div className="slbl_p">가격</div>
            <div className="slbl_l">링크</div>
            <div className="slbl_d">등록일자</div>
          </div>
          <div>
            {productList &&
              productList.map((product, index) => (
                <div
                  key={product.product_code}
                  className={
                    index % 2 === 0
                      ? "seller_list_body_list"
                      : "seller_list_body_listo"
                  }
                >
                  {/* {productImages[product.product_code]?.product_img0 && (
                    <img
                      className="seller_img"
                      src={`/shopimg/${
                        productImages[product.product_code].product_img0
                      }`}
                      alt={`${product.product_name}`}
                    />
                  )} */}

                  <div className="slbl_c">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="slbl_checkbox"
                    ></input>
                  </div>
                  <div className="slbl_b">{index}</div>
                  <div className="slbl_ct">{product.category_code}</div>
                  <div className="slbl_n">{product.product_name}</div>
                  <div className="slbl_a">{product.product_count}</div>
                  <div className="slbl_p">{product.product_price}</div>
                  <div className="slbl_l">링크</div>
                  <div className="slbl_d">일자</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <form>
          <table>
            <tbody className="seller_list_body">
              <tr className="seller_list_body_list">
                <th>seller_id</th>
                <td>{seller_id}</td>
              </tr>
              <tr className="seller_list_body_list">
                <th></th>
                <td></td>
              </tr>
              <tr className="seller_list_body_list">
                <th></th>
                <td></td>
              </tr>
              <tr className="seller_list_body_list">
                <th></th>
                <td>
                  <img
                    src={imagePath}
                    alt="product_img0"
                    width="300"
                    height="300"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form> */}
      {/* </div> */}
    </>
  );
};

export default Productlist;
