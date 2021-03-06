

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
    const account = req.param("account")

    var record = new TodoRecord({"account":account,"block":block,"start_time":start_time,"end_time":end_time,"ratio":ratio});

    record.save(function(err){
        if(err){
            //res.send('error')
            res.json({"message":"fail to upload"});
        } else { 

            res.send(record)
        }
        
    })

};

exports.requireHistory = function(req,res){



    const account = req.params.id;

 
    TodoRecord.find(function(err,result){
        res.send(result)

    })

    //res.json({"message":req.params.id})

}
