package com.RideSharingApp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo-controller")
public class DemoController {

    @GetMapping
    public ResponseEntity<String> sayGello() {
        return ResponseEntity.ok("Hello from sec endpount.");
    }
}
