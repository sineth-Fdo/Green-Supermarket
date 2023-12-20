package com.example.supermarketbackend.repository;

import com.example.supermarketbackend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
