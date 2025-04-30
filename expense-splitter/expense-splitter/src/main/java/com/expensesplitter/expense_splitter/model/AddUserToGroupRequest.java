package com.expensesplitter.expense_splitter.model;

public class AddUserToGroupRequest {
    private Long groupId;
    private Long userId;

    public AddUserToGroupRequest() {}

    public AddUserToGroupRequest(Long groupId, Long userId) {
        this.groupId = groupId;
        this.userId = userId;
    }

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
