const express = require('express');
const router = express.Router();

const actions = require('../data/helpers/actionModel.js')
const projects = require('../data/helpers/projectModel.js')

// Create
//--------------------------------------------------------------------
// create a new action for a project
router.post('/:id', (req, res) => {

	//first I check to make sure project existis in database
	const project_id = req.params.id
	projects
	.get(project_id)
	.catch(error => {
		console.log(error)
		return res.status(500).json({msg: "Project with ID does not exist in database" })
	})

	//if it does I then check to make sure it has description and notes
	const {description} = req.body;
	const {notes} = req.body;
	if (!req.body.description || !req.body.notes){
		res.status(400).json({msg: "Please provide description/notes for action"})
		//I also check to make sure its not length is not too long on description
	} else if (req.body.description.length > 128) {
		res.status(400).json({msg: "128 character limit"})
		//if all tests pass I add the action to the db
	} else {
		actions
		.insert({description, notes, project_id })
		.then(response => {
			res.status(201).json(response);
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: "There was an error while saving the post" })
		})
	}

})

// Read
//--------------------------------------------------------------------
//get a list of actions for a project
router.get('/:id', (req, res) => {
	const	id = req.params.id
	projects
	.getProjectActions(id)
	.then(projectActions => {
		if (projectActions.length === 0){
			res.status(404).json({msg: 'No actions at ID location'})
		} else {
			res.status(200).json(projectActions)
		}
	})
})

// Update
//--------------------------------------------------------------------
//update an action
router.put('/:id', (req, res) => {
	const id = req.params.id
	const {description} = req.body
	const {notes} = req.body
	if (!req.body.description || !req.body.notes){
		res.status(400).json({msg: "Please provide content for editing action"})
	} else if (req.body.description.length > 128) {
		res.status(400).json({msg: "128 character limit"})
	} else {
		actions
		.update(id, {description, notes})
		.then(response => {
			console.log(response)
			if (response === null){
				res.status(404).json({ msg: "the action your trying to update does not exist" })
			} else {
				res.status(200).json(response)
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error while updating action'})
		})
	}
})

// Delete
//--------------------------------------------------------------------
// delete an action
router.delete('/:id', (req, res) => {
	const id = req.params.id
	actions
	.remove(id)
	.then(response => {
		// 0 for not there
		if (response === 0){
			res.status(404).json({msg: 'the action with specified ID does not exist'})
		}
		// 1 for there
		if (response === 1){
			res.status(200).json(response);
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error while deleting action'})
	})
})

module.exports = router;
