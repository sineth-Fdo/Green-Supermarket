package com.example.supermarketbackend.repository;

import com.example.supermarketbackend.entity.Category;
import com.example.supermarketbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByCategory(Category category);

    Optional<Object> findByName(String productName);
}
