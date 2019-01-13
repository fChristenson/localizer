package se.fidde.localizer.libs.translations;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationRoutes {
    @GetMapping("/api/v1/translations")
    public String list() {
        return "Hello world";
    }
}
