package com.expensesplitter.expense_splitter;

import com.expensesplitter.expense_splitter.model.User;
import com.expensesplitter.expense_splitter.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ExpenseSplitterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseSplitterApplication.class, args);
	}

	// Adaugă un user în baza de date la pornire
	@Bean
	CommandLineRunner run(UserRepository userRepository) {
		return args -> {
			//userRepository.save(new User(null, "Rozen", "rozen@email.com", "parola123"));
			//System.out.println("User adăugat!");
		};
	}
}
