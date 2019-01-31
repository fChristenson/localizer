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
		this.translationKey = TranslationUtils.validateString("key", incoming.getKey());
		List<TranslatedText> translations = new ArrayList<TranslatedText>();
		translations.add(new TranslatedText(incoming.getTranslation(), Language.ENGLISH));
		translations.add(new TranslatedText("", Language.SWEDISH));
		this.translations = translations;
		this.description = TranslationUtils.validateString("description", incoming.getDescription());
		List<TranslationTag> tags = new ArrayList<TranslationTag>();
		for (String tag : incoming.getTags()) {
			tags.add(new TranslationTag(tag));
		}
		this.tags = tags;
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

	@JsonProperty(value = "tags")
	private List<String> getJsonTags() {
		return tags.stream().map((tag) -> tag.getText()).collect(Collectors.toList());
	}
}
