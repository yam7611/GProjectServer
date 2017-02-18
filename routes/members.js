

var mongoose = require('mongoose'),
    Todo = mongoose.model('members'),
    TodoRecord = mongoose.model('records')

    //,Address = mongoose.model('Address');


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
    })
};

exports.signUp = function(req,res){
    const username = req.param("account");
    const password = req.param("password");
    const name = req.param("name");

    Todo.findOne({account: username},function(err,doc){
        if(doc !== null){
            res.json({"message":"the account name is used!"});
        } else {

            var member =  new Todo({"account":username,"name":name,"password":password});
            member.save(function(err){
                if(err){
                    res.json({"message":err});
                } 
                res.send(member);
            });   
        }
    });

};

exports.longinToSystem = function(req,res){
    const username = req.param("account");
    const password = req.param("password");
    
    //res.send('gotologinsystem');
    Todo.findOne({account: username},function(err,doc){
     
        if (doc == null){
            //callback('user not found');
            res.send('user not found');
        }
        else{
            if (doc.password == password){
                //callback('welcome back');
                res.json({"name":doc.name,"account":doc.account});
            } else {
                res.json({"name":"null"});
            }
        }
        
    })
};


exports.fetchDataFromServer = function(req,res){
    var request = require('request');
    //res.send('go!')
    request({
      uri: "http://115.146.91.233/api/task-specifications",
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
    }, function(error, response, body) {
      res.send(body);

    })
};

exports.writeDataToDatabase = function(req,res){


    const block = req.param("block")
    const start_time = req.param("start_time")
    const end_time = req.param("end_time")
    const ratio = req.param("ratio")

    var record = new TodoRecord({"block":block,"start_time":start_time,"end_time":end_time,"ratio":});

    record.save(function(err){
        if(err){
            //res.send('error')
            res.json({"message":"fail to upload"});
        } else { 

            res.send(record)
        }
        
    })

};

// exports.update = function(req,res){
//     Todo.findById( req.params.id, function( err, todo ) {
//         if(!todo){
//             res.send('Todo not found with given id');
//         }else{
//             if(todo.__v != req.body.__v){
//                 return res.send('Please use the update todo details as ' + todo);
//             }
//             todo.set(req.body)
//             if(todo.isModified()){
//                 todo.increment();
//                 todo.save(function(err){
//                     if (err) {
//                         res.send('Error occurred');
//                         return console.log(err);
//                     }
//                     res.send(todo);
//                 });
//             }else{
//                 res.send(todo);
//             }

//         }
//     });
// };
