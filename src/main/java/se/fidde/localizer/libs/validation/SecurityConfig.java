package se.fidde.localizer.libs.validation;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import se.fidde.localizer.libs.users.Role;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("foo").password(passwordEncoder().encode("foo"))
				.roles(Role.TRANSLATOR.toString(), Role.USER.toString()).and().withUser("bar")
				.password(passwordEncoder().encode("bar")).roles(Role.USER.toString());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.GET, "/**").hasRole(Role.USER.toString()).and()
				.authorizeRequests().antMatchers("/**").hasRole(Role.TRANSLATOR.toString()).and().formLogin()
				.defaultSuccessUrl("/").and().logout();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
