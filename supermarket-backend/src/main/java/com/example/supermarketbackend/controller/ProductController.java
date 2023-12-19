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


    //Upload a image
    @PostMapping("/images/{id}")
    public ResponseEntity<?> uploadImageProduct(@PathVariable Long id, @RequestParam("file") MultipartFile file) {

        ProductDto product = productService.getProductById(id);

        String imageName = null;

        try {
//          String uploadImage =  fileUpload.uploadImage("supermarket-ui/public/images/", file);
            String uploadImage =  fileUpload.uploadImage("supermarket-ui/public/images/", file);
            product.setImage(uploadImage);
            ProductDto updateProduct =   productService.updateProduct(product, id, product.getCategory().getId());

            return new  ResponseEntity<>(updateProduct, HttpStatus.ACCEPTED);

        }catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(Map.of("Message","File not Upload in server"),HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    //download a image
    @GetMapping("/images/download/{id}")
    public ResponseEntity<InputStreamResource> downloadImageProduct(@PathVariable Long id) {
        ProductDto product = productService.getProductById(id);

        try {
            String imagePath = "supermarket-ui/public/images/" + product.getImage();
            File file = new File(imagePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentDispositionFormData("attachment", file.getName());

            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
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

    @PostMapping("/add-to-cart")
    public ResponseEntity<ProductDto> addProductToCart(@RequestBody CartRequest cartRequest) {

        ProductDto updatedProduct = productService.addProductToCart(cartRequest.getProductId(), cartRequest.getCustomerId(), cartRequest.getQuantity());

        return ResponseEntity.ok(updatedProduct);
    }

    // Get all products by category ID
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDto>> getProductsByCategoryId(@PathVariable Long categoryId) {
        try {
            List<ProductDto> products = productService.getProductsByCategoryId(categoryId);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
