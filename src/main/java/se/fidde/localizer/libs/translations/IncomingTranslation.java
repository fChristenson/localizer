package se.fidde.localizer.libs.translations;

import java.util.List;

public class IncomingTranslation {
	private String key;
	private String translation;
	private String description;
	private List<String> tags;

	public String getKey() {
		return key;
	}

	public String getTranslation() {
		return translation;
	}

	public String getDescription() {
		return description;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setTranslation(String translation) {
		this.translation = translation;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	@Override
	public String toString() {
		return String.format("IncomingTranslation(key: %s, translation: %s, description: %s, tags: %s)", this.getKey(),
				this.getTranslation(), this.getDescription(), String.join(",", this.getTags()));
	}
}
