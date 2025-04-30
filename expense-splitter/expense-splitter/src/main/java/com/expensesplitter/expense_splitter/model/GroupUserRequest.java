package com.expensesplitter.expense_splitter.model;

public class GroupUserRequest {
    private Long groupId;
    private Long userId;

    // Getters și Setters
    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
