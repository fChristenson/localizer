package se.fidde.localizer.libs.translations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationController {

	@Autowired
	private TranslationService service;

	@GetMapping("/api/v1/translations")
	public List<Translation> listTranslations() {
		return service.getAllTranslations();
	}

	@PostMapping("/api/v1/translations")
	public Translation saveTranslation(@RequestBody IncomingTranslation incomingTranslation) {
		Translation translationToSave = new Translation(incomingTranslation);
		return service.saveTranslation(translationToSave);
	}
}
