package com.expensesplitter.expense_splitter;

import com.expensesplitter.expense_splitter.model.Expense;
import com.expensesplitter.expense_splitter.model.Group;
import com.expensesplitter.expense_splitter.repository.ExpenseRepository;
import com.expensesplitter.expense_splitter.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/groups")
public class ExpenseController {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/{groupId}/expenses")
    public ResponseEntity<List<Expense>> getExpensesByGroupId(@PathVariable Long groupId) {
        List<Expense> expenses = expenseRepository.findByGroupId(groupId);
        return ResponseEntity.ok(expenses);
    }

    @PostMapping("/expenses")
    public ResponseEntity<?> addExpense(@RequestBody Expense expense) {
        expenseRepository.save(expense);
        return ResponseEntity.ok("Cheltuiala a fost adăugată cu succes.");
    }

}
