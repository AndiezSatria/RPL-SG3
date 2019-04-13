let express = require('express')
let app = express()
let conn = require('./config')
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('Halaman Utama')
})

app.get('/mahasiswa', (req, res) => {
    conn.query('SELECT nama, nama_fakultas FROM mahasiswa JOIN fakultas ON mahasiswa.fakultas=fakultas.id_fakultas', (err, rows, fields) => {
        try {
            res.send({'data' : rows})
        } catch (error) {
            res.send({'data' : false})
        }
    })
})

app.post('/mahasiswa', (req,res) => {
    let data_insert =  [
        req.body.nim,
        req.body.nama,
        req.body.fakultas,
        req.body.angkatan
    ];

    conn.query('INSERT INTO mahasiswa (nim, nama, fakultas, angkatan) VALUES (?, ?, ?, ?)', data_insert, (err, rows, fields) => {
        if (err) {
            res.send({data:false})
        } else {
            res.send({data:true})
        }
    })
})

app.get('/mahasiswa/:nim', (req,res) => {
    conn.query('SELECT nama, nama_fakultas FROM mahasiswa JOIN fakultas ON mahasiswa.fakultas=fakultas.id_fakultas WHERE nim=?', req.params.nim, (err, rows, fields) => {
        if (err) {
            res.send({data:false})
        } else {
            res.send({data:rows})
        }
    })
})

app.listen(3000)