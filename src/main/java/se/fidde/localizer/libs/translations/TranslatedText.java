package se.fidde.localizer.libs.translations;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import se.fidde.localizer.libs.common.Utils;

@Entity
public class TranslatedText {
	@Id
	@GeneratedValue
	private Long id;
	@Column(length = 1000)
	private String text;
	private Language language;

	private Date createdAt;

	public TranslatedText() {
	}

	public TranslatedText(String text, Language language) throws IllegalArgumentException {
		this.setText(text);
		this.setLanguage(language);
		this.setCreatedAt(new Date());
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

	public void setLanguage(Language language) {
		this.language = Utils.notNull("language", language);
	}

	public void setText(String text) {
		this.text = Utils.notNull("translated text", text);
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = Utils.notNull("createdAt", createdAt);
	}
}
