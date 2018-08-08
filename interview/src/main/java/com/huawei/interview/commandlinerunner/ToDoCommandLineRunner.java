package com.huawei.interview.commandlinerunner;

import java.util.Date;
import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.huawei.interview.model.Status;
import com.huawei.interview.model.ToDoItem;
import com.huawei.interview.model.ToDoList;
import com.huawei.interview.resource.StatusRepository;
import com.huawei.interview.resource.ToDoItemRepository;
import com.huawei.interview.resource.ToDoListRepository;

@Component
public class ToDoCommandLineRunner implements CommandLineRunner  {

	private ToDoListRepository toDoListRep;
	private ToDoItemRepository toDoItemRep;
	private StatusRepository statRep;

//	public ToDoCommandLineRunner(ToDoListRepository repository) {
//		this.toDoListRep = repository;
//	}
//	public ToDoCommandLineRunner(ToDoItemRepository repository) {
//		this.toDoItemRep = repository;
//	}
	
	public ToDoCommandLineRunner(ToDoListRepository list,ToDoItemRepository item,StatusRepository statRep) {
		this.toDoItemRep = item;
		this.toDoListRep = list;
		this.statRep= statRep;
	}
	
//	public ToDoCommandLineRunner() {
//
//	}
	
	@Override
	public void run(String... args) throws Exception {
		toDoListRep.save(new ToDoList("Yapılacaklar Listesi 1"));
		toDoListRep.save(new ToDoList("Yapılacaklar Listesi 2"));
		toDoListRep.save(new ToDoList("Yapılacaklar Listesi 3"));
		toDoListRep.save(new ToDoList("Yapılacaklar Listesi 4"));
		
		statRep.save(new Status(new Long(1),"Not-Completed"));
		statRep.save(new Status(new Long(2),"Completed"));
		statRep.save(new Status(new Long(3),"Expired"));
		
		toDoItemRep.save(new ToDoItem("List1Item1","item 1 listeye giriş yaptı","08-09-2018",new Long(1),new Long(1)));
		toDoItemRep.save(new ToDoItem("List1Item2","item 2 listeye giriş yaptı","08-09-2018",new Long(1),new Long(1)));
		toDoItemRep.save(new ToDoItem("List1Item3","item 3 listeye giriş yaptı","08-09-2018",new Long(1),new Long(1)));
		toDoItemRep.save(new ToDoItem("List1Item4","item 4 listeye giriş yaptı","08-09-2018",new Long(1),new Long(1)));
		
		toDoItemRep.save(new ToDoItem("List2Item1","item 1 listeye giriş yaptı","08-09-2018",new Long(2),new Long(2)));
		toDoItemRep.save(new ToDoItem("List2Item2","item 2 listeye giriş yaptı","08-09-2018",new Long(2),new Long(2)));
		
		toDoItemRep.save(new ToDoItem("List3Item1","item 1 listeye giriş yaptı","08-09-2018",new Long(3),new Long(3)));
		toDoItemRep.save(new ToDoItem("List3Item2","item 2 listeye giriş yaptı","08-09-2018",new Long(3),new Long(3)));
		
		toDoItemRep.save(new ToDoItem("List4Item1","item 1 listeye giriş yaptı","08-09-2018",new Long(4),new Long(4)));
		toDoItemRep.save(new ToDoItem("List4Item2","item 2 listeye giriş yaptı","08-09-2018",new Long(4),new Long(4)));


	}
}

