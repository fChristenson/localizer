package se.fidde.localizer.libs.translations;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationController {
    @RequestMapping("/api/v1/translations")
    public String list() {
        return "Hello world";
    }
}
