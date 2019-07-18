package se.fidde.localizer.libs.translations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationApiController {
	@Autowired
	private TranslationService translationService;

	@GetMapping("/api/public/v1/translations")
	public List<TranslatedText> listTranslations(@RequestParam(required = true) String language) {
		return translationService.getTranslationsByLanguage(Language.valueOf(language));
	}
}
