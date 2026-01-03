package in.sunny.musifyapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLOutput;

@RestController
@RequestMapping("api/health")
public class RootController {

    @GetMapping
    public String healthCheck(){
        return "API Working";
    }
}
