package com.example.supermarketbackend.service.impl;

import com.example.supermarketbackend.entity.Cart;
import com.example.supermarketbackend.entity.Customer;
import com.example.supermarketbackend.repository.CartRepository;
import com.example.supermarketbackend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CartRepository cartRepository;

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

}
