package com.example.supermarketbackend.controller;


import com.example.supermarketbackend.dto.MailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/send")
    public String sendEmail(@RequestBody MailDto mailDto) {

        try {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(mailDto.getTo());
        msg.setFrom("sinethinosh100@gmail.com");
        msg.setSubject(mailDto.getSubject());
        msg.setText(mailDto.getMessage());

        javaMailSender.send(msg);
            System.out.println(msg.toString());
        }catch(Exception e) {

            return e.getMessage();

        }



        return "Email sent";
    }

}
