package com.example.supermarketbackend.controller;

import com.example.supermarketbackend.service.impl.CartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {


    @Autowired
    private CartService cartService;

    @GetMapping("/get-cart-id/{customerId}")
    public Long getCartIdByCustomerId(@PathVariable Long customerId) {
        return cartService.getCartIdByCustomerId(customerId);
    }

}
