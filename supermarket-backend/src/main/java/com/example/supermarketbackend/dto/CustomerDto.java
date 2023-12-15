package com.example.supermarketbackend.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerDto {

    private Long id;
    private String name;
    private String email;
    private String password;

}
