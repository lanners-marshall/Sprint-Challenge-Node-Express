const express = require('express');
const router = express.Router();

const actions = require('../data/helpers/actionModel.js')
const projects = require('../data/helpers/projectModel.js')

// Create
//--------------------------------------------------------------------
//make a new project
router.post('', (req, res) => {
	if (!req.body.name || !req.body.description){
		res.status(400).json({msg: 'Please provide name/description'})
	} else if (req.body.name.length > 128){
		res.status(400).json({msg: '128 character limit on name'})
	} else {
		projects
		.insert(req.body)
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: "there was an error while saving user"})
		})
	}
})

// Read
//--------------------------------------------------------------------
//get a particular project
router.get('/:id', (req, res) => {
	const id = req.params.id
	projects
	.get(id)
	.then(project => {
		console.log(project)
		res.status(200).json(project);
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ msg: "There was an error getting the project" })
	})
})


// Update
//--------------------------------------------------------------------
//update a project
router.put('/:id', (req, res) => {
	const id = req.params.id
	const {name, description, completed} = req.body
	if (!req.body.name || !req.body.description){
		res.status(400).json({msg: 'Please provide name/description'})
	} else if (req.body.name > 128){
		res.status(400).json({msg: '128 character limit'})
	} else {
		projects
		.update(id, {name, description, completed} )
		.then(response => {
			console.log(response)
			if (response === null){
				res.status(404).json({ msg: "the project your trying to update does not exist" })
			} else {
				res.status(200).json(response)
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error while updating project'})
		})
	}
})

// Delete
//--------------------------------------------------------------------
//delete a project
router.delete('/:id', (req, res) => {
	const id = req.params.id
	projects
	.remove(id)
	.then(response => {
		// 0 for not there
		if (response === 0){
			res.status(404).json({msg: 'the project with specified ID does not exist'})
		}
		// 1 for there
		if (response === 1){
			res.status(200).json(response);
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error while deleting project'})
	})
})

module.exports = router;
