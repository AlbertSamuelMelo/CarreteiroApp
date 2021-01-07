import {DatabaseConnection} from '../database/DatabaseConnection'

const db=DatabaseConnection.getConnection()

class LoggedSevice {

    // C R U D
    createLogged(){
        db.transaction(
            tx => {
                tx.executeSql(
                    `create table if not exists logged (
                        user_name text,
                        password text,
                        type text
                    );`,
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                // console.log("Created Obra ", obra);
            }
        );
    }
    // Create
    addUser(user){
        if(user.user_name == {} || user == null){
            return
        }
        if(user.user_name.includes(" ")){
            user.user_name = user.user_name.replace(/ /g, "_")
        }
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(
                    "insert into logged" + 
                    "(user_name, " +
                    "password," +
                    "type) " +
                    "values (?, ?, ?)", 
                    [
                        user.user_name,
                        user.password,
                        user.type,
                    ], (_, {}) =>
                    resolve("ResolveAddUser")
                ),
                tx.executeSql(
                    `select * from logged;`, [], (_, { rows }) => {
                        console.log(JSON.stringify(rows))
                    })
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                // console.log("addRegister transaction complete call back ");
            }
        ))
    }

    //Read
    getUsers(){
        return new Promise((resolve, reject) => db.transaction(
            tx => {         
                tx.executeSql(
                    `select * from logged;`, [], (_, { rows }) =>
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
    updateUser(){

    }

    //Delete
    deleteuser(){
        return new Promise((resolve, reject) => db.transaction(
            tx => {         
                tx.executeSql(
                    `Drop table logged;`, [], (_, { rows }) =>
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
}

const Logged = new LoggedSevice()
export default Logged