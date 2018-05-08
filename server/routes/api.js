const model = require('../models.js')

const express = require('express');
const router = express.Router();

//Connect to the db
const db = require('../db.js');
db.newCon();

//Mongoose Schemas
var taskSchema = db.Schema(model.task);

var Task = db.model('task', taskSchema);


/* GET api listing. */
router.get('/tasks', function(req, res) {
    Task.find(function(err, tasks) {
        if(err) return console.err(err);
        res.send(tasks);
    });
});

/*Get tasks by status. Converts to the shortened database key
for the task status.*/
router.get('/tasks/:status', function(req, res) {
    var dbType;
    switch(req.params.status.toLowerCase()){
        case 'backlog':
            dbType = 'b';
            break;
        case 'inprogress':
            dbType = 'ip';
            break;
        case 'complete':
            dbType = 'c';
            break;
    }
    
    Task.find({status: dbType}, function(err, tasks) {
        if(err) return console.err(err);
        res.send(tasks);
    });
});


router.get('/', function(req, res) {
  res.send('api works');
});




/* Posts */
router.post('/newTask', function(req, res) {
    var t = new Task({name: req.body.name, status: req.body.status});
    
    t.save(function(err, task) {
        if(err) return console.err(err);
        res.send(task);
    });
    
});

router.post('/updTaskStatus', function(req, res) {
    console.log(req.body);
    Task.findByIdAndUpdate(db.Types.ObjectId(req.body.id), { $set: { status: req.body.status }}, function (err, task) {
        if (err) return handleError(err);
        res.send(task);
    });
    
});



/*Error-handling*/
function handleError (err) {
    console.err(err);
};

//Last
module.exports = router;