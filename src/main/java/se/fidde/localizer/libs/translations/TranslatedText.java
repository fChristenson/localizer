package se.fidde.localizer.libs.translations;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
		this.id = -1L;
		this.text = TranslationUtils.notNull("translated text", text);
		this.language = TranslationUtils.notNull("language", language);
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

	public void setText(String text) {
		this.text = TranslationUtils.notNull("translated text", text);
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
}
