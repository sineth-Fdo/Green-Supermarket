package com.example.supermarketbackend.service.impl;

import com.example.supermarketbackend.dto.CategoryDto;
import com.example.supermarketbackend.dto.ProductDto;
import com.example.supermarketbackend.entity.Category;
import com.example.supermarketbackend.entity.Product;
import com.example.supermarketbackend.exception.ResourceNotFoundException;
import com.example.supermarketbackend.repository.CategoryRepository;
import com.example.supermarketbackend.repository.ProductRepository;
import com.example.supermarketbackend.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
@Data
public class ProductServiceImpl implements ProductService {


    @Autowired
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private ModelMapper modelMapper;



    public void deleteById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id:" + id));
        productRepository.deleteById(id);
    }


    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
    }


    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id:" + id));

        return modelMapper.map(product, ProductDto.class);
    }

//    @Override
//    public ProductDto updateProduct(ProductDto productDto, Long id, Long categoryId) {
//        Product product = productRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id:" + id));
//
//        product.setName(productDto.getName());
//        product.setPrice(productDto.getPrice());
//        product.setImage(productDto.getImage());
//
//        // Handle image upload
//        if (productDto.getImageFile() != null) {
//            String fileName = saveImage(productDto.getImageFile());
//            product.setImage(fileName);
//        }
//
//        // Check if the category is provided in the request
//        if (productDto.getCategory() != null && productDto.getCategory().getName() != null) {
//            // Retrieve or create a new category
//            Category category = categoryRepository.findByName(productDto.getCategory().getName())
//                    .orElseGet(() -> {
//                        Category newCategory = new Category();
//                        newCategory.setName(productDto.getCategory().getName());
//                        return categoryRepository.save(newCategory);
//                    });
//
//            product.setCategory(category);
//        }
//
//        Product updatedProduct = productRepository.save(product);
//
//        return modelMapper.map(updatedProduct, ProductDto.class);
//    }


    @Override
    public ProductDto updateProduct(ProductDto productDto, Long id, Long categoryId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id:" + id));

        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setImage(productDto.getImage());

        // Check if the category is provided in the request
        if (productDto.getCategory() != null && productDto.getCategory().getName() != null) {
            // Retrieve or create a new category
            Category category = categoryRepository.findByName(productDto.getCategory().getName())
                    .orElseGet(() -> {
                        Category newCategory = new Category();
                        newCategory.setName(productDto.getCategory().getName());
                        return categoryRepository.save(newCategory);
                    });

            product.setCategory(category);
        }

        Product updatedProduct = productRepository.save(product);

        return modelMapper.map(updatedProduct, ProductDto.class);
    }


//    @Override
//    public ProductDto addProductWithCategory(ProductDto productDto) {
//        // Convert ProductDto to Product entity
//        Product product = new Product();
//        product.setName(productDto.getName());
//        product.setPrice(productDto.getPrice());
//        product.setImage(productDto.getImage());
//
//        // Handle image upload
//        if (productDto.getImageFile() != null) {
//            String fileName = saveImage(productDto.getImageFile());
//            product.setImage(fileName);
//        }
//
//        // Retrieve or create a new category
//        Category category = categoryRepository.findByName(productDto.getCategory().getName())
//                .orElseGet(() -> {
//                    Category newCategory = new Category();
//                    newCategory.setName(productDto.getCategory().getName());
//                    return categoryRepository.save(newCategory);
//                });
//
//        product.setCategory(category);
//
//        // Save the product
//        Product savedProduct = productRepository.save(product);
//
//        // Convert the saved Product entity back to ProductDto and return it
//        return new ProductDto(
//                savedProduct.getId(),
//                savedProduct.getName(),
//                savedProduct.getPrice(),
//                savedProduct.getImage(),
//                new CategoryDto(savedProduct.getCategory().getId(), savedProduct.getCategory().getName())
//        );
//    }


    @Override
    public ProductDto addProductWithCategory(ProductDto productDto) {
        // Convert ProductDto to Product entity
        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setImage(productDto.getImage());

        // Retrieve or create a new category
        Category category = categoryRepository.findByName(productDto.getCategory().getName())
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(productDto.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });

        product.setCategory(category);

        // Save the product
        Product savedProduct = productRepository.save(product);

        // Convert the saved Product entity back to ProductDto and return it
        return new ProductDto(
                savedProduct.getId(),
                savedProduct.getName(),
                savedProduct.getPrice(),
                savedProduct.getImage(),
                new CategoryDto(savedProduct.getCategory().getId(), savedProduct.getCategory().getName())
        );
    }


}
