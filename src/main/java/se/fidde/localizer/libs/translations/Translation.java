package se.fidde.localizer.libs.translations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "translations")
public class Translation {
	@Id
	@GeneratedValue
	private Long id;
	private String translationKey;
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TranslatedText> translations;
	private String description;
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TranslationTag> tags;

	public Translation() {

	}

	public Translation(IncomingTranslation incoming) throws IllegalArgumentException {
		this.id = -1L;
		this.setTranslationKey(incoming.getKey());
		this.createTranslations(incoming.getTranslation());
		this.setDescription(incoming.getDescription());
		this.createTags(incoming.getTags());
	}

	public Long getId() {
		return id;
	}

	public List<TranslatedText> getTranslations() {
		return translations;
	}

	public String getDescription() {
		return description;
	}

	public List<TranslationTag> getTags() {
		return tags;
	}

	public String getTranslationKey() {
		return translationKey;
	}

	public void setTranslationKey(String translationKey) {
		TranslationUtils.validateString("key", translationKey);
		this.translationKey = translationKey;
	}

	public void setTranslations(List<TranslatedText> translations) {
		this.translations = translations;
	}

	public void setDescription(String description) {
		this.description = TranslationUtils.validateString("description", description);
	}

	public void setTags(List<TranslationTag> tags) {
		this.tags = tags;
	}

	public void updateTags(List<String> tags) {
		this.tags.clear();
		for (String tag : tags) {
			this.tags.add(new TranslationTag(tag));
		}
	}

	public void updateTranslation(TranslatedText text) {
		Optional<TranslatedText> maybeText = this.translations.stream().filter((t) -> t.getId() == text.getId())
				.findFirst();
		if (maybeText.isPresent() == false) {
			throw new IllegalArgumentException(String.format("%s could not be found", text.getId()));
		}
		maybeText.get().setText(text.getText());
	}

	private void createTranslations(String translation) {
		List<TranslatedText> translations = new ArrayList<TranslatedText>();
		TranslationUtils.validateString("translation", translation);
		translations.add(new TranslatedText(translation, Language.ENGLISH));
		translations.add(new TranslatedText("", Language.SWEDISH));
		this.translations = translations;
	}

	private void createTags(List<String> stringTags) {
		List<TranslationTag> tags = new ArrayList<TranslationTag>();
		for (String tag : stringTags) {
			tags.add(new TranslationTag(tag));
		}
		this.tags = tags;

	}

	@JsonProperty(value = "tags")
	private List<String> getJsonTags() {
		return tags.stream().map((tag) -> tag.getText()).collect(Collectors.toList());
	}
}
