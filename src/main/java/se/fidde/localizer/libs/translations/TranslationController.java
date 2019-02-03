package se.fidde.localizer.libs.translations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationController {

	@Autowired
	private TranslationService translationService;

	@GetMapping("/api/v1/translations")
	public List<Translation> listTranslations() {
		return translationService.getAllTranslations();
	}

	@DeleteMapping("/api/v1/translations/{translationId}")
	public ResponseEntity<Void> deleteTranslation(@PathVariable Long translationId) {
		translationService.deleteTranslation(translationId);
		return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
	}

	@PostMapping("/api/v1/translations")
	public Translation saveTranslation(@RequestBody IncomingTranslation incomingTranslation) {
		Translation translationToSave = new Translation(incomingTranslation);
		return translationService.saveTranslation(translationToSave);
	}

	@PutMapping("/api/v1/translations/{translationId}")
	public Translation updateTranslation(@RequestBody IncomingTranslationUpdate incomingTranslation,
			@PathVariable Long translationId) {
		Optional<Translation> maybeTranslation = translationService.getTranslation(translationId);
		if (maybeTranslation.isPresent()) {
			Translation translationToUpdate = maybeTranslation.get();
			translationToUpdate.setDescription(incomingTranslation.getDescription());
			translationToUpdate.setTranslationKey(incomingTranslation.getKey());
			translationToUpdate.updateTags(incomingTranslation.getTags());
			translationToUpdate.updateTranslation(incomingTranslation.getTranslation());
			return translationService.saveTranslation(translationToUpdate);
		} else {
			throw new IllegalArgumentException(String.format("%s was not found", translationId));
		}
	}
}
