package com.example.supermarketbackend.dto;


import com.example.supermarketbackend.entity.Product;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderItemDto {

    private int orderItemId;
    private ProductDto product;
    private double totalProductPrice;
    private OrderDto order;


    public OrderItemDto(int orderItemId, Product product, double totalProductPrice, Object order) {

    }

}
