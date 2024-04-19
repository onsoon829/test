import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";
import "./Productsave.css";

const Porductsave = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    category_code: "",
    product_name: "",
    product_price: "",
    product_count: "",
    product_content_text: "",
    filename: null,
    secondFile: null,
  });

  const user_id = 1;

  const {
    category_code,
    product_name,
    product_price,
    product_count,
    product_content_text,
    filename,
    secondFile,
  } = product;

  const productDetail = useSelector((state) => state.product.productDetail);

  const handleValueChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const savemenunavi = (e) => {};

  const listmenunavi = (e) => {
    navigate("/seller/product/list");
  };

  const handleFileChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("category_code", category_code);
    formData.append("product_name", product_name);
    formData.append("product_price", product_price);
    formData.append("product_count", product_count);
    formData.append("product_content_text", product_content_text);
    formData.append("filename", filename);
    formData.append("secondFile", secondFile);

    try {
      await dispatch(productActions.getProductWrite(formData));
      alert("action 전송 성공.");
    } catch (error) {
      console.error("action 전송 실패", error);
    }

    setProduct({
      category_code: "",
      product_name: "",
      product_price: "",
      product_count: "",
      product_content_text: "",
      filename: null,
      secondFile: null,
    });
  };

  //카테고리 관련
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set the currently selected category
    setProduct({ ...product, category_code: category });
  };

  return (
    <>
      <div className="savelist_upper">
        <div className="savelist_upperh">도움말</div>
      </div>
      <div className="seller_body">
        <div className="seller_menu_box">
          <div className="seller_menu_button" onClick={listmenunavi}>
            물품 리스트
          </div>
          <div className="seller_menu_button_c" onClick={savemenunavi}>
            물품 등록
          </div>
          <div className="seller_menu_button">정산</div>
        </div>
        <div className="save">
          <div className="saveinput">
            <div className="category_box">
              {["패션", "식품", "가전제품", "가구", "뷰티", "기타"].map(
                (category, index) => (
                  <button
                    key={index}
                    className={selectedCategory === category ? "active" : ""}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
            <form onSubmit={onSubmit}>
              <div className="savecontextinputbox">
                <div className="save_inputbody">
                  <div className="save_t">
                    <div>category_code</div>
                    <div>product_name</div>
                    <div>product_price</div>
                    <div>product_count</div>
                    <div>product_text</div>
                  </div>

                  <div className="save_inputbox">
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="category_code"
                      onChange={handleValueChange}
                    ></input>
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="product_name"
                      onChange={handleValueChange}
                    ></input>
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="product_price"
                      onChange={handleValueChange}
                    ></input>
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="product_count"
                      onChange={handleValueChange}
                    ></input>
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="product_content_text"
                      onChange={handleValueChange}
                    ></input>
                  </div>
                </div>
                <div className="save_inputimg">
                  <div className="save_inputimg_c">
                    <div>물품이미지</div>
                    <div>상품 상세 설명 이미지</div>
                  </div>
                  <div className="save_inputimg_d">
                    <div>
                      <input
                        type="file"
                        name="filename"
                        id="filepath"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        name="secondFile"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="savesubmit_btn">
                등록완료
              </button>
            </form>
          </div>
          <div className="savepreview">
            <div className="savepreview_topbox">
              <div className="savepreview_img0">
                {filename ? (
                  <img src={URL.createObjectURL(filename)} alt="Preview" />
                ) : (
                  "상품이미지"
                )}
              </div>
              <div className="savepreview_text">
                <p>상품명: {product_name}</p>
                <p>가격: {product_price}</p>
                <p>수량: {product_count}</p>
                <p>내용: {product_content_text}</p>
              </div>
            </div>
            <div className="savepreview_img1">
              {secondFile ? (
                <img src={URL.createObjectURL(secondFile)} alt="Preview" />
              ) : (
                "상품 상세 설명 이미지"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Porductsave;
