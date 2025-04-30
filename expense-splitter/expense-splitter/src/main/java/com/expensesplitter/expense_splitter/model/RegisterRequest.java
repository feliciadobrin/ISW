package com.expensesplitter.expense_splitter.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Numele este obligatoriu!")
    private String name;

    @NotBlank(message = "Email-ul este obligatoriu!")
    @Email(message = "Email-ul nu este valid!")
    private String email;

    @NotBlank(message = "Parola este obligatorie!")
    @Size(min = 6, message = "Parola trebuie să aibă minim 6 caractere!")
    private String password;

    public RegisterRequest() {}

    public RegisterRequest(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
