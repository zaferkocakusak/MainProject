package com.huawei.interview.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;

@Entity

public class ToDoItem {

	@Id
	@GeneratedValue
	private Long id;
	private Long listId;
	private Long dependencyId;
	private String name;
	private String description;
	private String deadline;
	
    @OneToOne (fetch=FetchType.EAGER)
    @JoinColumn(name="statusId") 
    private Status status;
	private boolean completed;

	public ToDoItem(String name, String description, String deadline, Long listId,Long StatusId) {
		this.name = name;
		this.description = description;
		this.deadline = deadline;
		this.listId = listId;
		this.setStatus(new Status(new Long(1)));
	}

	public ToDoItem() {

	}




	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getListId() {
		return listId;
	}

	public void setListId(Long listId) {
		this.listId = listId;
	}

	public Long getDependencyId() {
		return dependencyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public void setDependencyId(Long dependencyId) {
		this.dependencyId = dependencyId;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

//	@Override
//	public String toString() {
//		return "ToDoItem{" + "id=" + id + ",listId=" + listId + ", name='" + name + "'" + ", description='"
//				+ description + "'" + ", deadline='" + deadline + "'" + ", status='" + status + "'" + "}";
//	}
}
