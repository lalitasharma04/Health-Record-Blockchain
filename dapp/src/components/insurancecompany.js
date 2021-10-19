import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import web3 from '.././web3';
import contract from '.././contract';

class InsuranceCompany extends Component {
	state = {
		current : 0,
		makepdv : 0,
		mnamed : '',
		id:0,
		name:'',
		pno:0
	};
	render() {
		  return (
				<div id="sidebar">

				<div className="sidenav">
				  <center><h4>Insurance Company</h4></center>
				  <br></br>
				  <center><h6><button id="toomuch1" onClick={() => {
				  	this.setState({current : 2});
//				  	this.setState({makepdv : 2});

				  }} className="btn btn-light">Get Company Details</button></h6></center>

				  <center><h6><button id="toomuch2" onClick={() => {
				  	this.setState({current : 1});
				  	this.setState({makepdv : 0});
				  }} className="btn btn-light">Add non-covered medication</button></h6></center>

				</div>
                {
					(this.state.current==2)
					?    (<form id="mn" className="abc">
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Enter your company id </label>
					    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your company's id"></input>
					 </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	const accounts = await web3.eth.getAccounts();
					  	let x = document.querySelector("#mn");
					  	this.setState({ id : x.elements[0].value });
					  	x.elements[0].value='';
					  	await contract.methods.getInsuranceCompany(this.state.id).call({from : accounts[0]},(error,result)=>{
					  	    console.log("result is ",result);
					  	    if(!error)
					  		{
					  		    console.log("current is",this.state.current);
//					  		    console.log(result);

						  		this.setState({
						  			name : result[0],
						  			pno:result[1]
						  		});
						  		this.setState({makepdv : 2});
						  	}
						  	else{
						  	    this.setState({makepdv : -1});
						  	    console.log("in else")
						  	}

					  	});
					  }}className="btn btn-primary">Submit</button>
					  </div>
					</form>)
					: (<span></span>)
				}
				{
					(this.state.current==1)
					?    (<form id="mna" className="abc">	
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Not covered Medication</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter non-covered medication"></input>
					 </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	const accounts = await web3.eth.getAccounts();
					  	let x = document.querySelector("#mna");
					  	this.setState({ mnamed : web3.utils.asciiToHex(x.elements[0].value) });
					  	x.elements[0].value='';
					  	await contract.methods.addNotCoverdMedicationInInsurance(this.state.mnamed).send({from : accounts[0]},(error)=>{

					  	        if(!error){
//					  	            console.log("no error bro");
					  	            this.setState({
					  	                makepdv:11

					  	            });
					  	        }
//					  	        console.log("i think error");
					  	});
					  }}className="btn btn-primary">Submit</button>
					  </div>
					</form>)
					: (<span></span>)
				}


				{
			    	(this.state.makepdv==2)
					?    (<div><h4 className="yf">Id : {this.state.id}</h4>
					    <h4 className="yf"> Name: {this.state.name}</h4>
					    <h4 className="yf">Phone Number : {this.state.pno}</h4>
					    </div>)
					: (<span></span>)
				}
				{
				    (this.state.makepdv==11)
					?    (<div><h4 className="yf">Medication added successfully!!</h4>
					</div>)
					: (<span></span>)
				}
				{
			    	(this.state.makepdv==-1)
					?    (<div><h4 className="yf">You have entered incorrect ID,Please retry</h4>
					</div>)
					: (<span></span>)
				}


				</div>
		  );
	}
}

export default InsuranceCompany;