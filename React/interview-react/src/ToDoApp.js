import React, { Component } from 'react';
import { Button } from 'antd';
import { Input,Checkbox } from 'antd';
import AddItem from './AddItem.js'; 
import AddItemDependency from './AddItemDependency.js'; 
import FilterPanel from './FilterPanel.js'; 




class ToDoApp extends Component{	
constructor(props){
	super(props);
	this.state = {tdListList : [],tdItemList : [],selectedList : {id:0,name:''},selectedItem : {id:0,name:''},addListInput:'',modalIsOpen: false,dependencyItem:null};
	this.handleListSelect = this.handleListSelect.bind(this);
	this.handleItemSelect = this.handleItemSelect.bind(this);
	this.getItemsWithListId = this.getItemsWithListId.bind(this);
	this.handleAddListInputChange = this.handleAddListInputChange.bind(this);
	this.handleAddListSubmit = this.handleAddListSubmit.bind(this);
	this.getAllToDoList = this.getAllToDoList.bind(this);
	this.DeleteList = this.DeleteList.bind(this);
	this.returnOneListById = this.returnOneListById.bind(this);
	
	
}





async componentDidMount(){
	console.log('componentDidMount');
    await  fetch('http://localhost:8080/todolist')
    .then(response => response.json())
    .then(data => this.setState({tdListList: data}));
	
	this.returnOneListById(1);
	this.getItemsWithListId(1);

}

async getAllToDoList(){
	console.log('getAllToDoList');
	await fetch('http://localhost:8080/todolist')
    .then(response => response.json())
    .then(data => this.setState({tdListList: data}));
	
}

async returnOneListById(id){
	await fetch('http://localhost:8080/returnOneListById', {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify({
id:id
})
}).then(response => response.json())
.then(data => this.setState({selectedList: data}));
	
	
	
	
}

handleListSelect(id,name){
	console.log('handleListSelect');
	console.log("id"+id);
	console.log("name"+name);
	this.setState({selectedList:{id:id,name:name}});
	this.getItemsWithListId(id);
	
}

handleItemSelect(id,name){
	console.log('handleListSelect');
	console.log('id: '+id);
	console.log('name: '+name);
}

async getItemsWithListId(id){
	console.log('getItemsWithListId');
	await fetch('http://localhost:8080/itemsWithListId', {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify({
id:id
})
}).then(response => response.json())
.then(data => this.setState({tdItemList: data}));
}


async DeleteList(id){
console.log('DeleteList id: '+id);

	 await fetch('http://localhost:8080/deleteToDoList', {
	method: 'DELETE',
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
	},
	body: JSON.stringify({
    id:id
	})
	})
	
	this.getAllToDoList();


}

async DeleteItem(id){
console.log('DeleteItem id: '+id);

	 await fetch('http://localhost:8080/deleteToDoItem', {
	method: 'DELETE',
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
	},
	body: JSON.stringify({
    id:id
	})
	})
	
	console.log(this.state.selectedList.id);
	this.getItemsWithListId(this.state.selectedList.id);


}

handleAddListInputChange(e){
	console.log('handleAddListInputChange');
	this.setState({ addListInput: e.target.value });
}
async handleAddListSubmit(){
	console.log('handleAddListSubmit');
    if (!this.state.addListInput.length) {
      return;
    }
	await fetch('http://localhost:8080/addToDoList', {
	method: 'POST',
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
	},
	body: JSON.stringify({
    name: this.state.addListInput
	})
	});
	console.log('---------------');
	console.log(this.state.addListInput);
	console.log('---------------');
	this.getAllToDoList();
	this.setState({ addListInput: '' });
	
}






