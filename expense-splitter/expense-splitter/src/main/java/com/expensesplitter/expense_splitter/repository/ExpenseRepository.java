package com.expensesplitter.expense_splitter.repository;

import com.expensesplitter.expense_splitter.model.Expense;
import com.expensesplitter.expense_splitter.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByGroup(Group group);

    void deleteByGroup(Group group);
    List<Expense> findByGroupId(Long groupId);

}
