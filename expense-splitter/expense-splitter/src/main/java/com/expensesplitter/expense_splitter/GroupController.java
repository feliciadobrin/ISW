// GroupController.java
package com.expensesplitter.expense_splitter;

import com.expensesplitter.expense_splitter.model.Group;
import com.expensesplitter.expense_splitter.model.User;
import com.expensesplitter.expense_splitter.repository.GroupRepository;
import com.expensesplitter.expense_splitter.repository.UserRepository;
import com.expensesplitter.expense_splitter.model.GroupUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.expensesplitter.expense_splitter.model.Expense;
import com.expensesplitter.expense_splitter.repository.ExpenseRepository;
import com.expensesplitter.expense_splitter.model.ExpenseRequest;
import com.expensesplitter.expense_splitter.model.BalanceResponse;

import java.util.*;
import org.springframework.http.HttpStatus;




import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private ExpenseRepository expenseRepository;

    @PostMapping("/groups")
    public ResponseEntity<Group> createGroup(@RequestBody Group group) {
        Group savedGroup = groupRepository.save(group);
        return ResponseEntity.ok(savedGroup);
    }

    @PostMapping("/groups/addUser")
    public ResponseEntity<String> addUserToGroup(@RequestBody GroupUserRequest request) {
        Optional<Group> groupOpt = groupRepository.findById(request.getGroupId());
        Optional<User> userOpt = userRepository.findById(request.getUserId());

        if (groupOpt.isEmpty() || userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Grup sau utilizator inexistent.");
        }

        Group group = groupOpt.get();
        User user = userOpt.get();

        group.getUsers().add(user);
        groupRepository.save(group);

        return ResponseEntity.ok("Utilizator adăugat în grupul \"" + group.getName() + "\".");
    }


    @GetMapping("/groups/{groupId}/users")
    public ResponseEntity<List<User>> getUsersInGroup(@PathVariable Long groupId) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        if (groupOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(groupOpt.get().getUsers());
    }

    @GetMapping("/{groupId}/expenses")
    public ResponseEntity<List<Expense>> getExpensesInGroup(@PathVariable Long groupId) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        if (groupOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<Expense> expenses = expenseRepository.findByGroup(groupOpt.get());
        return ResponseEntity.ok(expenses);
    }
    @PostMapping("/expenses")
    public ResponseEntity<String> addExpense(@RequestBody ExpenseRequest request) {
        System.out.println("GRUP PRIMIT: " + request.getGroupId());  // ← debug important

        Optional<Group> groupOpt = groupRepository.findById(request.getGroupId());

        if (groupOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Grupul nu există.");
        }

        Expense expense = new Expense(
                request.getDescription(),
                request.getAmount(),
                groupOpt.get()
        );

        expenseRepository.save(expense);
        return ResponseEntity.ok("Cheltuială adăugată cu succes.");
    }


    @GetMapping("/groups/{groupId}/balance")
    public ResponseEntity<List<BalanceResponse>> getGroupBalance(@PathVariable Long groupId) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        if (groupOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Group group = groupOpt.get();
        List<User> users = group.getUsers();
        List<Expense> expenses = expenseRepository.findByGroup(group);

        // Creăm un map pentru balanțele utilizatorilor
        Map<User, Double> balanceMap = new HashMap<>();
        for (User user : users) {
            balanceMap.put(user, 0.0);  // Începem cu balanța 0 pentru fiecare utilizator
        }

        // Calculăm suma totală a cheltuielilor și o împărțim între utilizatori
        double totalExpenses = 0;
        for (Expense expense : expenses) {
            totalExpenses += expense.getAmount();
        }

        // Împărțim totalul cheltuielilor între utilizatori
        double sharePerUser = totalExpenses / users.size();
        for (User user : users) {
            balanceMap.put(user, balanceMap.get(user) + sharePerUser);
        }

        List<BalanceResponse> responseList = new ArrayList<>();
        for (Map.Entry<User, Double> entry : balanceMap.entrySet()) {
            responseList.add(new BalanceResponse(entry.getKey().getName(), entry.getValue()));
        }

        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/groups")
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = groupRepository.findAll(); // Obține toate grupurile din baza de date
        return ResponseEntity.ok(groups);
    }


    @GetMapping("/users/{userId}")
    public List<Group> getGroupsByUser(@PathVariable Long userId) {
        return groupRepository.findByUsers_Id(userId); // presupune relație ManyToMany
    }



    @DeleteMapping("/groups/{groupId}")
    public ResponseEntity<String> deleteGroup(@PathVariable Long groupId) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        if (groupOpt.isEmpty()) return ResponseEntity.notFound().build();

        Group group = groupOpt.get();

        // NU mai șterge manual expense-urile!
        group.getUsers().clear();
        groupRepository.save(group);

        groupRepository.delete(group);
        return ResponseEntity.ok("Grup șters cu succes.");
    }

}
