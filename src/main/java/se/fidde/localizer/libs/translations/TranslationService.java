package se.fidde.localizer.libs.translations;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TranslationService {

	@Autowired
	private TranslationRepository repo;

	public List<TranslatedText> getTranslationsByLanguage(Language language) {
		return repo.findAll().stream().map(translation -> translation.getTranslations())
				.flatMap(list -> Stream.of(list.stream().filter(text -> text.getLanguage() == language)
						.sorted((t, t2) -> t2.getCreatedAt().compareTo(t.getCreatedAt())).iterator().next()))
				.collect(Collectors.toList());
	}

	public void deleteTranslation(Long translationId) {
		repo.deleteById(translationId);
	}

	public List<Translation> getAllTranslations() {
		return repo.findAll();
	}

	public Translation saveTranslation(Translation translationToSave) {
		return repo.save(translationToSave);
	}

	public Optional<Translation> getTranslation(Long translationId) {
		return repo.findById(translationId);
	}
}
