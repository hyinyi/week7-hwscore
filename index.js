let express = require('express');
let app = express();

app.use(express.json());


let Datastore = require('nedb');
let db= new Datastore('coffee.db');
db.loadDatabase();



let coffeeTracker = [];


//2. add a route on server, that listens for a post request

app.post('/noCups', (req, res)=> {
    console.log(req.body);

    let obj = {
        coffee: req.body.number,
        coffee2: req.body.number2
    }


    db.insert(obj, (err,newDocs) =>{
        // console.log('new document inserted');
        if(err) {
            res.json({task: "task failed"});
        } else {
            res.json({task:"success"});
        }
    })
    //coffeeTracker.push(obj);
    //console.log(coffeeTracker);

})


app.use('/',express.static('public'));



//add route to get all coffee track info
app.get('/getCups', (req,res)=> {
    db.find({}, (err, docs)=> {
        //console.log(docs);
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }
    })
})


let port = process.env.PORT || 3000;
app.listen(3000,()=>{
    console.log('listening at localhost:3000');//where is listening
})