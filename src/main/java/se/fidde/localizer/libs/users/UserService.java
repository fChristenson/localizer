package se.fidde.localizer.libs.users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository repo;

	public Optional<User> findUser(String username, String password) {
		return repo.findUserByUsernameAndPassword(username, password);
	}

	public User saveUser(User user) {
		return repo.save(user);
	}
}
