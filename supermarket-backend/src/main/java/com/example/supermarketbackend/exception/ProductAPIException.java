package com.example.supermarketbackend.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ProductAPIException extends RuntimeException {
    private HttpStatus status;
    private String message;
}
