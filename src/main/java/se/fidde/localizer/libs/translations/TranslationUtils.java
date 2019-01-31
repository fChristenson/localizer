package se.fidde.localizer.libs.translations;

public class TranslationUtils {
	public static <T> T notNull(String name, T value) {
		if (value == null) {
			throw new IllegalArgumentException(String.format("%s can not be null", name));
		}

		return value;
	}

	public static String validateString(String name, String str) {
		TranslationUtils.notNull(name, str);

		if (str.trim().length() <= 0) {
			throw new IllegalArgumentException(String.format("%s can not be empty", name));
		}

		return str.trim();
	}
}
