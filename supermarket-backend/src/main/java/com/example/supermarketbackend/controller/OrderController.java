package com.example.supermarketbackend.controller;

import com.example.supermarketbackend.dto.OrderDto;
import com.example.supermarketbackend.exception.ResourceNotFoundException;
import com.example.supermarketbackend.response.OrderRequest;
import com.example.supermarketbackend.service.impl.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;


    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // create order
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest, Principal p) {
        try {
            String email = orderRequest.getEmail();
            OrderDto order = orderService.orderCreate(orderRequest, email);
            return new ResponseEntity<>(order, HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>("Order not created: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelOrderById(@PathVariable Long id) {
        this.orderService.CancelOrder(Math.toIntExact(id));
        return new ResponseEntity<>("Order Cancelled", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> DeleteOrderById(@PathVariable Long id) {
        this.orderService.DeleteOrder(Math.toIntExact(id));
        return new ResponseEntity<>("Order Cancelled", HttpStatus.OK);
    }


    // Get all orders summary
    @GetMapping("/all")
    public ResponseEntity<List<OrderDto>> getAllOrdersSummary() {
        List<OrderDto> orders = orderService.getAllOrdersSummary();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Get order details by customer ID
    @GetMapping("/{customerId}")
    public ResponseEntity<List<OrderDto>> getOrdersByCustomerId(@PathVariable Long customerId) {
        try {
            List<OrderDto> orders = orderService.getOrdersByCustomerId(customerId);
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
