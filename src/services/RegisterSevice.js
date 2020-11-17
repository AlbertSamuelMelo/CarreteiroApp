import {DatabaseConnection} from '../database/DatabaseConnection'

const db=DatabaseConnection.getConnection()

class RegisterService {

    // C R U D
    createTable(obra){
        db.transaction(
            tx => {
                tx.executeSql(
                    `create table if not exists ${obra}_Registers (
                        id text,
                        obra_name text,
                        material text,
                        origin text,
                        destiny text,
                        car text,

                        picture text,
                        picture_uri text,

                        validate text,
                        validate_uri text,

                        created_date text,
                        PRIMARY KEY (id)
                    );`
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("Created Table ", obra + "_Registers");
            }
        );
    }
    // Create
    addRegister(obra, data){
        if(data == {} || data == null){
            return
        }

        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${obra}_Registers 
                    (id,
                    obra_name, 
                    material, 
                    origin,
                    destiny,
                    car,
                    
                    picture,
                    picture_uri,

                    validate,
                    validate_uri,

                    created_date) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                    
                    [
                        data.id,
                        data.obra_name,
                        data.material,
                        data.origin,
                        data.destiny,
                        data.car,

                        data.picture,
                        data.pictureUri,
    
                        data.validate,
                        data.validateUri,

                        data.created_date
                    ], (_, {}) =>
                    resolve(200)
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("addRegister transaction complete call back ");
            }
        ))
    }

    //Read
    getRegisters(obra){
        return new Promise((resolve, reject) => db.transaction(
            tx => {         
                tx.executeSql(
                    `select * from ${obra}_Registers;`, [], (_, { rows }) =>
                    resolve(rows)
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("getRegisters transaction complete call back ");
            }
        )) 
    }

    getRegisterById(obra, id){
        return new Promise((resolve, reject) => db.transaction(
            tx => {         
                tx.executeSql(
                    `select * from ${obra}_Registers WHERE id = ?;`, [id], (_, { rows }) =>
                    resolve(rows)
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("getRegisters transaction complete call back ");
            }
        )) 
    }

    //Update
    updateRegister(data){
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`update ${data.obra_name}_Registers 
                    SET 
                    picture = ?,
                    picture_uri = ?,

                    validate = ?,
                    validate_uri = ?
                    
                    WHERE id = ?`, 
                    
                    [
                        data.picture,
                        data.picture_uri,
    
                        data.validate,
                        data.validate_uri,
                        data.id,
                    ], (_, {}) => 
                    resolve(200)
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("updateRegister transaction complete call back ");
            }
        ))
    }

    //Delete
    deleteRegister(){

    }
}

const RegisterS = new RegisterService()
export default RegisterS