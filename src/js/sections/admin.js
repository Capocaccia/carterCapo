import {renderHeader} from '../header.js';

const getProjectData = () => {
	let description = document.querySelector('.add-field-description').value;
	let image = document.querySelector('.add-field-image').value;
	let url = document.querySelector('.add-field-url').value;
	let title = document.querySelector('.add-field-title').value;

	writeNewProject(description, image, url, title);
}

document.querySelector('.add-project-submit').addEventListener('click', getProjectData)

function writeNewProject(desc, image, linkPath, titleText) {
	// A new entry.
	var projectData = {
		description: desc,
		image: image,
		link: linkPath,
		title: titleText,
	};

	// Get a key for a new entry.
	var newPostKey = firebase.database().ref().child('projects/projectItems/').push().key;

	var updates = {};
	updates['projects/projectItems/' + newPostKey] = projectData;

	return firebase.database().ref().update(updates);
}