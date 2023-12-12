package com.example.supermarketbackend.controller;

import com.example.supermarketbackend.dto.ProductDto;
import com.example.supermarketbackend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;



    @GetMapping
    private ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    private ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto productDto = productService.getProductById(id);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }


//    @PostMapping("/add")
//    public ResponseEntity<ProductDto> addProductWithCategory(
//            @RequestPart("productDto") ProductDto productDto,
//            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
//        productDto.setImageFile(imageFile);
//        ProductDto newProduct = productService.addProductWithCategory(productDto);
//        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
//    }



    @PostMapping("/add")
    public ResponseEntity<ProductDto> addProductWithCategory(@RequestBody ProductDto productDto) {
        ProductDto newProduct = productService.addProductWithCategory(productDto);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }



//    @PutMapping("update/{id}")
//    public ResponseEntity<ProductDto> updateProductWithCategory(
//            @RequestPart("productDto") ProductDto productDto,
//            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile,
//            @PathVariable Long id) {
//        productDto.setImageFile(imageFile);
//        ProductDto updatedProduct = productService.updateProductWithCategory(productDto, id);
//        return ResponseEntity.ok(updatedProduct);
//    }

    @PutMapping("update/{id}")
    public ResponseEntity<ProductDto> updateProductWithCategory(@RequestBody ProductDto productDto, @PathVariable Long id) {
        // Assuming you have a service variable named productService
        Long categoryId = (productDto.getCategory() != null) ? productDto.getCategory().getId() : null;

        ProductDto updatedProduct = productService.updateProduct(productDto, id, categoryId);

        return ResponseEntity.ok(updatedProduct);
    }



    @DeleteMapping("delete/{id}")
    private ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

}
