package com.example.supermarketbackend.dto;


import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDto {

    private Long id;
    private String name;
    private Long price;
    private String image;
    private CategoryDto category;
}
