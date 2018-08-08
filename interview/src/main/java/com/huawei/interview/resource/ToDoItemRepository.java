package com.huawei.interview.resource;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.huawei.interview.model.ToDoItem;

public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
	
	@Query("select t from ToDoItem t where t.listId = :listId")
	List<ToDoItem> getitemsWithListId(@Param("listId") Long listId) ;



}
