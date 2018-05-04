import React, { Component } from 'react';
import firebase from 'firebase';
import AddChapter from './AddChapter';
import ChapterCard from './ChapterCard';
import API from '../../utils/API';

var config = {
	// apiKey: process.env.REACT_APP_FIREBASE_apikey,
	// authDomain: process.env.REACT_APP_FIREBASE_authDomain,
	// databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
	// projectId: process.env.REACT_APP_FIREBASE_projectId,
	// storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
	// messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,

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
		chapterData:[],
		needsData: [],
	};

	componentDidMount() {
		API.getCurrentUser().then(response=> {
			let currentUser = response.data.user
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

		API.getNeeds().then(res => {
			console.log('NEEDS: ', res)
			this.setState({
			  needsData:res.data
			})
		}).catch(err=>{
			console.log("Error while getting needs: ", err)
		});
	}

	handleInputChange = (event) => this.setState({
    	[event.target.name]: event.target.value,
 	})

	handleFormSubmit = (event) => {
	  event.preventDefault();
	  if (this.state.chapterTitle && this.state.description && this.state.date !== "") {
	    console.log('current state', this.state);
	    let fileButton = document.getElementById("fileButton");
	    let file = fileButton.files[0];
        let image = "";
	    //create storage ref
	    let storageRef = firebase.storage().ref("chapImg/" + Date.now() + file.name);
	    //upload file
	    let task = storageRef.put(file);
	   
	    task.on('state_changed', 
		  (snapshot) => {
		    console.log("SNAPSHOT:", snapshot);
		  }, 
		  (err) => {
		  },
		  () => {
		    console.log("COMPLETE");
		    storageRef.getDownloadURL().then((url) => {
			  image = url;
			  let data = {
			  	chapTitle: this.state.chapterTitle,
			  	chapNote: this.state.description,
			  	chapImg: image,
			  	chapDate: this.state.date,
			  };

			  API.addChapter(data).then((response) => {
			  	console.log("Response from adding chapter: ", response);
			  	this.setState({
			  	  chapterTitle:"",
			  	  description: "",
			  	  image:"",
			  	  date: "",
				});
			  })
			  .catch((err) => {
		  	  	console.log('Error while adding chapter: ', err);
			  })

			  API.getChapters().then((response) => {
				this.setState({
			  	  chapterData:response.data
				});
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
		    	<AddChapter 
		    	  needs={this.state.needsData}
		    	  handleInputChange={this.handleInputChange} 
		    	  handleFormSubmit={this.handleFormSubmit} 
		    	  {...this.state}/>
		    	<ChapterCard chapters={this.state.chapterData} />
		  	</div>
		);
	}
}