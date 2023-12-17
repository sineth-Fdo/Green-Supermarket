package com.example.supermarketbackend.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartItemDto {

    private Long id;
    private int quantity;
    private double totalPrice;
    private ProductDto product;


}
