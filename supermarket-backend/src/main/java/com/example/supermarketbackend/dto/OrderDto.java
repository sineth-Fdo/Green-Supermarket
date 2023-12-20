package com.example.supermarketbackend.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDto {

    private int orderId;
    private String paymentStatus;
    private double orderAmount;
    private String billingAddress;
    private CustomerDto customer;
    private Set<OrderItemDto> orderItem = new HashSet<>();


    public <R> OrderDto(int orderId, String paymentStatus, double orderAmount, String billingAddress, R collect) {
    }

}
