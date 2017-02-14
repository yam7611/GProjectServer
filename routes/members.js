

var mongoose = require('mongoose'),
    Todo = mongoose.model('members')
    //,Address = mongoose.model('Address');
/**
 * Get Todos Listing
 */
exports.index  = function(req,res){
    Todo.find( function(err, todo) {
        if (err) return res.render('Error occurred');
        res.send(todo);
    });
};


exports.findById = function(req,res){


    Todo.findById( req.params.id, function( err, todo ) {
            if (err) {
                res.send('Error occurred');
                return console.log(err);
            }
            res.send(todo);
    });
};

exports.longinToSystem = function(req,res){
    const username = req.param("account");
    const password = req.param("password");
    const name = req.param("name");
    //res.send('gotologinsystem');
    Todo.findOne({account: username},function(err,doc){
     
        if (doc == null){
            //callback('user not found');
            res.send('user not found');
        }
        else{
            if (doc.password == password){
                //callback('welcome back');
                res.send('welcome back,'+ name);
            } else {
                res.send('invalid password');
            }
        }
        
    })
   
}

exports.newTodo = function(req,res){
    var emp = new Todo(req.body);

    emp.save(function(err){
        if (err) {
            res.send('Error occurred');
            return console.log(err);
        }
        res.send(emp);
    });
}

exports.update = function(req,res){
    Todo.findById( req.params.id, function( err, todo ) {
        if(!todo){
            res.send('Todo not found with given id');
        }else{
            if(todo.__v != req.body.__v){
                return res.send('Please use the update todo details as ' + todo);
            }
            todo.set(req.body)
            if(todo.isModified()){
                todo.increment();
                todo.save(function(err){
                    if (err) {
                        res.send('Error occurred');
                        return console.log(err);
                    }
                    res.send(todo);
                });
            }else{
                res.send(todo);
            }

        }
    });
};

exports.delete = function(req,res){
    Todo.findById( req.params.id, function( err, todo ) {
        if(!employee){
            return res.send('Todo not found with given id');
        }
        todo.remove(function(err){
            if (err) {
                res.send('Error occurred');
                return console.log(err);
            }
            res.send('Deleted')
        });
    });
};