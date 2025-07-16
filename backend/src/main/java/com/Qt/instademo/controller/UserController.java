package com.Qt.instademo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.Qt.instademo.model.User;
import com.Qt.instademo.repository.UserRepo;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepo repo;

    @GetMapping("/user")
    public ResponseEntity<User> getUserByQuery(@RequestParam("id") Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // http://localhost:8080/api/user?id=1

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserByPath(@PathVariable("id") Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // http://localhost:8080/api/user/1

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> credentials) {
        String userIdName = credentials.get("userIdName");
        String password = credentials.get("password");
        User user = repo.findAll().stream()
                .filter(u -> u.getUserIdName().equals(userIdName) && u.getPassword().equals(password))
                .findFirst()
                .orElse(null);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}
