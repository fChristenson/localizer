package se.fidde.localizer.libs.translations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TranslationService {

	@Autowired
	private TranslationRepository repo;

	public void deleteTranslation(Long translationId) {
		repo.deleteById(translationId);
	}

	public List<Translation> getAllTranslations() {
		return repo.findAll();
	}

	public Translation saveTranslation(Translation translationToSave) {
		return repo.save(translationToSave);
	}
}