async ItemListWithoutItself(id){
	console.log('ItemListWithoutItself');
	await fetch('http://localhost:8080/ItemListWithoutItself', {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify({
listId:this.state.selectedList.id,
itemId:id,
})
}).then(response => response.json())
.then(data => this.setState({tdItemList: data}));
}
  
  
  async onCheckBoxChange(id, dependencyId) {
	
	console.log('----------------');
	console.log('onCheckBoxChange');
	console.log('id:'+id);
	console.log('Dependencyid:'+dependencyId);
	console.log('----------------');
	
    

    if (dependencyId) {
	
	 await fetch('http://localhost:8080/returnOneItemById', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: dependencyId,
                })
            }).then(response => response.json())
			.then(data => this.setState({dependencyItem:data}));
console.log(this.state.dependencyItem);			
        if (this.state.dependencyItem.status.id === 1) {
            alert('Nesneye ait tamamlanmamış bağımlılık bulunmaktadır.\nÖnce onu tamamlamanız gerekmektedir.'+'\nid: ' +this.state.dependencyItem.id + ' İsim : ' + this.state.dependencyItem.name + ' description : ' + this.state.dependencyItem.description);
        } else {
            await fetch('http://localhost:8080/updateStatus', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                })
            });

            this.getItemsWithListId(this.state.selectedList.id);
        }

    } else {
               console.log('onCheckBoxChange');

        await fetch('http://localhost:8080/updateStatus', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            })
        });

        this.getItemsWithListId(this.state.selectedList.id);
    }


}

  
  
  


render(){
	console.log('ToDoApp Render');
	const {tdListList,tdItemList} = this.state;
	return(
	<div >
	   <div align='center' >
      <h2>List of ToDoList</h2>
	  <table id="ListListTable" border="1px solid" >
	  <tbody>
	  {tdListList.map((tdListList) =><tr id={tdListList.id} key={tdListList.id}><td onClick={()=>this.handleListSelect(tdListList.id, tdListList.name)}  >{tdListList.name}</td><td> <Button type='primary' onClick={()=>this.DeleteList(tdListList.id)}>Delete</Button></td></tr>)}
	  </tbody>
	  </table>
	  </div>		  
	  <br/>
	  
	  
      <Input size='default'
      id="new-todo"
      onChange={this.handleAddListInputChange}
      value={this.state.addListInput} />
      <Button type='primary' onClick={this.handleAddListSubmit} >
      Add New ToDoList
      </Button>
      <br/>
	  
	  
	  <div >
      <h2>List of {this.state.selectedList.name}</h2>
<table id="itemListTable" border="1px solid" align="center" >
   <tbody>
      <tr id="tableDesc">
         <td>Completed</td>
         <td>id</td>
         <td>ListId</td>
         <td>Name</td>
         <td>Description</td>
         <td>Status</td>
         <td>Deadline</td>
         <td>DependencyId</td>
      </tr>
      {tdItemList.map((tdItemList) =>
      <tr onClick={()=>
         this.handleItemSelect(tdItemList.id,tdItemList.name)} id={tdItemList.id} key={tdItemList.id}>
         <td>
            <Checkbox
               checked={tdItemList.completed}
               disabled={tdItemList.completed}
               onChange={()=>this.onCheckBoxChange(tdItemList.id,tdItemList.dependencyId)}
               >
            </Checkbox>
         </td>
         <td>{tdItemList.id}</td>
         <td>{tdItemList.listId}</td>
         <td>{tdItemList.name}</td>
         <td>{tdItemList.description}</td>
         <td>{tdItemList.status.name}</td>
         <td>{tdItemList.deadline}</td>
		 <td>{tdItemList.dependencyId}</td>
		 <td><AddItemDependency  listId={this.state.selectedList.id}  listName={this.state.selectedList.name} itemId={tdItemList.id} afterClose={(id,name)=>this.handleListSelect(id,name)} /> </td>
         <td><Button type='primary' onClick={()=>this.DeleteItem(tdItemList.id)}>Delete</Button></td>
      </tr>
      )}
   </tbody>
</table>
<AddItem selectedList={this.state.selectedList} afterClose={(id,name)=>this.handleListSelect(id,name)} />
	  </div>
		
	  

	  
    </div>
	);

	
	
	
}

}
export default ToDoApp;

