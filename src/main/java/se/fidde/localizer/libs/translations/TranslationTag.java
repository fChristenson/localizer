package se.fidde.localizer.libs.translations;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import se.fidde.localizer.libs.common.Utils;

@Entity
public class TranslationTag {
	@Id
	@GeneratedValue
	private Long id;
	private String text;

	public TranslationTag() {

	}

	public TranslationTag(String text) throws IllegalArgumentException {
		this.setText(text);
	}

	public void setText(String text) {
		this.text = Utils.validateString("tag", text);
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}
}
