package com.huawei.interview.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import com.huawei.interview.model.ItemIdDependencyItemId;
import com.huawei.interview.model.ListIdItemId;
import com.huawei.interview.model.Status;
import com.huawei.interview.model.ToDoItem;
import com.huawei.interview.model.ToDoList;
import com.huawei.interview.resource.StatusRepository;
import com.huawei.interview.resource.ToDoItemRepository;
import com.huawei.interview.resource.ToDoListRepository;
import com.huawei.interview.util.InterviewUtil;


@RestController
public class ToDoRestController {

	private ToDoListRepository toDoListRep;
	private ToDoItemRepository toDoItemRep;
	private StatusRepository statRep;

//	public ToDoRestController(ToDoListRepository repository) {
//		this.toDoListRep = repository;
//	}
//	public ToDoRestController(ToDoItemRepository repository) {
//		this.toDoItemRep = repository;
//	}
	
	public ToDoRestController(ToDoListRepository list,ToDoItemRepository item,StatusRepository statRep) {
		this.toDoItemRep = item;
		this.toDoListRep = list;
		this.statRep = statRep;
	}
	
//	public ToDoRestController() {
//
//	}

	@GetMapping("/todolist")
	@CrossOrigin(origins = "http://localhost:3000")
	public Collection<ToDoList> getAllToDoList() {
		return toDoListRep.findAll().stream().collect(Collectors.toList());
	}
	
	@GetMapping("/todoitem")
	@CrossOrigin(origins = "http://localhost:3000")
	public Collection<ToDoItem> getAllToDoItem() {
		return toDoItemRep.findAll().stream().collect(Collectors.toList());
	}
	
	
	@PostMapping("/addToDoList")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Object> addToDoList(@RequestBody ToDoList toDoList) {
		
		ToDoList savedToDoList= toDoListRep.save(toDoList);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedToDoList.getId()).toUri();
		return ResponseEntity.created(location).build();

	}
	
		 
    @DeleteMapping(value = "/deleteToDoList")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> deleteUser(@RequestBody ToDoList toDoList) {
    	toDoListRep.deleteById(toDoList.getId());
    	return new ResponseEntity<Object>(HttpStatus.OK);
    }
    
	@PostMapping("/itemsWithListId")
	@CrossOrigin(origins = "http://localhost:3000")
	public Collection<ToDoItem> getitemsWithListId(@RequestBody ToDoList toDoList) {
		toDoList.getId();
		 List<ToDoItem> items=toDoItemRep.getitemsWithListId(toDoList.getId()).stream().collect(Collectors.toList());
		 return toDoItemRep.getitemsWithListId(toDoList.getId()).stream().collect(Collectors.toList());
	}

	
	@PostMapping("/addToDoItem")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Object> addToDoItem(@RequestBody ToDoItem toDoItem) {
		
		if(toDoItem.getStatus()==null) {
			toDoItem.setStatus(new Status(new Long(1)));
		}
		ToDoItem savedToDoItem= toDoItemRep.save(toDoItem);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedToDoItem.getId()).toUri();
		return ResponseEntity.created(location).build();

	}
	
    @DeleteMapping(value = "/deleteToDoItem")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> deleteUser(@RequestBody ToDoItem toDoItem) {
    	toDoItemRep.deleteById(toDoItem.getId());
    	return new ResponseEntity<Object>(HttpStatus.OK);
    }
    
    @PutMapping(value = "/updateStatus")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> UpdateItemStatus(@RequestBody ToDoItem toDoItem) {
    	Optional<ToDoItem> savedToDoItem=toDoItemRep.findById(toDoItem.getId());
    	
    	ToDoItem todoItem = savedToDoItem.get();
    	todoItem.setStatus(new Status(InterviewUtil.CheckExpiredOrCompleted(todoItem)));;
//    	todoItem.getStatus().setId(InterviewUtil.CheckExpiredOrCompleted(todoItem));
    	todoItem.setCompleted(true);
    	toDoItemRep.save(todoItem);
    	
    	return new ResponseEntity<Object>(HttpStatus.OK);
    }
    
    
	@PostMapping("/ItemListWithoutItself")
	@CrossOrigin(origins = "http://localhost:3000")
	public Collection<ToDoItem> getItemListwithoutItself(@RequestBody ListIdItemId listIdItemId) {
		
    	Optional<ToDoItem> savedToDoItem=toDoItemRep.findById(listIdItemId.getItemId());
    	ToDoItem toDoItem = savedToDoItem.get();
		List<ToDoItem> items=toDoItemRep.getitemsWithListId(listIdItemId.getListId());
		items.remove(toDoItem);
		 return items.stream().collect(Collectors.toList());
	}
	
	@PostMapping("/AddDependency")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Object> AddDependency(@RequestBody ItemIdDependencyItemId depend) {
		 
	    	Optional<ToDoItem> savedToDoItem=toDoItemRep.findById(depend.getItemId());
	    	ToDoItem toDoItem = savedToDoItem.get();
	    	toDoItem.setDependencyId(depend.getDependencyItemId());
	    	toDoItemRep.save(toDoItem);
	    	return new ResponseEntity<Object>(HttpStatus.OK);		 
		 
		 
	}	
	
	@PostMapping("/returnOneItemById")
	@CrossOrigin(origins = "http://localhost:3000")
	public ToDoItem returnOneItemById(@RequestBody ToDoItem toDoItem) {
		
    	Optional<ToDoItem> savedToDoItem=toDoItemRep.findById(toDoItem.getId());
    	ToDoItem returntoDoItem = savedToDoItem.get();
    	return returntoDoItem;	

	}
    
	@GetMapping("/allStatus")
	@CrossOrigin(origins = "http://localhost:3000")
	public Collection<Status> getAllToStatus() {
		return statRep.findAll().stream().collect(Collectors.toList());
	}

	@PostMapping("/returnOneListById")
	@CrossOrigin(origins = "http://localhost:3000")
	public ToDoList returnOneListById(@RequestBody ToDoList toDoList) {
		
    	Optional<ToDoList> savedToDoList=toDoListRep.findById(toDoList.getId());
    	ToDoList returntoDoList = savedToDoList.get();
    	return returntoDoList;	

	}
	
}


