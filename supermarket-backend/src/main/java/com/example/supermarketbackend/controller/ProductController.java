package com.example.supermarketbackend.controller;

import com.example.supermarketbackend.dto.ProductDto;
import com.example.supermarketbackend.exception.ResourceNotFoundException;
import com.example.supermarketbackend.response.CartRequest;
import com.example.supermarketbackend.service.ProductService;
import com.example.supermarketbackend.service.impl.FileUpload;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private FileUpload fileUpload;


    // upload image use id
    @PostMapping("/imagePid/{id}")
    public ResponseEntity<?> uploadImageProduct(@PathVariable Long id, @RequestParam("file") MultipartFile file) {

        ProductDto product = productService.getProductById(id);

        String imageName = null;

        try {
            String uploadImage =  fileUpload.uploadImage("supermarket-ui/public/images/", file);
            product.setImage(uploadImage);
            ProductDto updateProduct =   productService.updateProduct(product, id, product.getCategory().getId());

            return new  ResponseEntity<>(updateProduct, HttpStatus.ACCEPTED);

        }catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(Map.of("Message","File not Upload in server"),HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }



// Upload an image using product name
    @PostMapping("/images/{productName}")
    public ResponseEntity<?> uploadImageProduct(@PathVariable String productName, @RequestParam("file") MultipartFile file) {
        ProductDto product = productService.getProductByName(productName);

        if (product == null) {
            return new ResponseEntity<>(Map.of("message", "Product not found"), HttpStatus.NOT_FOUND);
        }

        try {
            String uploadImage = fileUpload.uploadImage("supermarket-ui/public/images/", file);
            product.setImage(uploadImage);

            ProductDto updateProduct = productService.updateProduct(product, product.getId(), product.getCategory().getId());

            return new ResponseEntity<>(updateProduct, HttpStatus.ACCEPTED);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(Map.of("message", "File not uploaded on the server"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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



    @PostMapping("/add")
    public ResponseEntity<ProductDto> addProductWithCategory(@RequestBody ProductDto productDto) {
        ProductDto newProduct = productService.addProductWithCategory(productDto);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }


    @PutMapping("update/{id}")
    public ResponseEntity<ProductDto> updateProductWithCategory(@RequestBody ProductDto productDto, @PathVariable Long id) {

        Long categoryId = (productDto.getCategory() != null) ? productDto.getCategory().getId() : null;

        ProductDto updatedProduct = productService.updateProduct(productDto, id, categoryId);

        return ResponseEntity.ok(updatedProduct);
    }



    @DeleteMapping("delete/{id}")
    private ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @PostMapping("/add-to-cart")
    public ResponseEntity<ProductDto> addProductToCart(@RequestBody CartRequest cartRequest) {

        ProductDto updatedProduct = productService.addProductToCart(cartRequest.getProductId(), cartRequest.getCustomerId(), cartRequest.getQuantity());

        return ResponseEntity.ok(updatedProduct);
    }

    // Get all products by category name
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<ProductDto>> getProductsByCategoryName(@PathVariable String categoryName) {
        try {
            List<ProductDto> products = productService.getProductsByCategoryName(categoryName);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
