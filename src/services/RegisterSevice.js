import {DatabaseConnection} from '../database/DatabaseConnection'

const db=DatabaseConnection.getConnection()

class RegisterService {

    // C R U D
    createTable(obra){
        if(obra.includes(" ")){
            obra = obra.replaceAll(" ", "_")
        }
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

                        picture_uri text,

                        validate_uri text,

                        latitude text,
                        longitude text,


                        created_date text,
                        created_time text,
                        PRIMARY KEY (id)
                    );`
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                // console.log("Created Table ", obra + "_Registers");
            }
        );
    }
    // Create
    addRegister(data){
        if(data == {} || data == null){
            return
        }
        if(data.obra_name.includes(" ")){
            data.obra_name = data.obra_name.replaceAll(" ", "_")
        }
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${data.obra_name}_Registers 
                    (id,
                    obra_name, 
                    material, 
                    origin,
                    destiny,
                    car,
                    
                    picture_uri,

                    validate_uri,

                    latitude,
                    longitude,

                    created_date,
                    created_time) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                    
                    [
                        data.id,
                        data.obra_name,
                        data.material,
                        data.origin,
                        data.destiny,
                        data.car,

                        data.pictureUri,
    
                        data.validateUri,

                        data.latitude,
                        data.longitude,

                        data.created_date
                    ], (_, {}) =>
                    resolve(200)
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                // console.log("addRegister transaction complete call back ");
            }
        ))
    }

    //Read
    getRegisters(obra){
        if(obra.includes(" ")){
            obra = obra.replaceAll(" ", "_")
        }
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
                // console.log("getRegisters transaction complete call back ");
            }
        )) 
    }

    getRegisterById(obra, id){
        if(obra.includes(" ")){
            obra = obra.replaceAll(" ", "_")
        }
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
                // console.log("getRegisters transaction complete call back ");
            }
        )) 
    }

    //Update
    updateRegister(data){
        if(data.obra_name.includes(" ")){
            console.log("Includes")
            data.obra_name = data.obra_name.replaceAll(" ", "_")
        }
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`update ${data.obra_name}_Registers 
                    SET 
                    destiny = ?,
                    picture_uri = ?,

                    validate_uri = ?
                    
                    WHERE id = ?`, 
                    
                    [
                        data.destiny,
                        data.picture_uri,
    
                        data.validate_uri,
                        data.id,
                    ], (_, {}) => 
                    resolve(200)
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                // console.log("updateRegister transaction complete call back ");
            }
        ))
    }

    //Delete
    deleteRegister(){

    }
}

const RegisterS = new RegisterService()
export default RegisterS