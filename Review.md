# Review Questions

## What is Node.js?

Node.js is a runtime environment program or program that runs other programs. Javascript used to be the used primary for web browsers. With Node.js now Javascript on the server. Node.js is single threaded, meaning instructions occur in a single sequence from start to finish and don't branch out, asynchronous, meaning each operation starts only after the preceding operation is completed.

## What is Express?

Express is the most popular Node web framework. Express sits on top of Node.js and makes our life easier by providing routes, middleware support, and a list of helpful functions used to handle response information when using our Node.js server. We can use methods with express that speficy what function is called for a HTTP response such as get, post, or delete and then have routes and methods to specify that location those actions are in our web app.


The following sections explain some of the common things you'll see when working with Express and Node code.

## Mention two parts of Express that you learned about this week.

I was using express last week during the project week and all through learning React. However, I never though much about what express was. I didn't know that express itself is a framework that sits on top of Node.js. I was also pretty excited to know that I can take the error message that I got from express and put them in the view when making a React front end web app by catching the error and setting it as a property on that components state.

## What is Middleware?

Middleware is an array of functions that get executed in the order they are introduced into server code. Express middlewear has access to the request (req) and response (res) objects and we can call next() to continue the response cycle. This would be an example of middlewear that is built into express. We can also use third party middlewear to add to express such as cors which is used to transfer data from one local host to another. Also, during are project we build our own custom middlewear which we used with express to make sure the names of a user being created or updated was capitalized.


## What is a Resource?

A resource relates to a concept in Rest which states that everything is a resource. A resource must have a type, data, and relationships to other resources. These resources are used for transferring information from one computer to another through standard HTTP methods get, post, put, and delete. This is similar to an object instance in an object-oriented programming language.


## What can the API return to help clients know if a request was successful?

Rest api has a number of status codes which can be returned to the client to know outcome of the request. The status codes are meant to be descriptive to let us know what exactly happened with the request. This is meant to give us a better understand of what is going on with our application. For example if I issued a get request to a server and that request was successful the status code would be 200 (ok). If a user was inputting information into a form and he or she did not include input a 400 (bad request) error could be sent with information saying to please include content. This is different from a 500 error saying that there was something wrong with the servers code and not from an action from the user.

## How can we partition our application into sub-applications?

When we first started doing our home work we where learning the basics of how node and express work on the backend of our applications. This means that we where working with one resource posts and providing crud functionality. Later as the week went on we worked on two resources one being users and another being posts created by the user. While this was not too bad to work with over time it can lead to a messy and over crowded file, especially as the number of resources increase. It is possible however to break this file up using express.Router(). I can then make a new file and define all routing actions related to the /the_resource route an then import that into my file acting as my server. With each resource broken up such as /users or /posts into separate files it makes my code much more organized and easier to look at.


## What is express.json() and why do we need it?

express.json() is a built in middlewear for express. However, this middlewear is not activated by default when using express. When using express with our javascript projects we gain access to a request and response object. When we set up our server to use express.json() we gain the ability to parse json objects on our response. This function is similar to res.send(); however, it also convert non-objects such as null or undefined.
