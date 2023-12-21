package com.example.supermarketbackend.controller;

import com.example.supermarketbackend.service.impl.CartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cart")

public class CartController {


    @Autowired
    private CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/get-cart-id/{customerId}")
    public Long getCartIdByCustomerId(@PathVariable Long customerId) {
        return cartService.getCartIdByCustomerId(customerId);
    }


    @DeleteMapping("/deleteCartItems/{customerId}")
    public ResponseEntity<String> deleteCartItemsByCustomerId(@PathVariable Long customerId) {
        try {
            cartService.deleteCartItemsByCustomerId(customerId);
            return ResponseEntity.ok("Cart items deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting cart items: " + e.getMessage());
        }
    }

}
