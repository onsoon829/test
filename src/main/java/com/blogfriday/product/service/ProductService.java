package com.blogfriday.product.service;

import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProductimgDTO;

import java.util.List;

public interface ProductService {
    public void saveProcess(ProductDTO dto);
    public void saveImgProcess(ProductimgDTO dto);
    public void updateProcess(ProductDTO dto);
    public void deleteProcess(int product_code);
    public void deleteProductImgProcess(int product_code);
    public ProductDTO contentProcess(int product_code);
    public ProductimgDTO contentImgProcess(int product_code);
    public Integer findProductCodeByName(String product_name);
    public List<ProductDTO> searchlistProcess(String product_name);
    public List<ProductDTO> sellerlistProcess(int user_id);
    public List<String> getProductNames();
    public List<ProductDTO> findSimilarProductNames(String productName);
    public List<ProductDTO> searchcategorylistProcess(String category_name);
}