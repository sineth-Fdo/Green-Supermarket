package com.example.supermarketbackend.service.impl;

import com.example.supermarketbackend.dto.CustomerDto;
import com.example.supermarketbackend.dto.OrderDto;
import com.example.supermarketbackend.dto.OrderItemDto;
import com.example.supermarketbackend.dto.ProductDto;
import com.example.supermarketbackend.entity.*;
import com.example.supermarketbackend.exception.ResourceNotFoundException;
import com.example.supermarketbackend.repository.CartRepository;
import com.example.supermarketbackend.repository.CustomerRepository;
import com.example.supermarketbackend.repository.OrderRepository;
import com.example.supermarketbackend.response.OrderRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }



    // order create
    public OrderDto orderCreate(OrderRequest request, String email){

        Customer customer = this.customerRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        int cartId = request.getCartId();
        String  orderAddress = request.getOrderAddress();
        //find cart
        Cart cart = this.cartRepository.findById((long) cartId).orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        // get cart items
        List<CartItem> items = cart.getCartItems();

        Order order = new Order();

        AtomicReference<Double> totalOrderPrice = new AtomicReference<Double>(0.0);

        Set<OrderItem> orderItems =  items.stream().map((cartItem) -> {
            OrderItem orderItem = new OrderItem();
            // set cartItem into OrderItem

            //set product into orderItem
            orderItem.setProduct(cartItem.getProduct());

            // product quantity in to orderItem
            orderItem.setProductQuantity(cartItem.getQuantity());

            orderItem.setTotalProductPrice(cartItem.getTotalPrice());
            orderItem.setOrder(order);
            totalOrderPrice.set(totalOrderPrice.get() + orderItem.getTotalProductPrice());
            Long productId = orderItem.getProduct().getId();
            return orderItem;

        }).collect(Collectors.toSet());

        order.setBillingAddress(orderAddress);
        order.setOrderAmount(totalOrderPrice.get());
        order.setPaymentStatus("pending");
        order.setCustomer(customer);
        order.setOrderItem(orderItems);
        Order save;
        if(order.getOrderAmount() > 0) {

            save = this.orderRepository.save(order);
            cart.getCartItems().clear();
            this.cartRepository.save(cart);

        }else {
            throw new ResourceNotFoundException("Order not created");
        }

        return this.modelMapper.map(save, OrderDto.class);

    }


    // Cancel order with clearing the cart
    public void CancelOrder(int orderId) {
        Order order = this.orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));


        Cart cart = order.getCustomer().getCart();
        if (cart != null) {
            cart.getCartItems().clear();

            order.getCustomer().setCart(null);
            this.cartRepository.save(cart);
        }

        // Update order status to "cancelled"
        order.setPaymentStatus("cancelled");
        this.orderRepository.save(order);
        this.orderRepository.delete(order);
    }


    // Get all orders summary
    public List<OrderDto> getAllOrdersSummary() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> new OrderDto(
                        order.getOrderId(),
                        order.getPaymentStatus(),
                        order.getOrderAmount(),
                        order.getBillingAddress(),
                        new CustomerDto(
                                order.getCustomer().getId(),
                                order.getCustomer().getName(),
                                order.getCustomer().getEmail(),
                                order.getCustomer().getPassword()
                        ),
                        order.getOrderItem().stream().map(orderItem ->
                                new OrderItemDto(
                                        orderItem.getOrderItemId(),
                                        modelMapper.map(orderItem.getProduct(), ProductDto.class),
                                        orderItem.getTotalProductPrice(),
                                        null
                                )
                        ).collect(Collectors.toSet())
                ))
                .collect(Collectors.toList());
    }

    // Get order details by customer ID
    public List<OrderDto> getOrdersByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByCustomer_Id(customerId);
        return orders.stream()
                .map(order -> new OrderDto(
                        order.getOrderId(),
                        order.getPaymentStatus(),
                        order.getOrderAmount(),
                        order.getBillingAddress(),
                        new CustomerDto(
                                order.getCustomer().getId(),
                                order.getCustomer().getName(),
                                order.getCustomer().getEmail(),
                                order.getCustomer().getPassword()
                        ),
                        order.getOrderItem().stream().map(orderItem ->
                                new OrderItemDto(
                                        orderItem.getOrderItemId(),
                                        modelMapper.map(orderItem.getProduct(), ProductDto.class),
                                        orderItem.getTotalProductPrice(),
                                        null
                                )
                        ).collect(Collectors.toSet())
                ))
                .collect(Collectors.toList());
    }



}
