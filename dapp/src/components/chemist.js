import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import web3 from '.././web3';
import contract from '.././contract';

class Chemist extends Component {
	state = {
		current : 0,
		makepdv : 0,
		gmedpacn : 0,
		gmedmed : '',
		id:0,
		name:'',
		home:'',
		pno:0,
		inv:0
	};
	render() {
		  return (
				<div id="sidebar">

				<div className="sidenav">
				  <center><h4>Chemist</h4></center>
				  <br></br>
				  <center><h6><button onClick={() => {
				  	this.setState({current : 2});
				  	this.setState({makepdv : 2});
				  }} className="btn btn-light">Get Chemist Details</button></h6></center>
				  <center><h6><button onClick={() => {
				  	this.setState({current : 1});
				  	this.setState({makepdv : 0});
				  }} className="btn btn-light">Give Medicine</button></h6></center>
				</div>
                {
				            (this.state.current==2)
					            ?    (<form id="getinfo" className="abc">
					                    <div className="form-group">
					                        <label htmlFor="exampleInputEmail1">Enter chemist id Number </label>
					                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Chemist Id Number"></input>
					                    </div>
					                    <div className="aab">
					                        <button onClick={async(event) => {
                                            event.preventDefault();
                                            const accounts = await web3.eth.getAccounts();
                                            let x = document.querySelector("#getinfo");
                                            this.setState({ gchemid : x.elements[0].value });
                    //					  	console.log(this.state);
                                            x.elements[0].value='';
                                            await contract.methods.getchemistinfo(this.state.gchemid).call({from : accounts[0]},(error,result) => {
                                                console.log(typeof(result));
                                                if(!error)
                                                {
                                                    this.setState({
                                                        id : this.state.gchemid,
                                                        name: result[1],
                                                        home:result[0],
                                                        pno:result[2]

                                                    });
                                                    this.setState({makepdv : 3});
                                                }
                                                else{
                                                    this.setState({inv : 1,makepdv:10});
                                                    console.log('not present');

                                                }

					  	                        });
					                        }}className="btn btn-primary">Submit</button>
					                    </div>
					                </form>)
					            : (<span></span>)
				        }


				{
					(this.state.current==1)
					?    (<form id="gmed" className="abc">
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Patient's Aadhaar Number</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Patient's Aadhaar Card Number"></input>
					 </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	const accounts = await web3.eth.getAccounts();
					  	let x = document.querySelector("#gmed");
					  	this.setState({ gmedpacn : x.elements[0].value });
					  	x.elements[0].value='';
					  	await contract.methods.giveMedicines(this.state.gmedpacn).call({from : accounts[0]},(error,result) => {
					  		if(!error)
					  		{
					  		    console.log("here");
					  		    console.log(result);

						  		this.setState({
						  			gmedmed : result,
						  		});
						  		this.setState({makepdv : 1});
						  	}
						  	else{
						  	    this.setState({makepdv : -1});
						  	}
						  	console.log("out");
					  	})
					  }}className="btn btn-primary">Submit</button>
					  </div>
					</form>)
					: (<span></span>)
				}

			    {
			    	(this.state.makepdv==1)
					?    (<div><h4 className="yf">Medicines : {this.state.gmedmed}</h4></div>)
					: (<span></span>)
				}
				{
			    	(this.state.makepdv==-1)
					?    (<div><h4 className="yf">Either the patient id entered is wrong or there are no medicines suggested for the patient with entered id</h4></div>)
					: (<span></span>)
				}
				{
			    	(this.state.makepdv==3)
					?    (<div><h4 className="yf">Id : {this.state.gchemid}</h4>
					    <h4 className="yf"> Name: {this.state.name}</h4>
					    <h4 className="yf">Address : {this.state.home}</h4>
					    <h4 className="yf">Phone Number : {this.state.pno}</h4>
					    </div>)
					: (<span></span>)
				}
				{
			    	(this.state.inv==1 && this.state.makepdv==10)
					?    (<div><h4 className="yf">Its not your Id,Please Enter your Id</h4></div>)
					: (<span></span>)
				}
				</div>
		  );
	}
}

export default Chemist;




















