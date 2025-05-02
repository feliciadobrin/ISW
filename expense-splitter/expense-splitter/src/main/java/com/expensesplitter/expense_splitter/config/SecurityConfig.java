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
                .cors()
                .and()
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/users/register",
                                "/api/users/login",
                                "/api/users",
                                "/api/users/*",
                                "/api/users/**",
                                "/api/users/email/{email:.+}", // esențial pentru email cu @
                                "/groups",
                                "/groups/**",
                                "/groups/*/users",
                                "/groups/*/expenses",
                                "/expenses"
                        ).permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/groups/**").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
