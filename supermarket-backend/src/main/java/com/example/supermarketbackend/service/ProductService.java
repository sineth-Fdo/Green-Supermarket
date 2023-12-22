package com.example.supermarketbackend.service;

import com.example.supermarketbackend.dto.ProductDto;
import com.example.supermarketbackend.entity.Category;

import java.util.List;

public interface ProductService {

    List<ProductDto> getAllProducts();
    ProductDto getProductById(Long id);
    ProductDto updateProduct(ProductDto productDto, Long id, Long categoryId);
    ProductDto addProductWithCategory(ProductDto productDto);
    void deleteById(Long id);
    ProductDto addProductToCart(Long productId, Long customerId, int quantity);

    List<ProductDto> getProductsByCategoryName(String categoryName);
}
