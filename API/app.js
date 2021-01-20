const express = require('express')
var bodyParser = require('body-parser');
var mysql      = require('mysql');
const Excel = require('exceljs');
var multer = require('multer')
var cors = require('cors');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'carreteiro'
});

const app = express()
connection.connect();

app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Develop/CarreteiroApp2/CarreteiroApp/API/public')
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, file.originalname + '.jpg')
  }
})
 
var upload = multer({ storage: storage })

app.use(bodyParser.json());

function createObra(){
  connection.query(

    'CREATE TABLE if not exists obra (' +
    'id INT AUTO_INCREMENT,' +
    'obra_name varchar(255),' +
    'PRIMARY KEY (id));'
    
    
    ,function (error, results, fields) {
      if (error) throw error;
    }
  );
}

function insertObra(obra){
  connection.query(

    "INSERT INTO obra (obra_name)" +
    "Select '" + obra + "' Where not exists(select * from obra where obra_name = '" + obra + "');"
    
    ,function (error, results, fields) {
      if (error) throw error;
    }
  );
}

function createUser(){
  connection.query(

    'CREATE TABLE if not exists user (' +
    'user_name varchar(255),' +
    'password varchar(255),' +
    'type varchar(255),' +
    'PRIMARY KEY (user_name));'
    
    
    ,function (error, results, fields) {
      if (error) throw error;
    }
  );
}

async function getUser(res){
  await connection.query(

    "Select * from user;"
    
    ,function (error, results, fields) {
      res.send(results)
      if (error) throw error;
    }
  );
}

function insertUser(user){
  connection.query(

    "INSERT INTO user (" +
      "user_name, " +
      "password, " +
      "type) " +
      "VALUES (" +
        "'" + user.user_name + "'," +
        "'" + user.password + "'," +
        "'" + user.type + "'" +
      ")" +
      "ON DUPLICATE KEY UPDATE " + 
      "password = IF('" + user.password + "' <> '', '" + user.password + "', password), " +
      "type = IF('" + user.type + "' <> '', '" + user.type + "', type);"
    
    ,function (error, results, fields) {
      if (error) throw error;
    }
  );
}

function createTable(table){
  connection.query(

    'CREATE TABLE if not exists '+ table +'_Registers (' +
    'id varchar(255),' +
    'obra_name varchar(255),' +
    'material VARCHAR(255),' +
    'origin VARCHAR(255),' +
    'destiny VARCHAR(255),' +
    'car VARCHAR(255),' +
    'latitude VARCHAR(255),' +
    'longitude VARCHAR(255),' +
    'created_date VARCHAR(255),' +
    'created_time VARCHAR(255),' +
    'validate_time VARCHAR(255),' +
    'created_user VARCHAR(255),' +
    'validator_user VARCHAR(255),' +
    'PRIMARY KEY (id));'
    
    ,function (error, results, fields) {
      if (error) throw error;
    }
  );
}

function insertTable(register){
  connection.query(

    "INSERT INTO " + register.obra_name + "_Registers (id, " +
      "obra_name, " +
      "material, " +
      "origin, " +
      "destiny, " +
      "car, " +
      "latitude, " +
      "longitude, " +
      "created_date, " +
      "created_time, " + 
      "validate_time, " +
      "created_user, " +
      "validator_user) " +
      "VALUES (" +
        "'" + register.id + "'," +
        "'" + register.obra_name + "'," +
        "'" + register.material + "'," +
        "'" + register.origin + "'," +
        "'" + register.destiny + "'," +
        "'" + register.car + "'," +
        "'" + register.latitude + "'," +
        "'" + register.longitude + "'," +
        "'" + register.created_date + "'," +
        "'" + register.created_time + "'," +
        "'" + register.validate_time + "'," +
        "'" + register.created_user + "'," +
        "'" + register.validator_user + "'" +
      ")" +
      "ON DUPLICATE KEY UPDATE " + 
      "destiny = IF('" + register.destiny + "' <> '" + null + "', '" + register.destiny + "', destiny), " +
      "latitude = IF('" + register.latitude + "' <> '" + null + "', '" + register.latitude + "', latitude), " +
      "longitude = IF('" + register.longitude + "' <> '" + null + "', '" + register.longitude + "', longitude), " +
      "validate_time = IF('" + register.validate_time + "' <> '', '" + register.validate_time + "', validate_time), " +
      "validator_user = IF('" + register.validator_user + "' <> '', '" + register.validator_user + "', validator_user);"
    ,function (error, results, fields) {
      if (error) throw error;
    }
  );
}

