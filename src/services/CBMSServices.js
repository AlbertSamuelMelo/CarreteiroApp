import {DatabaseConnection} from '../database/DatabaseConnection'

const db=DatabaseConnection.getConnection()

class CBMSServices {

    // C R U D
    createTable(cbms){
        db.transaction(
            tx => {
                tx.executeSql(
                    `create table if not exists cbms (
                        cbms_name text,
                        PRIMARY KEY (cbms_name)
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
    addCBMS(cbms){
        if(cbms == {} || cbms == null){
            return
        }
        if(cbms.includes(" ")){
            cbms = cbms.replace(/ /g, "_")
        }
        db.transaction(
            tx => {
                tx.executeSql(
                "INSERT INTO cbms (cbms_name)" +
                "Select '" + cbms + "' Where not exists(select * from cbms where cbms_name = '" + cbms + "');");

                tx.executeSql(
                    `select * from cbms;`, [], (_, { rows }) => {
                        // console.log(JSON.stringify(rows))
                    }
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                // console.log("addObra transaction complete call back ");
            }
        );
    }

    //Read
    getCBMS() {
        return new Promise((resolve, reject) => db.transaction(
            tx => {         
                tx.executeSql(
                    `select cbms_name from cbms;`, [], (_, { rows }) =>
                    resolve(rows)
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                // console.log("getObras transaction complete call back ");
            }
        )) 
    }

    //Update
    updateCBMS(){

    }

    //Delete
    deleteCBMS(cbms_name){
        db.transaction(
            tx => {
                tx.executeSql(
                    'DELETE FROM cbms WHERE cbms_name = ?;', [cbms_name], (_, { rows }) => {
                        // console.log(JSON.stringify(rows))
                    }
                );
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
            }
        );
    }
}

const CBMSS = new CBMSServices()
export default CBMSS