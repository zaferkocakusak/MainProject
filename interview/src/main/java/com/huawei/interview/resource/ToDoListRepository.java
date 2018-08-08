package com.huawei.interview.resource;

import org.springframework.data.jpa.repository.JpaRepository;

import com.huawei.interview.model.ToDoList;

public interface ToDoListRepository extends JpaRepository<ToDoList, Long> {

}
