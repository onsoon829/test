package com.blogfriday.cart.dto;

public class CartItemDTO {
    int cart_product_code;
    int product_code; 
    int cart_product_count;
    int user_id;
    ProductDTO product; // Add ProductDTO property to hold product details
}