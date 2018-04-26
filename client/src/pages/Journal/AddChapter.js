import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import API from '../../utils/API';
import firebase from '../../utils/firebase';

// const ref = firebase.storage().ref();

export default class extends Component {
	state={
		chapterTitle: "",
		description: "",
		date: Date.now(),
		image: ""
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	submitForm = event => {
		event.preventDefault();
		console.log("current state", this.state)

		// Create a root reference
		var storageRef = firebase.storage().ref();


	}


	render() {
		return (
			<div>
				<h3> Add New Chapter</h3>
				<form>
					<p>Title</p>
					<input name="chapterTitle" type="text" value={this.state.chapterTitle} onChange={this.handleInputChange} />
					<p>Description</p>
					<input namme="description" tyoe="text" value={this.state.description} onChange={this.handleInputChange} />
					<p>Date</p>
					<input name="date" type="date" value={this.state.date} placeholder={Date.now()} onChange={this.handleInputChange} />
					<p>Image</p>
					{/* <input name="image" type="text" value={this.state.image} onChange={this.handleInputChange} /> */}

					<RaisedButton
						containerElement='label' // <-- Just add me!
						label='My Label'>
						<input type="file"
						onChange={this.handleInputChange} />
					</RaisedButton>

					<p>Requirement</p>
					<DropDownMenu value={this.state.value} onChange={this.handleChange}>
          				<MenuItem value={1} primaryText="1" />
          				<MenuItem value={2} primaryText="2" />
          				<MenuItem value={3} primaryText="3" />
          				<MenuItem value={4} primaryText="4" />
          				<MenuItem value={5} primaryText="5" />
        			</DropDownMenu>
					<br />
					<button onClick={this.submitForm}>Add Chapter</button>


				</form>
			</div>
		)
	}
}
