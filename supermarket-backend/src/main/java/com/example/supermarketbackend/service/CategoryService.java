package com.example.supermarketbackend.service;

import com.example.supermarketbackend.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    List<CategoryDto> getAllCategory();

    CategoryDto getCategoryById(Long id);


    CategoryDto addCategory(CategoryDto categoryDto);

    CategoryDto updateCategory(CategoryDto categoryDto, Long id);

    void deleteById(Long id);
}
