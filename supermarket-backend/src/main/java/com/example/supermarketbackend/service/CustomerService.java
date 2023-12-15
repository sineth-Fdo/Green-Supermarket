package com.example.supermarketbackend.service;

import com.example.supermarketbackend.dto.CustomerDto;
import com.example.supermarketbackend.response.LoginResponse;

public interface CustomerService {

    String addCustomer(CustomerDto customerDto);

    LoginResponse login(String email, String password);

    CustomerDto getCustomerDetailsById(Long customerId);

}
