//package com.blogfriday.product.controller;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.util.FileCopyUtils;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.blogfriday.product.dto.ProductAndImgDTO;
//import com.blogfriday.product.dto.ProductDTO;
//import com.blogfriday.product.dto.ProductimgDTO;
//import com.blogfriday.product.service.ProductService;
//
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/api/product")
//public class ProductController {
//
//	@Autowired
//	private ProductService productService;
//
//	// 기존 규연님꺼///////////////////////
//	@Value("${spring.servlet.multipart.location}")
//	private String filePath;
//	//////////////////////////////////////////////
//
//	// 은주 수정 규연님꺼
////	@Value("${spring.servlet.multipart.location-shopimg}")	
////	private String filePath;
//
//	public ProductController() {
//	}
//
//	@PostMapping("/save")
//	public ResponseEntity<String> saveProduct(@ModelAttribute ProductAndImgDTO productAndImgDTO) {
//		log.info("물품등록메소드: {}", productAndImgDTO);
//		ProductDTO productDTO = new ProductDTO();
//		ProductimgDTO productImgDTO = new ProductimgDTO();
//		MultipartFile file = productAndImgDTO.getFilename();
//		MultipartFile secondFile = productAndImgDTO.getSecondFile();
//		
//
//		productDTO.setUser_id(productAndImgDTO.getUser_id());
//		productDTO.setCategory_code(productAndImgDTO.getCategory_code());
//		productDTO.setProduct_name(productAndImgDTO.getProduct_name());
//		productDTO.setProduct_price(productAndImgDTO.getProduct_price());
//		productDTO.setProduct_count(productAndImgDTO.getProduct_count());
//		productDTO.setProduct_content_text(productAndImgDTO.getProduct_content_text());
//
//		productService.saveProcess(productDTO); // 할때 productdto에 프라이머리키를 집어넣는다
//
//		log.info("물품등록확인: {}", productDTO.getProduct_code());
//
//		if (file != null && !file.isEmpty()) {
//
//			File filedownload = new File(filePath, productDTO.getProduct_code() + "_" + "product_img0" + ".png");
//
//			// 임시기억장치 걸 가져와서 로컬에 저장
//
//			try {
//				FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(filedownload));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			productImgDTO.setProduct_img0(productDTO.getProduct_code() + "_" + "product_img0" + ".png");
////			
//		}
//
//		if (secondFile != null && !secondFile.isEmpty()) {
//			log.info("두 번째 파일이 존재합니다.");
//			File secondfiledownload = new File(filePath, productDTO.getProduct_code() + "_" + "product_img1" + ".png");
//			
//			// 임시기억장치 걸 가져와서 로컬에 저장
//
//			try {
//				FileCopyUtils.copy(secondFile.getInputStream(), new FileOutputStream(secondfiledownload));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			
//			productImgDTO.setProduct_img1(productDTO.getProduct_code() + "_" + "product_img1" + ".png");
////			
//		}
////	    
//		productImgDTO.setProduct_code(productDTO.getProduct_code());
//		log.info("물품이미지확인: {}", productImgDTO.getProduct_img0());
//
//		log.info("product_code확인: {}", productDTO);
//		productService.saveImgProcess(productImgDTO);
//
//		return ResponseEntity.ok(null);
//	}
//
//	@PutMapping("/update")
//	public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO) {
//
//		log.info("물품수정확인: {}", productDTO);
//		productService.updateProcess(productDTO);
//		return ResponseEntity.ok(null);
//	}
//
//	@DeleteMapping("/delete/{product_code}")
//	public ResponseEntity<Object> deleteProduct(@PathVariable("product_code") int product_code) {
//		log.info("물품삭제확인: {}", product_code);
//		ProductimgDTO productImgDTO = new ProductimgDTO();
//
//		productImgDTO = productService.contentImgProcess(product_code);
//		log.info("이미지0: {}", productImgDTO.getProduct_img0());
//
//		String filename = product_code + "_" + "product_img0" + ".png";
//		File fileDownload = new File(filePath, filename);
//		log.info(filename);
//
//		if (fileDownload.exists()) {
//
//			productService.deleteProductImgProcess(product_code);
//			if (!fileDownload.delete()) {
//				log.error("Failed to delete existing file.");
//			}
//		}
//
//		productService.deleteProcess(product_code);
//
//		return ResponseEntity.ok(null);
//	}
//
//	@GetMapping("/content/{product_code}")
//	public ResponseEntity<ProductDTO> productcontent(@PathVariable("product_code") int product_code) {
//		ProductDTO Dto = productService.contentProcess(product_code);
//		log.info("물품조회확인: {}", Dto);
//		return ResponseEntity.ok(Dto);
//	}
//
//	@GetMapping("/content/img/{product_code}")
//	public ResponseEntity<ProductimgDTO> productimgcontent(@PathVariable("product_code") int product_code) {
//		ProductimgDTO Dto = productService.contentImgProcess(product_code);
//		log.info("물품이미지조회확인: {}", Dto);
//		return ResponseEntity.ok(Dto);
//	}
//
//	// 물품 이름으로 리스트 가져오기
//	@GetMapping("/list/{product_name}")
//	public ResponseEntity<Map<String, Object>> searchlist(@PathVariable("product_name") String product_name) {
//		Map<String, Object> map = new HashMap<>();
//		log.info("들어온 제품명:{}", product_name);
//		List<ProductDTO> productList = productService.searchlistProcess(product_name);
//
//		List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());
//
//		Map<Integer, Object> productImagesResults = new HashMap<>();
//		for (Integer productCode : productCodes) {
//			Object imgResult = productService.contentImgProcess(productCode);
//			productImagesResults.put(productCode, imgResult);
//		}
//
//		map.put("productList", productList);
//		map.put("productImages", productImagesResults);
//
//		log.info("productList-get:{}", map.get("productList"));
//		// 객체map에 put한 리스트 출력
//		return ResponseEntity.ok(map);
//	}
//
//	// 물품 이름으로 리스트 가져오기
////		@GetMapping("/list/{product_name}")
////		public ResponseEntity<Map<String, Object>> searchlist(@PathVariable("product_name") String product_name) {
////			Map<String, Object> map = new HashMap<>();
////			log.info("들어온 제품명:{}", product_name);
////			List<ProductDTO> productList = productService.searchlistProcess(product_name);
////			
////			List<Integer> productCodes = productList.stream()
////	                .map(ProductDTO::getProduct_code)
////	                .collect(Collectors.toList());
////			
////			
////			
////			Map<Integer, Object> productImagesResults = new HashMap<>();
////		    for (Integer productCode : productCodes) {
////		        Object imgResult = productService.contentImgProcess(productCode);
////		        productImagesResults.put(productCode, imgResult);
////		    }
////			
////			
////		    
////			
////			
////			map.put("productList", productList);	
////			map.put("productImages", productImagesResults);
////			
////			log.info("productList-get:{}", map.get("productList"));
////			// 객체map에 put한 리스트 출력
////			return ResponseEntity.ok(map);
////		}
//
//	// 판매자
//	@GetMapping("/seller/{user_id}")
//	public ResponseEntity<Map<String, Object>> sellerlist(@PathVariable("user_id") int user_id) {
//		Map<String, Object> map = new HashMap<>();
//		log.info("들어온 제품명:{}", user_id);
//		List<ProductDTO> productList = productService.sellerlistProcess(user_id);
//
//		List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());
//
//		Map<Integer, Object> productImagesResults = new HashMap<>();
//		for (Integer productCode : productCodes) {
//			Object imgResult = productService.contentImgProcess(productCode);
//			productImagesResults.put(productCode, imgResult);
//		}
//
//		map.put("productList", productList);
//		map.put("productImages", productImagesResults);
//
//		log.info("productList-get:{}", map.get("productList"));
//		// 객체map에 put한 리스트 출력
//		return ResponseEntity.ok(map);
//	}
//
//}
package com.blogfriday.product.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blogfriday.product.dto.ProductAndImgDTO;
import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProductimgDTO;
import com.blogfriday.product.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Value("${spring.servlet.multipart.location}")
    private String filePath;

    public ProductController() {
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveProduct(@ModelAttribute ProductAndImgDTO productAndImgDTO) {
        log.info("물품등록메소드: {}", productAndImgDTO);
        ProductDTO productDTO = new ProductDTO();
        ProductimgDTO productImgDTO = new ProductimgDTO();
        MultipartFile file = productAndImgDTO.getFilename();
        MultipartFile secondFile = productAndImgDTO.getSecondFile();

        productDTO.setUser_id(productAndImgDTO.getUser_id());
        productDTO.setCategory_code(productAndImgDTO.getCategory_code());
        productDTO.setProduct_name(productAndImgDTO.getProduct_name());
        productDTO.setProduct_price(productAndImgDTO.getProduct_price());
        productDTO.setProduct_count(productAndImgDTO.getProduct_count());
        productDTO.setProduct_content_text(productAndImgDTO.getProduct_content_text());

        productService.saveProcess(productDTO);

        log.info("물품등록확인: {}", productDTO.getProduct_code());

        if (file != null && !file.isEmpty()) {
            File filedownload = new File(filePath, productDTO.getProduct_code() + "_" + "product_img0" + ".png");

            try {
                FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(filedownload));
            } catch (IOException e) {
                e.printStackTrace();
            }
            productImgDTO.setProduct_img0(productDTO.getProduct_code() + "_" + "product_img0" + ".png");
        }

        if (secondFile != null && !secondFile.isEmpty()) {
            log.info("두 번째 파일이 존재합니다.");
            File secondfiledownload = new File(filePath, productDTO.getProduct_code() + "_" + "product_img1" + ".png");

            try {
                FileCopyUtils.copy(secondFile.getInputStream(), new FileOutputStream(secondfiledownload));
            } catch (IOException e) {
                e.printStackTrace();
            }

            productImgDTO.setProduct_img1(productDTO.getProduct_code() + "_" + "product_img1" + ".png");
        }

        productImgDTO.setProduct_code(productDTO.getProduct_code());
        log.info("물품이미지확인: {}", productImgDTO.getProduct_img0());

        log.info("product_code확인: {}", productDTO);
        productService.saveImgProcess(productImgDTO);

        return ResponseEntity.ok(null);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO) {
        log.info("물품수정확인: {}", productDTO);
        productService.updateProcess(productDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/delete/{product_code}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("product_code") int product_code) {
        log.info("물품삭제확인: {}", product_code);
        ProductimgDTO productImgDTO = new ProductimgDTO();

        productImgDTO = productService.contentImgProcess(product_code);
        log.info("이미지0: {}", productImgDTO.getProduct_img0());

        String filename = product_code + "_" + "product_img0" + ".png";
        File fileDownload = new File(filePath, filename);
        log.info(filename);

        if (fileDownload.exists()) {
            productService.deleteProductImgProcess(product_code);
            if (!fileDownload.delete()) {
                log.error("Failed to delete existing file.");
            }
        }

        productService.deleteProcess(product_code);

        return ResponseEntity.ok(null);
    }

    @GetMapping("/content/{product_code}")
    public ResponseEntity<ProductDTO> productcontent(@PathVariable("product_code") int product_code) {
        ProductDTO dto = productService.contentProcess(product_code);
        log.info("물품조회확인: {}", dto);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/content/img/{product_code}")
    public ResponseEntity<ProductimgDTO> productimgcontent(@PathVariable("product_code") int product_code) {
        ProductimgDTO dto = productService.contentImgProcess(product_code);
        log.info("물품이미지조회확인: {}", dto);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/categorylist/{category_name}")
    public ResponseEntity<Map<String, Object>> searchlist(@PathVariable("category_name") String category_name) {
        Map<String, Object> map = new HashMap<>();
        log.info("들어온 카테고리명:{}", category_name);
        List<ProductDTO> productList = productService.searchcategorylistProcess(category_name);

        List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());

        Map<Integer, Object> productImagesResults = new HashMap<>();
        for (Integer productCode : productCodes) {
            Object imgResult = productService.contentImgProcess(productCode);
            productImagesResults.put(productCode, imgResult);
        }

        map.put("productList", productList);
        map.put("productImages", productImagesResults);

        log.info("productList-get:{}", map.get("productList"));

        return ResponseEntity.ok(map);
    }
    
    @GetMapping("/list/{product_name}")
    public ResponseEntity<Map<String, Object>> searchcategorylist(@PathVariable("product_name") String product_name) {
        Map<String, Object> map = new HashMap<>();
        log.info("들어온 제품명:{}", product_name);
        List<ProductDTO> productList = productService.searchlistProcess(product_name);

        List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());

        Map<Integer, Object> productImagesResults = new HashMap<>();
        for (Integer productCode : productCodes) {
            Object imgResult = productService.contentImgProcess(productCode);
            productImagesResults.put(productCode, imgResult);
        }

        map.put("productList", productList);
        map.put("productImages", productImagesResults);

        log.info("productList-get:{}", map.get("productList"));

        return ResponseEntity.ok(map);
    }

    @GetMapping("/seller/{user_id}")
    public ResponseEntity<Map<String, Object>> sellerlist(@PathVariable("user_id") int user_id) {
        Map<String, Object> map = new HashMap<>();
        log.info("들어온 제품명:{}", user_id);
        List<ProductDTO> productList = productService.sellerlistProcess(user_id);

        List<Integer> productCodes = productList.stream().map(ProductDTO::getProduct_code).collect(Collectors.toList());

        Map<Integer, Object> productImagesResults = new HashMap<>();
        for (Integer productCode : productCodes) {
            Object imgResult = productService.contentImgProcess(productCode);
            productImagesResults.put(productCode, imgResult);
        }

        map.put("productList", productList);
        map.put("productImages", productImagesResults);

        log.info("productList-get:{}", map.get("productList"));

        return ResponseEntity.ok(map);
    }
}