package com.example.supermarketbackend.repository;

import com.example.supermarketbackend.entity.Category;
import com.example.supermarketbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByCategory(Category category);
}
