

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
    var username = req.body['account']
    var password = req.body['password']
    Todo.findOne({account :username},function(e,o){
        callback('go!~')
        if (o == null){
            callback('user not found');
        }
        else{
            if (o.password == password){
                callback('welcome back');
            } else {
                callback('invalid password');
            }
        }
        
    })
    res.status(200).send()
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