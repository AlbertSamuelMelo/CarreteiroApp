import { DatabaseConnection } from './DatabaseConnection'

var db = null
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on')
    );
        this.InitDb()
    }

    InitDb() {
        var sql = [
            // `DROP TABLE IF EXISTS obra;`,

            `create table if not exists obra (
                id integer AUTO_INCREMENT,
                obra_name text,
                PRIMARY KEY (id)
                );`,

            // `INSERT INTO obra (id, obra_name) VALUES (1, 'Teste');`,
            `SELECT * FROM obra`
        ];
        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    tx.executeSql(sql[i], [], (_, { rows }) =>
                    console.log(JSON.stringify(rows)));
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("InitDb transaction complete call back ");
            }
        );
    }
}