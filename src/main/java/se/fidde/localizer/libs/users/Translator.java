package se.fidde.localizer.libs.users;

import javax.persistence.Entity;

@Entity
public class Translator extends User {
	public Translator(String username, String password) {
		super(username, password);
		this.setRole(Role.TRANSLATOR);
	}
}
