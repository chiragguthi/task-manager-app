package com.taskmanager.backend;

import com.taskmanager.backend.model.User;
import com.taskmanager.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TaskmanagerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskmanagerBackendApplication.class, args);
	}

	// This bean runs after the app starts and adds a default user if not present
	@Bean
	CommandLineRunner run(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByUsername("admin").isEmpty()) {
				User adminUser = new User("admin", passwordEncoder.encode("admin123"));
				userRepository.save(adminUser);
				System.out.println("✅ Default admin user created: admin / admin123");
			} else {
				System.out.println("ℹ️ Admin user already exists.");
			}
		};
	}
}

