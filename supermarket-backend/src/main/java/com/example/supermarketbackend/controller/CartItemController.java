package com.example.supermarketbackend.controller;


import com.example.supermarketbackend.dto.CartItemDto;
import com.example.supermarketbackend.service.CartItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cart-items")
@AllArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;



    @DeleteMapping("/delete/{cartItemId}")
    public ResponseEntity<String> deleteCartItemById(@PathVariable Long cartItemId) {
        cartItemService.deleteCartItemById(cartItemId);
        return ResponseEntity.ok("CartItem deleted successfully");
    }

    @GetMapping("/get-all-by-customer/{customerId}")
    public ResponseEntity<List<CartItemDto>> getAllCartItemsByCustomerId(@PathVariable Long customerId) {
        List<CartItemDto> cartItems = cartItemService.getAllCartItemsByCustomerId(customerId);
        return ResponseEntity.ok(cartItems);
    }

}
