package icl.rus.spring.controller;

import icl.rus.spring.controller.base.Sections;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping(Sections.REST)
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, the time at the server is now " + new Date() + "\n";
    }
}
