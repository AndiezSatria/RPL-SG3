let mysql = require('mysql')

let conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'db_rpl'
})

conn.connect((err) => {
    if (err) throw err; 
    console.log('Koneksi berhasil')    
    
})

module.exports = conn