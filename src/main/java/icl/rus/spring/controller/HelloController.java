package icl.rus.spring.controller;

import icl.rus.spring.controller.base.Sections;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@RestController
@RequestMapping(Sections.REST)
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, the time at the server is now " + new SimpleDateFormat("dd MMMM yyyy", Locale.US).format(new Date()) + "\n";
    }
}