//import React, { Component } from 'react';
//import { NavLink, Redirect } from 'react-router-dom';
//
//import web3 from '.././web3';
//import contract from '.././contract';
//
//class Chemist extends Component {
//	state = {
//	    id:0,
//	    name:'',
//	    home:'',
//	    pno:0,
//		current : 0,
//		makepdv : 0,
//		gmedpacn : 0,
//		gmedmed : '',
//		gchemid:''
//	};
//	render() {
//		  return (
//				<div id="sidebar">
//                    <div className="sidenav">
//				        <center><h4>Chemist</h4></center>
//				        <br></br>
//				        <center><h6><button onClick={() => {
//				  	        this.setState({current : 2});
//				  	        this.setState({makepdv : 2});
//				        }} className="btn btn-light">Get Chemist Info</button></h6></center>
//				        <center><h6><button onClick={() => {
//				  	        this.setState({current : 1});
//				  	        this.setState({makepdv : 0});
//				        }} className="btn btn-light">Give Medicine</button></h6></center>
//				         <br></br>
//                         </div>
//                                {
//					                (this.state.current==1)
//					                ?    (<form id="gmed" className="abc">
//					                <div className="form-group">
//                                        <label htmlFor="exampleInputEmail1">Patient's Aadhaar Number</label>
//                                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Patient's Aadhaar Card Number"></input>
//					                </div>
//					                <div className="aab">
//					                    <button onClick={async(event) => {
//                                            event.preventDefault();
//                                            const accounts = await web3.eth.getAccounts();
//                                            let x = document.querySelector("#gmed");
//                                            this.setState({ gmedpacn : x.elements[0].value });
//                                            x.elements[0].value='';
//                                            await contract.methods.giveMedicines(this.state.gmedpacn).call({from : accounts[0]},(error,result) => {
//                                            console.log(typeof(result));
//                                            if(!error)
//                                            {
//                                                this.setState({
//    //						  			        gmedmed : web3.utils.asciiToHex(result),
//                                                gmedmed : result
//                                                });
//						  		                this.setState({makepdv : 1});
//						  	                }
//						  	                else{
//						  	                    console.log(error);}
//                                            });
//					                    }}className="btn btn-primary">Submit</button>
//					                    </div>
//					                    </form>)
//					                 : (<span></span>)
//				              }
//				        {
//				            (this.state.current==2)
//					            ?    (<form id="getinfo" className="abc">
//					                    <div className="form-group">
//					                        <label htmlFor="exampleInputEmail1">Enter chemist id </label>
//					                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Chemist Id Number"></input>
//					                    </div>
//					                    <div className="aab">
//					                        <button onClick={async(event) => {
//                                            event.preventDefault();
//                                            const accounts = await web3.eth.getAccounts();
//                                            let x = document.querySelector("#getinfo");
//                                            this.setState({ gchemid : x.elements[0].value });
//                    //					  	console.log(this.state);
//                                            x.elements[0].value='';
//                                            await contract.methods.getchemistinfo(this.state.gchemid).call({from : accounts[0]},(error,result) => {
//                                                console.log(result[1].value);
//                                                if(!error)
//                                                {
//                                                    this.setState({
//                                                        id : this.state.gchemid,
//                                                        name: result[1].value,
//                                                        home:result[0].value,
//                                                        pno:result[2].value
//
//                                                    });
//                                                    this.setState({makepdv : 2});
//                                                }
//
//					  	                        });
//					                        }}className="btn btn-primary">Submit</button>
//					                    </div>
//					                </form>)
//					            : (<span></span>)
//				        }
//
//			        {
//			    	    (this.state.makepdv==1)
//					    ?    (<div><h4 className="yf">Medicines : {this.state.gmedmed}</h4></div>)
//					    : (<span></span>)
//				    }
//				    {
//			    	(this.state.makepdv==2)
//					?    (<div><h4 className="yf">Id : {this.state.gchemid}</h4>
//					    <h4 className="yf"> Name: {this.state.name}</h4>
//					    <h4 className="yf">Address : {this.state.home}</h4>
//					    <h4 className="yf">Phone Number : {this.state.pno}</h4>
//					    </div>)
//					: (<span></span>)
//				  }
//			</div>
//		  );
//	}
//}
//
//export default Chemist;