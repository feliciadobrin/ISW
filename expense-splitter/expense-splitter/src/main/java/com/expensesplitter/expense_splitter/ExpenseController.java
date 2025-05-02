package com.expensesplitter.expense_splitter;

import com.expensesplitter.expense_splitter.model.Expense;
import com.expensesplitter.expense_splitter.model.ExpenseRequest;
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
    public ResponseEntity<?> addExpense(@RequestBody ExpenseRequest request) {
        Optional<Group> groupOpt = groupRepository.findById(request.getGroupId());
        if (groupOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Grupul nu există");
        }

        Group group = groupOpt.get();
        Expense expense = new Expense(request.getDescription(), request.getAmount(), group);
        Expense savedExpense = expenseRepository.save(expense);

        return ResponseEntity.ok(savedExpense);
    }

}
