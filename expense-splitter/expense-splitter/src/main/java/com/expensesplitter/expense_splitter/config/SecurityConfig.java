package com.expensesplitter.expense_splitter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*") // poți înlocui cu http://localhost:8081
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*");
            }
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors() // ✅ activează suportul CORS definit mai sus
                .and()
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/users/register",
                                "/api/users/login",
                                "/groups",
                                "/groups/**",
                                "/groups/**/users",
                                "/email",
                                "/email/**",
                                "/expenses",
                                "/groups/{groupId}/expenses",
                                "/*/expenses",
                                "/groups/{groupId}", // mai exact
                                "/api/users/email/{email}",
                                "/groups/{groupId}/**",
                                "/api/users/email/**",  // ✅ adaugă această linie
                                "api/users/{id}"
                        ).permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/groups/**").permitAll() // 🔥 important!
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
