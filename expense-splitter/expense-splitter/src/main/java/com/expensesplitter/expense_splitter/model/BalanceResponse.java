package com.expensesplitter.expense_splitter.model;

public class BalanceResponse {
    private String userName;
    private double totalAmount;

    public BalanceResponse(String userName, double totalAmount) {
        this.userName = userName;
        this.totalAmount = totalAmount;
    }

    public String getUserName() {
        return userName;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
}
