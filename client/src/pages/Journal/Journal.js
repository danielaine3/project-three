import React, { Component } from 'react';
import firebase from 'firebase';
import AddChapter from './AddChapter';
import ChapterCard from './ChapterCard';
import API from '../../utils/API';

var config = {
	// apiKey: process.env.REACT_APP_FIREBASE_apikey,
	// authDomain: process.env.REACT_APP_FIREBASE_authDomain,
	// databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
	// projectId: process.env.EACT_APP_FIREBASE_projectId,
	// storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
	// messagingSenderId: process.envREACT_APP_FIREBASE_messagingSenderId

apikey: "AIzaSyCSuecWnnFJo55VAuiEzvSfR1xLNRuwwkI",
authDomain: "intern-project-4b679.firebaseapp.com",
databaseURL: "https://intern-project-4b679.firebaseio.com",
projectId: "intern-project-4b679",
storageBucket: "intern-project-4b679.appspot.com",
messagingSenderId: "1037796012544"
};

firebase.initializeApp(config);

export default class extends Component {
  
	state= {
		chapterTitle: "",
		description: "",
		image:"",
		date: Date.now(),
		requireNum: '0',
		chapterData:[]
	};

	componentDidMount() {
		API.getCurrentUser().then(response=> {
			// console.log("response: ", response);
			let currentUser = response.data.user
			// console.log("currentUser is: " , currentUser);
			this.setState({currentUser: currentUser});
		}).catch(err =>{
			console.log("Error while getting current user: ", err)
		})
		API.getChapters().then(response=> {
			// console.log("API chapter response: " , response);
			console.log('response is: ', response)
			this.setState({
				chapterData: response.data
			})
		}).catch(err =>{
			console.log("Error while getting chapters: ", err)
		})
	}

	handleInputChange = (event) => this.setState({
    	[event.target.name]: event.target.value,
 	})

	handleFormSubmit = (event) => {
	  event.preventDefault();
	  console.log('current state', this.state);

	  let blob = new Blob ([event.target.result], {type:"image/jpg"});
	  // let file = this.state.image;
	  // console.log(file);
	  console.log(blob);
      let image = "";

	  //create storage ref
	  let storageRef = firebase.storage().ref("chapImg/" + Date.now());
	  //upload file
	  let task = storageRef.put(blob);
	  console.log(task);

 	  let state = this.state;
	  //update progress bar
	if (this.state.chapterTitle &&
	  this.state.description &&
	  this.state.date) {
		  task.on('state_changed', 
			function progress(snapshot) {
				console.log(snapshot);
			}, 
			function error (err) {
			},
			function complete() {
				console.log("COMPLETE");

				storageRef.getDownloadURL().then(function(url) {
					image = url;

					console.log(image);
				
					let data = {
						chapTitle: state.chapterTitle,
						chapNote: state.description,
						chapImg: image,
						chapDate: state.date,
						reqNum: state.requireNum
					};
					console.log(data)

					API.addChapter(data)
					.then((response) => {
						console.log("Response from adding chapter: ", response)
						this.setState({
							chapterTitle:"",
							description: "",
							image:"",
							date: "",
							requireNum: 0
						});
						API.getChapters().then((response) => {
							this.setState({
								chapterData: response.data,
							});
						});
					})
					.catch((err) => {
						console.log('Error while adding chapter: ', err);
					});
				});
	    	})
	} else {
		console.log("Unable to add chapter.")
	}
}

	render() {
		return (
			<div>
		    	<h1>Journal</h1>
		    	<AddChapter handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit} {...this.state}/>
		    	<ChapterCard chapters={this.state.chapterData} />
		  	</div>
		);
	}
}
