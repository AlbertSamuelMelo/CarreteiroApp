import {DatabaseConnection} from '../database/DatabaseConnection'

const db=DatabaseConnection.getConnection()

class ObraService {

    // C R U D
    createTable(obra){
        db.transaction(
            tx => {
                tx.executeSql(
                    `create table if not exists obra (
                        id integer AUTO_INCREMENT,
                        obra_name text,
                        PRIMARY KEY (id)
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
    addObra(obra){
        if(obra == {} || obra == null){
            return
        }

        db.transaction(
            tx => {
                tx.executeSql(`INSERT INTO obra (id, obra_name) VALUES (1, ?);`, [obra]);

                tx.executeSql(
                    `select * from obra;`, [], (_, { rows }) =>
                    // console.log(JSON.stringify(rows))
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
    getObras() {
        return new Promise((resolve, reject) => db.transaction(
            tx => {         
                tx.executeSql(
                    `select obra_name from obra;`, [], (_, { rows }) =>
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
    updateObra(){

    }

    //Delete
    deleteObra(){

    }
}

const ObraS = new ObraService()
export default ObraS