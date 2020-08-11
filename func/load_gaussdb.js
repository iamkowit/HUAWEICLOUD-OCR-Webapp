var mysql  = require('mysql');  
 
var config = mysql.createConnection({     
  host     : '<host_domain>',       
  user     : 'ocr_usr',              
  password : 'Welcome1',       
  port     : '3306',                   
  database : 'ocr_store',
  ssl      :  false
}); 

const conn = new mysql.createConnection(config);

conn.connect(
  function (err) { 
  if (err) { 
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  }
  else
  {
     console.log("Connection established.");
           queryDatabase();
  } 
});


var  addSql = 'INSERT INTO id_card_tbl(idno,fname,birthday,addr,isdate,expdate) VALUES(img_id,?,?,?,?,?)';
var  addSqlParams = ['$idcardno', '$fullname', '$birthday', '$address', 'issuedate', 'expiredate'];

conn.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();