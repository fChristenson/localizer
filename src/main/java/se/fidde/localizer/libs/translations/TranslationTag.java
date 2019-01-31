package se.fidde.localizer.libs.translations;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class TranslationTag {
	@Id
	@GeneratedValue
	private Long id;
	private String text;

	public TranslationTag() {

	}

	public TranslationTag(String text) throws IllegalArgumentException {
		this.id = -1L;
		this.text = TranslationUtils.validateString("tag", text);
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}
}
