package se.fidde.localizer.libs.translations;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import se.fidde.localizer.libs.common.Utils;

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
		this.translationKey = Utils.validateString("key", translationKey);
	}

	public void setTranslations(List<TranslatedText> translations) {
		this.translations = Utils.notNull("translations", translations);
	}

	public void setDescription(String description) {
		this.description = Utils.validateString("description", description);
	}

	public void setTags(List<TranslationTag> tags) {
		this.tags = Utils.notNull("tags", tags);
	}

	public void updateTags(List<String> tags) {
		this.tags.clear();
		for (String tag : tags) {
			this.tags.add(new TranslationTag(tag));
		}
	}

	public void addTranslation(TranslatedText text) {
		this.translations.add(text);
	}

	private void createTranslations(String translation) {
		List<TranslatedText> translations = new ArrayList<TranslatedText>();
		Utils.validateString("translation", translation);
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
