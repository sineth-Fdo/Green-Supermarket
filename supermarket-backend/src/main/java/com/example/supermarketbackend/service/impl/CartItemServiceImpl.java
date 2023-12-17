package com.example.supermarketbackend.service.impl;

import com.example.supermarketbackend.dto.CartItemDto;
import com.example.supermarketbackend.entity.CartItem;
import com.example.supermarketbackend.exception.ResourceNotFoundException;
import com.example.supermarketbackend.repository.CartItemRepository;
import com.example.supermarketbackend.service.CartItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public void deleteCartItemById(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found with id:" + cartItemId));

        cartItemRepository.delete(cartItem);
    }



    @Override
    public List<CartItemDto> getAllCartItemsByCustomerId(Long customerId) {
        List<CartItem> cartItems = cartItemRepository.findByCart_Customer_Id(customerId);
        return cartItems.stream()
                .map(cartItem -> modelMapper.map(cartItem, CartItemDto.class))
                .collect(Collectors.toList());
    }


}
