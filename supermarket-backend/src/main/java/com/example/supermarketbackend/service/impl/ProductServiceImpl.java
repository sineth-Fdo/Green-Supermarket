package com.example.supermarketbackend.service.impl;

import com.example.supermarketbackend.dto.CategoryDto;
import com.example.supermarketbackend.dto.ProductDto;
import com.example.supermarketbackend.entity.*;
import com.example.supermarketbackend.exception.ResourceNotFoundException;
import com.example.supermarketbackend.repository.*;
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
    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
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

    @Override
    public ProductDto addProductToCart(Long productId, Long customerId, int quantity) {
        // Retrieve the product and customer
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id:" + productId));

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id:" + customerId));

        // Check if the customer has a cart, if not, create one
        Cart cart = customer.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setCustomer(customer);
            customer.setCart(cart);
            customerRepository.save(customer);
        }

        // Check if the product is already in the cart, if yes, update the quantity
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product);
        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            // Create a new cart item
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(quantity);
        }

        // Update the total price in the cart item
        double totalPrice = product.getPrice() * cartItem.getQuantity();
        cartItem.setTotalPrice(totalPrice);

        // Save the cart item
        cartItemRepository.save(cartItem);

        // Update the total quantity and total price in the cart
        cart.getCartItems().add(cartItem);
        // Add other necessary updates to the cart...

        // Return the updated product DTO
        return modelMapper.map(product, ProductDto.class);
    }


}
