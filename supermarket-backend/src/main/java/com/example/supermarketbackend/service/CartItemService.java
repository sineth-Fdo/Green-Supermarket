package com.example.supermarketbackend.service;

import com.example.supermarketbackend.dto.CartItemDto;

import java.util.List;

public interface CartItemService {

    public void deleteCartItemById(Long cartItemId);
    List<CartItemDto> getAllCartItemsByCustomerId(Long customerId);


}
