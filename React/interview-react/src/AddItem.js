import React, { Component } from 'react';
import { Modal, Button,Input,DatePicker } from 'antd';
import moment from 'moment';


const dateFormat='DD-MM-YYYY'	

class AddItem extends Component{
constructor(props){
	super(props);
	this.state = { visible: false ,name:'',description:'',deadline:null};
	this.afterClose=this.afterClose.bind(this);
	this.onChange=this.onChange.bind(this);
	this.generalOnChange=this.generalOnChange.bind(this);

}



generalOnChange(e){
this.setState({[e.target.name]: e.target.value});
}
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    
    this.setState({
      visible: false,
    });
	
	console.log('handleOk');
	console.log('name: '+this.state.name);
	console.log('description: '+this.state.description);
	console.log('deadline: '+this.state.deadline);
	
	fetch('http://localhost:8080/addToDoItem', {
	method: 'POST',
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
	},
	body: JSON.stringify({
    name:this.state.name,
	description:this.state.description,
	deadline:this.state.deadline.format(dateFormat),
	listId:this.props.selectedList.id,
	})
	})
   
   
   
	this.setState({
      name:'',
	  description:'',
	  deadline:null,
    });	
	
	

  }

  handleCancel = (e) => {
    
    this.setState({
      visible: false,
    });
  }

  afterClose(){
	  console.log('afterClose');
	  console.log('id'+this.props.selectedList.id);
	  console.log('name'+this.props.selectedList.name);
	  this.props.afterClose(this.props.selectedList.id,this.props.selectedList.name);
  }
  
  onChange = (value) =>	 {
  console.log('onChange:');
  console.log(value);
  this.setState({deadline:value});
  console.log('onChange fonk sonu!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}
  
  render() {
	 const deadLine
	  = this.state.deadline;
  return (

	
      <div>
  <Button type="primary" onClick={this.showModal}>Add ToDo Item to {this.props.selectedList.name} </Button>
        <Modal
          title="Add ToDo Item"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
		  afterClose={this.afterClose}
		  >
		  
		<table id="itemListTable" align="center" >  
		<tbody>
		
		<tr><td>Name</td><td><Input value={this.state.name} name='name' onChange={this.generalOnChange} /></td></tr>
		<tr><td>Description</td><td><Input value={this.state.description} name='description' onChange={this.generalOnChange} /></td></tr>
		<tr><td>Deadline</td><td><DatePicker  format="DD-MM-YYYY" onChange={this.onChange} name='deadline' allowClear={true}  value={deadLine}  /></td></tr>
		
		
		</tbody>
		</table>		  
          
        </Modal>
      </div>
    );
  }
}
export default AddItem;