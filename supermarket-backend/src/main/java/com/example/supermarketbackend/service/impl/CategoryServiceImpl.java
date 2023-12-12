package com.example.supermarketbackend.service.impl;

import com.example.supermarketbackend.dto.CategoryDto;
import com.example.supermarketbackend.entity.Category;
import com.example.supermarketbackend.exception.ResourceNotFoundException;
import com.example.supermarketbackend.repository.CategoryRepository;
import com.example.supermarketbackend.service.CategoryService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    private ModelMapper modelMapper;


    @Override
    public List<CategoryDto> getAllCategory() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map((category)-> modelMapper.map(category, CategoryDto.class)).
                collect(Collectors.toList());

    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id:" + id));
        return modelMapper.map(category, CategoryDto.class);

    }

    @Override
    public CategoryDto addCategory(CategoryDto categoryDto) {
        Category category = modelMapper.map(categoryDto, Category.class);
        Category savedCategory = categoryRepository.save(category);
        CategoryDto savedCategoryDto = modelMapper.map(savedCategory, CategoryDto.class);
        return savedCategoryDto;

    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id:" + id));
        category.setName(categoryDto.getName());
        Category updatedCategory = categoryRepository.save(category);
        return modelMapper.map(updatedCategory, CategoryDto.class);

    }

    @Override
    public void deleteById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id:" + id));
        categoryRepository.deleteById(id);

    }

}