async function saveObras(dataToSave){
  await createObra()
  for(var i = 0; i<Object.keys(dataToSave).length; i++){
    await insertObra(Object.keys(dataToSave)[i])
    await createTable(Object.keys(dataToSave)[i])

    var numberOfRegisterOnObra = dataToSave[Object.keys(dataToSave)[i]].length
    for(var j = 0; j<numberOfRegisterOnObra; j++){
      await insertTable(dataToSave[Object.keys(dataToSave)[i]][j])
    }
  }
}

async function saveUser(dataToSave, res){
  await createUser()
  for(var i = 0; i<Object.keys(dataToSave).length; i++){
    await insertUser(dataToSave[Object.keys(dataToSave)[i]])
  }
  res.send("")
}

async function getTableRegisters( obra, dateToFilter, res ){
  var query = ""

  for(var i = 0 ; i<obra.length; i++) {
    if(i==0)
      query = "Select * from " + obra[i].obra_name + "_Registers WHERE created_date = '" + dateToFilter +"'"
    else
      query = query + " Union Select * from " + obra[i].obra_name + "_Registers WHERE created_date = '" + dateToFilter +"'"
  }

  await connection.query(

    query
    
    ,function (error, results, fields) {
      if( results != undefined ){
        createXlxs( results, res )
        //res.send("Ok")
      } else {
        res.send("Sem registros pra essa data")
      }
      if (error) throw error;
    }
  );
}

async function getObras(dateToFilter, res){
  await connection.query(

    "Select * from obra;"
    
    ,function (error, results, fields) {
      getTableRegisters(results, dateToFilter, res)
      if (error) throw error;
    }
  );
}

function createXlxs(data, response){
  // need to create a workbook object. Almost everything in ExcelJS is based off of the workbook object.
  let workbook = new Excel.Workbook()
  
  let worksheet = workbook.addWorksheet('Registros')
  
  worksheet.columns = [
    {header: 'Registro', key: 'id'},
    {header: 'Obra', key: 'obra_name'},
    {header: 'CBMS', key: 'car'},
    {header: 'Material', key: 'material'},
    {header: 'E.Origem', key: 'origin'},
    {header: 'E.Destino', key: 'destiny'},
    {header: 'Latitude', key: 'latitude'},
    {header: 'Longitude', key: 'longitude'},
    {header: 'Data', key: 'created_date'},
    {header: 'Hora de criação', key: 'created_time'},
    {header: 'Hora da Validação', key: 'validate_time'},
    {header: 'Criador do Registro', key: 'created_user'},
    {header: 'Apontador do Registro', key: 'validator_user'}
  ]
  
  // force the columns to be at least as long as their header row.
  // Have to take this approach because ExcelJS doesn't have an autofit property.
  worksheet.columns.forEach(column => {
    column.width = column.header.length < 20 ? 20 : column.header.length
  })
  
  // Make the header bold.
  // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
  worksheet.getRow(1).font = {bold: true}
  
  // Dump all the data into Excel
  data.forEach((e, index) => {
    // row 1 is the header.
    const rowIndex = index + 2
  
    // By using destructuring we can easily dump all of the data into the row without doing much
    // We can add formulas pretty easily by providing the formula property.
    worksheet.addRow({
      ...e,
      amountRemaining: {
        formula: `=C${rowIndex}-D${rowIndex}`
      },
      percentRemaining: {
        formula: `=E${rowIndex}/C${rowIndex}`
      }
    })
  })
  
  // Create a freeze pane, which means we'll always see the header as we scroll around.
  worksheet.views = [
    { state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'B2' }
  ]
  
  // Keep in mind that reading and writing is promise based.
  response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	response.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
	workbook.xlsx.write(response)
		.then(function (data) {
			response.end();
		});
}

app.get('/', function (req, res) {
  res.send("")
})

app.get('/getExportData/:date', function(req, res) {
  getObras(req.params.date, res);
  //createXlxs()
});

app.post('/saveCreatedRegisters', function(req, res){
  var dataToSave = req.body.dataToSave
  saveObras(dataToSave)
  res.status(200).json({ message: "success!" });
});

app.post('/savePhotoRegisters', upload.array('file'), (req, res) => {
  //console.log(req.file)
  res.status(200).json({ message: "success!" });
});

app.get('/getUser', function(req, res) {
  getUser(res);
});

app.post('/saveUser', function(req, res){
  var dataToSave = req.body.dataToSave
  saveUser(dataToSave, res)
});

app.listen(3000)