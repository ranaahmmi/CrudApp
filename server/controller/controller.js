 var Userdb=require('../model/model');

 //create and save new user
 exports.create=(req,res)=>{
     if(!req.body) {
          res.status(400).send({
             message: "User content can not be empty"
         });
         return;
     }
    console.log(req.body);
     const user = new Userdb({
            name: req.body.name, 
            email: req.body.email,
            gender:req.body.gender,
            status:req.body.status
     });

     user.save(user).then(data=>{
         res.send(data);

     }).catch(err=>{
         res.status(500).send({
             message:err.message || "Some error occurred while creating the User."
         })

     })
     
 }

 //retrive and return all users
 exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}
 //update new identified user by user id
 exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}
 //delete user with specified id
 exports.delete=(req,res)=>{
     const id = req.params.id;
     Userdb.findByIdAndDelete(id).then(data=>{
         if(!data) {
             res.status(404).send({
                 message: "User not found with id " + id
             });
         }else{
             res.send({message: "User deleted successfully!"});
         }
     }).catch(err=>{
         res.status(500).send({
             message: err.message || "Some error occurred while deleting the User."
         })
     })


 }