const express = require('express');
const port = 5555;
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

const actions = require('./data/helpers/actionModel.js')
const projects = require('./data/helpers/projectModel.js')

//make sure server is working
server.get('/', (req, res) => {
	res.send('hello from express');
})

// perform CRUD operations on projects and actions.

//get a particular project
server.get('/project/:id', (req, res) => {
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

//make a new project
server.post('/project', (req, res) => {
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

//update a project
server.put('/project/:id', (req, res) => {
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

//delete a project
server.delete('/project/:id', (req, res) => {
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

//get an action
server.get('/action/:id', (req, res) => {
	const id = req.params.id
	actions
	.get(id)
	.then(action => {
		res.status(200).json(action);
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ msg: "There was an error getting the action" })
	})
})

// create a new action for a project
server.post('/project/:id/action', (req, res) => {

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

//update an action
server.put('/action/:id', (req, res) => {
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

// delete an action
server.delete('/action/:id', (req, res) => {
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

//get a list of actions for a project
server.get('/project/:id/actions', (req, res) => {
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

server.listen(port, () => console.log(`server running on port ${port}`));
