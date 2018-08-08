import React, { Component } from 'react';
import { Modal, Button,Input,DatePicker,Checkbox ,Radio} from 'antd';
import moment from 'moment';


const dateFormat='DD-MM-YYYY';
const RadioGroup = Radio.Group;	

const spancss={margin:'3px'};



class AddItemDependency extends Component{
constructor(props){
	super(props);
	this.state = { visible: false ,name:'',description:'',deadline:null,tdItemList : [],selectedItem : {id:0,listId:0,name:''},Radiovalue:null};
	this.afterClose=this.afterClose.bind(this);
	this.onChange=this.onChange.bind(this);
	this.generalOnChange=this.generalOnChange.bind(this);
	this.ItemListWithoutItself=this.ItemListWithoutItself.bind(this);

}



componentDidMount(){
console.log('sdasda');
}

async ItemListWithoutItself(listId,itemId){
console.log('ItemListWithoutItself');

console.log('listId:'+listId);
console.log('ItemId'+itemId);

await fetch('http://localhost:8080/ItemListWithoutItself', {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify({
listId:listId,
itemId:itemId,
})
}).then(response => response.json())
.then(data => this.setState({tdItemList: data}));
}


generalOnChange(e){
this.setState({[e.target.name]: e.target.value});
}
  
  showModal = () => {
    this.setState({
      visible: true,
    });
	
this.ItemListWithoutItself(this.props.listId,this.props.itemId);	
	}

  handleOk = (e) => {
    
    this.setState({
      visible: false,
    });

	
	fetch('http://localhost:8080/AddDependency', {
	method: 'POST',
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
	},
	body: JSON.stringify({
	itemId:this.props.itemId,
	dependencyItemId:this.state.Radiovalue,
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
	  console.log('id'+this.props.listId);
	  console.log('name'+this.props.listName);
	  this.props.afterClose(this.props.listId,this.props.listName);
  }
  
  onChange = (value) =>	 {
  console.log('onChange:');
  console.log(value);
  this.setState({deadline:value});
  console.log('onChange fonk sonu!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}

  onRadioChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      Radiovalue: e.target.value,
    });
  }

  
  render() {
	  const tdItemList = this.state.tdItemList;
  return (
      <div>
  <Button type="primary" onClick={this.showModal}>Add Dependency </Button>
        <Modal
          title="Add ToDo Item"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
		  afterClose={this.afterClose}
		  >

  <div align='center' >
<RadioGroup onChange={this.onRadioChange} value={this.state.Radiovalue}>	  
      {tdItemList.map((tdItemList) =><div id={tdItemList.id} key={tdItemList.id}>
	   <span  style={spancss}><Radio value={tdItemList.id} ></Radio></span>
         <span style={spancss} >{tdItemList.id}</span>
         <span style={spancss}>{tdItemList.name}</span>
         <span style={spancss}>{tdItemList.description}</span>
         <span style={spancss}>{tdItemList.status.name}</span>
         <span style={spancss}>{tdItemList.deadline}</span></div>
      )}
	  </RadioGroup >	  
	  </div>			  
        </Modal>
      </div>
    );
  }
}
export default AddItemDependency;

