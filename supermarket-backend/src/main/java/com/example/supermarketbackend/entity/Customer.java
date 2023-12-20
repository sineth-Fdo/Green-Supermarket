package com.example.supermarketbackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false, length = 255)
    private String name;
    @Column(unique = true,nullable = false, length = 255)
    private String email;
    @Column(nullable = false , length = 255)
    private String password;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private Cart cart;


    public Customer(Long id, String name, String email, String encode) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = encode;
    }

}
