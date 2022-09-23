import MongoDB from 'mongodb'

var MongoClient = MongoDB.MongoClient;
var url = "mongodb://localhost:27017";

export function createDB() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("数据库已创建!");
        db.close();
    });
}

export function createCollect() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('数据库已创建');
        var dbase = db.db("TaggingMusic");
        dbase.createCollection('point', function (err, res) {
            if (err) throw err;
            console.log("创建集合!");
            db.close();
        });
    });
}

export function insertVisitedPoint(info) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("TaggingMusic");
        dbo.collection("point").insertOne(info, function (err, res) {
            if (err) throw err;
            console.log("埋点记录成功：", info);
            db.close();
        });
    });
}