const express = require('express');
const app = express();
const cors = require ('cors');
const dotenv = require ('dotenv');
dotenv.config ();


const DbService = require ('./dbService');
const { request, response } = require('express');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))

//create
app.post('/insert', (request, response) => {
  
    
    const insert = request.body;
    const db = DbService.getDbServiceInstance();
    db.add(insert,response);

  

   
});



//read
app.get('/getAll', (request, response)=>{
    const db = DbService.getDbServiceInstance();

      const result= db.getAllData();
      result
      .then (data => response.json ({
          data:data
      }))
      .catch (err => console.log (err));

})   


//update
app.patch ('/update',(request,response)=>{
    const {id, date } = request.body
    const db = DbService.getDbServiceInstance();
    
    const result = db.updateRowbyID (id,date)
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));

})


//delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = DbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT,() => 
console.log('app is running'));

