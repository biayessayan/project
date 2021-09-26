const mysql = require('mysql');
const dotenv = require ('dotenv');
const moment = require ('moment')
let instance = null;



dotenv.config()



const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    
    port:process.env.db_port
})


connection.connect((err)=>{
    if (err){
    console.log(err.message);
}
console.log('db ' + 'conexao ok');

})



class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllData(){
        try{
            const response = await new Promise ((resolve, reject)=>{
                const query = "SELECT * FROM insert_costs";
                connection.query (query, (err,results)=>{
                    if (err) reject (new Error (err.message));
                    resolve(results);
                })
            });
            console.log (response);
           return response; 
        }catch (error){
            console.log(error);
        }
    }

    //INSERT BANCO DE DADOS
    add(insert, response){

        const Date = moment().format ('YYYY-MM-DD')
       // const data = moment(spend.date,'DD/MM/YYYY').format ('YYYY-MM-DD')
        const insert_costs = {...insert,Date}
       
       
        const query = 'INSERT INTO costs SET ?'
        
        
   
        connection.query(query,insert_costs,(error, results) =>{
              if (error){
                response.status(400).json (error)
                console.log(error)
              }else{
                response.status(201).json(results)
                console.log(results)
                
              }
           

           })
         
       }
       async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM costs WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    
        
    }
       
   async updateRowbyID (id,date){
    try {
        id = parseInt(id, 10); 
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE costs set Date = ? WHERE id = ?";

            connection.query(query, [date,id] , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result);
            })
        });
        console.log(response)
    } catch (error) {
        console.log(error);
        return false;
    }  
   }
}

module.exports = DbService;