package com.blogfriday.product.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProductimgDTO;

@Mapper
@Repository
public interface ProductRepository {
    public void saveProduct(ProductDTO dto);
    public void saveImgProduct(ProductimgDTO dto);
    public void updateProduct(ProductDTO dto);
    public void deleteProduct(int product_code);
    public void deleteProductImg(int product_code);
    public ProductDTO content(int product_code);
    public ProductimgDTO contentImg(int product_code);
    public Integer findProductCodeByName(String product_name);
    public List<ProductDTO> searchlist(String product_name);
    public List<ProductDTO> sellerlist(int user_id);
    public List<ProductDTO> findProductNamesByText(String searchText);
    public List<ProductDTO> searchcategorylist(String category_name);
    public List<String> getProductNames();
    public List<ProductDTO> findSimilarProductNames(String product_name);
}