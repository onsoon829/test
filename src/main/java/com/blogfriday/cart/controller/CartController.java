package com.blogfriday.cart.controller;

import com.blogfriday.cart.dto.CartDTO;
import com.blogfriday.cart.dto.CartItemDTO;
import com.blogfriday.cart.service.CartService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.Charset;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

	
    private final CartService cartService;
	
	@Autowired
	public CartController(CartService cartService) {
		this.cartService = cartService;
	}

	@GetMapping("/list")//리스트 뽑아오기
	public ResponseEntity<List<CartDTO>> getAllCarts(){
		return ResponseEntity.ok(cartService.getAllCarts());
	}

//	@GetMapping("/list/{user-id}")//리스트 뽑아오기
//	public ResponseEntity<List<CartItemDTO>> getCartsByUserId(@PathVariable("user_id") int user_id){
//		return ResponseEntity.ok(cartService.getCartsByUserId(user_id));
//	}
	
	@GetMapping("/{cart_product_code}")
	public ResponseEntity<CartDTO>getCartById(@PathVariable("cartProductCode")int cartProductCode){
		
		CartDTO cart = cartService.getCartByCode(cartProductCode);
		if(cart == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cart);
	}
	
	
	 @GetMapping("/list/{user_id}") // 유저 ID를 기반으로 장바구니 목록 검색
	    public ResponseEntity<Map<String, Object>> searchCartList(@PathVariable("user_id") int user_id) {
	        Map<String, Object> map = new HashMap<>();
	        
	        List<CartItemDTO> cartList = cartService.searchCartList(user_id);
	        
	        if (cartList.isEmpty()) {
	            
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	        } else {
	            
	            map.put("cartList", cartList);
	            return ResponseEntity.ok(map);
	        }
	    }
/////////////////////////////////////////////////////////////////////
//	@GetMapping("/list/{user_id}")
//	public ResponseEntity<Map<String, Object>> searchcartlist(@PathVariable("user_id") int user_id){
//		Map<String, Object>map = new HashMap<>();
//		log.info("들어온 제품:{}", user_id);
//		List<CartDTO> cartList = cartService.searchCartList(user_id);
//	
//		List<Integer> productCodes = cartList.stream().map(CartDTO::getProduct_code).collect(Collectors.toList());
//	
//	Map<Integer, Object>cartImagesResults = new HashMap<>();
//	for(Integer productCode : productCodes) {
//		Object imgResult = cartService.contentImgProcess(productCode);
//		cartImagesResults.put(productCode, imgResult);
//	}
//	
//	map.put("cartList", cartList);
//	map.put("productImages", cartImagesResults);
//	
//	log.info("cartList=get:{}", map.get("cartList"));
//	
//	return ResponseEntity.ok(map);
//	}
/////////////////////////////////////////////////////////	
	
	// 상품 추가
	@PostMapping("/add")
	public ResponseEntity<Void> addCart(@RequestBody CartDTO cart) {
		System.out.println("cart>>" + cart.getUser_id());
		cartService.insert(cart);
		return ResponseEntity.ok(null);
	}
	
	//상품 수정
	@PutMapping("/{cartproductcode}")
	public ResponseEntity<Void>updateCart(@PathVariable("cartproductcode")
	int cartProductCode, @RequestBody CartDTO cart){
		cart.setCart_product_code(cartProductCode);
		cartService.update(cart);
		return ResponseEntity.ok().build();
	}
	
	//상품 삭제
	@DeleteMapping("/delete/{cartproductcode}")
	public ResponseEntity<Void>deleteCart(@PathVariable ("cartproductcode")
	int cartProductCode){
		cartService.delete(cartProductCode);
		return ResponseEntity.ok().build();
	}

}//end class

