package se.fidde.localizer.libs.users;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import se.fidde.localizer.libs.common.Utils;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue
	public Long id;
	public String username;
	public String password;
	public Role role;

	public User() {
	}

	public User(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
		this.setRole(Role.USER);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = Utils.notNull("id", id);
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = Utils.validateString("username", username);
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = Utils.validateString("password", password);
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = Utils.notNull("role", role);
	}
}
