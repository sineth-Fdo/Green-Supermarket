package com.example.supermarketbackend.controller;


import com.example.supermarketbackend.dto.CustomerDto;
import com.example.supermarketbackend.response.LoginResponse;
import com.example.supermarketbackend.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/customer")
@AllArgsConstructor
public class CustomerController {

    private CustomerService customerService;

    @PostMapping("/save")
    public String saveCustomer(@RequestBody CustomerDto customerDto) {

        String id = customerService.addCustomer(customerDto);

        return id;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestParam String email, @RequestParam String password) {
        LoginResponse response = customerService.login(email, password);

        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<CustomerDto> getCustomerDetails(@PathVariable Long id) {
        CustomerDto customerDto = customerService.getCustomerDetailsById(id);
        return ResponseEntity.ok(customerDto);
    }






}
