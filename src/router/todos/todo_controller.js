const express = require('express');
const con = require('../../database/db_config.js');

const router = express.Router();

con.connect(err =>
                        {if(err)
                            throw err});

router.post('',(req, res) => {

    if(req.body.tags != undefined){
        tags = req.body.tags;
        req.body.tags = req.body.tags.join();
    }
    let data = req.body;
    let sql = "INSERT INTO TodoList SET ?";

    con.query(sql,data,((err, results) => {
        if(err) {
            throw err;
        }

        return res.json(results);
    }));
});

router.get('',(req, res) => {
    let sql = "SELECT * FROM TodoList";

    con.query(sql,((err, results) => {
        if(err) {
            throw err;
        }
        res.status(200);
        return res.json(results);
    }));
});

router.get('/:id',(req, res) => {

    let sql = "SELECT * FROM TodoList WHERE id="+"'"+req.params.id+"'";

    con.query(sql,((err, results) => {
        if(err) {
            throw err;
        }
        res.status(200);
        return res.json(results);
    }));
});

router.delete('/:id',(req, res) => {

    let sql = "DELETE FROM TodoList WHERE id="+"'"+req.params.id+"'";

    con.query(sql,((err, results) => {
        if(err) {
            throw err;
        }
        res.status(200);
        return res.json(results);
    }));
});

router.put('/:id',(req, res) => {
    if(req.body.tags != undefined){
        req.body.tags = req.body.tags.join();
    }
    let data = req.body;
    let sql = "UPDATE TodoList SET ? WHERE id="+"'"+req.params.id+"'";

    con.query(sql,data,((err, results) => {
        if(err) {
            throw err;
        }
        res.status(200);
        return res.json(results);
    }));
});

router.put('/:id/complete',(req, res) => {
    console.log(req.params.id);
    let sql = "UPDATE TodoList SET isCompleted=true WHERE id="+"'"+req.params.id+"'";

    con.query(sql,((err, results) => {
        if(err) {
            throw err;
        }
        res.status(200);
        return res.json(results);
    }));
});

module.exports = router;