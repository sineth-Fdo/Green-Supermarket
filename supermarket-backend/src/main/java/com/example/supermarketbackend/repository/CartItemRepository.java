package com.example.supermarketbackend.repository;

import com.example.supermarketbackend.entity.Cart;
import com.example.supermarketbackend.entity.CartItem;
import com.example.supermarketbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProduct(Cart cart, Product product);
    void deleteById(Long id);

    List<CartItem> findByCart_Customer_Id(Long customerId);

}
