package com.example.supermarketbackend.dto;


import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartDto {

    private Long id;
    private List<CartItemDto> cartItems;
    private CustomerDto customer;
}
