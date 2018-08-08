import React, { Component } from 'react';
import { Modal, Button,Input,DatePicker } from 'antd';
import moment from 'moment';


const css={
	
	'display':'flex',
	'verticalAlign':'top',
	'margin':'5px',
	'align':'center'
	
	
}

const flex={
	'display':'flex',
	'margin':'5px'
}




class FilterPanel extends Component{
	constructor(props){
		super(props);
		this.state = {allStatus : []};
		console.log('FilterPanel');
		}

		
async componentDidMount(){
	console.log('componentDidMount');
    await  fetch('http://localhost:8080/allStatus')
    .then(response => response.json())
    .then(data =>this.setState({allStatus:data}));
	

}		


	render(){
	const StatusList=this.state.allStatus	;
	console.log(StatusList);
	return(
	<div>
	<div style={css}>Filter
	{StatusList.map((StatusList)=><div style={flex}  id={StatusList.id} key={StatusList.id}  >{StatusList.name}</div>)}
	</div>
	</div>);
	}
}

export default FilterPanel;