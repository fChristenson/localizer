package se.fidde.localizer.libs.translations;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class TranslatedText {
	@Id
	@GeneratedValue
	private Long id;
	private String text;
	private Language language;

	public TranslatedText() {
	}

	public TranslatedText(String text, Language language) throws IllegalArgumentException {
		this.id = -1L;
		this.text = TranslationUtils.notNull("translated text", text);
		this.language = TranslationUtils.notNull("language", language);
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public Language getLanguage() {
		return language;
	}
}
