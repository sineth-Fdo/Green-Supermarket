package com.example.supermarketbackend.service.impl;

import com.example.supermarketbackend.entity.Cart;
import com.example.supermarketbackend.entity.Customer;
import com.example.supermarketbackend.repository.CartItemRepository;
import com.example.supermarketbackend.repository.CartRepository;
import com.example.supermarketbackend.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public Long getCartIdByCustomerId(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + customerId));

        Cart cart = customer.getCart();
        if (cart != null) {
            return cart.getId();
        } else {
            throw new RuntimeException("Cart not found for Customer ID: " + customerId);
        }
    }

    @Transactional
    public void deleteCartItemsByCustomerId(Long customerId) {
        // Find the cart associated with the customer
        Long cartId = getCartIdByCustomerId(customerId);
        // Delete all cart items associated with the cart
        cartItemRepository.deleteByCartId(cartId);
    }

}
