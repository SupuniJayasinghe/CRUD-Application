const { response } = require('./App');
const User = require('./model');


//controller functions
//services
//getusers
const getUsers = (req,res,next) => {
    User.find()
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json({message:err})
        });
}

//addusers
const addUser = (req,res,next) => {
    const user = new User({
        id:req.body.id,
        name:req.body.name
    });
    user.save()
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json({error:err})
        });
}

//edituser
const updateUser = (req,res,next) => {
    const {id, name} = req.body; //object restructuring
    User.updateOne({id:id}, { $Set: {name:name} })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json({error:err})
        });
}

//deleteuser
const deleteUser = (req,res,next) => {
    const id = req.body.id;
    User.deleteOne({id:id})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json({error:err})
        });
}

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;