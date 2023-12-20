package com.example.supermarketbackend.repository;

import com.example.supermarketbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository  extends JpaRepository<Order, Integer> {

    List<Order> findByCustomer_Id(Long customerId);

}
