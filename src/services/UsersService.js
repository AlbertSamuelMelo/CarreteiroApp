import {DatabaseConnection} from '../database/DatabaseConnection'

const db=DatabaseConnection.getConnection()

class UserService {

    // C R U D
    createUsers(){
        db.transaction(
            tx => {
                tx.executeSql(
                    `create table if not exists user (
                        user_name text,
                        password text,
                        type text,
                        PRIMARY KEY (user_name)
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
                    `INSERT OR REPLACE INTO user
                    (user_name,
                    password,
                    type
                    )
                    VALUES (?, ?, ?)`, 
                    [
                        user.user_name,
                        user.password,
                        user.type,
                    ], (_, {}) =>
                    resolve("ResolveAddUser")
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
    getUsers(){
        return new Promise((resolve, reject) => db.transaction(
            tx => {         
                tx.executeSql(
                    `select * from user;`, [], (_, { rows }) =>
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

    }
}

const UserS = new UserService()
export default UserS