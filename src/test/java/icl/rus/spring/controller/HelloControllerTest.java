package icl.rus.spring.controller;

import icl.rus.spring.controller.base.Sections;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.core.StringContains.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {
    @Autowired
    private HelloController controller;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void hello() throws Exception {
        assertThat(controller).isNotNull();

        mockMvc.perform(get(Sections.REST + "/hello"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(new SimpleDateFormat("dd MMMM yyyy", Locale.US).format(new Date()))));
    }
}
