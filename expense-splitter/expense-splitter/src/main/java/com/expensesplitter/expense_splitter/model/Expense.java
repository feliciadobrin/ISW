package com.expensesplitter.expense_splitter.model;

import jakarta.persistence.*;

@Entity
@Table(name = "expense")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String description;

    // 🔧 RELAȚIA corectă cu Group
    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    // ✅ Constructor gol (necesar pentru JPA)
    public Expense() {}

    // ✅ Constructor util (dacă ai nevoie)
    public Expense(String description, double amount, Group group) {
        this.description = description;
        this.amount = amount;
        this.group = group;
    }

    // ✅ GETTERI & SETTERI
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
