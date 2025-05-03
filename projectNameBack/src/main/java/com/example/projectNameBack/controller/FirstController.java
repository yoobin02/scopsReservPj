package com.example.projectNameBack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gogo")
public class FirstController {
    @GetMapping("/main")
    public String main(){
        return  "this is backend~~~!! 받아라 받았냐 받았지롱 받아봐";
    }
}
