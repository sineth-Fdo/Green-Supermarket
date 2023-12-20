package com.example.supermarketbackend.service.impl;


import com.example.supermarketbackend.dto.CustomerDto;
import com.example.supermarketbackend.entity.Customer;
import com.example.supermarketbackend.exception.ResourceNotFoundException;
import com.example.supermarketbackend.repository.CustomerRepository;
import com.example.supermarketbackend.response.LoginResponse;
import com.example.supermarketbackend.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;

    @Autowired
    public CustomerImpl(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String addCustomer(CustomerDto customerDto) {
        Customer customer = new Customer(
                customerDto.getId(),
                customerDto.getName(),
                customerDto.getEmail(),
                passwordEncoder.encode(customerDto.getPassword())
        );

        customerRepository.save(customer);

        return customer.getName();
    }

    @Override
    public LoginResponse login(String email, String password) {
        Optional<Customer> customerOptional = customerRepository.findByEmail(email);

        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            if (passwordEncoder.matches(password, customer.getPassword())) {
                return new LoginResponse(customer.getId());
            }
        }

        return null;
    }

    @Override
    public CustomerDto getCustomerDetailsById(Long customerId) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);

        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            return convertToDto(customer);
        } else {
            throw new ResourceNotFoundException("Customer not found with ID: " + customerId);
        }
    }

    private CustomerDto convertToDto(Customer customer) {
        return new CustomerDto(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPassword()
        );
    }

}
