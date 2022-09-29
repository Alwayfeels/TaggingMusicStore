import { MongoClient } from 'mongodb'

// db config
const username = encodeURIComponent("wangyunsong");
const password = encodeURIComponent("wys123456");
const clusterUrl = "43.143.12.132";
// const clusterUrl = "localhost:27017";

// const authMechanism = "DEFAULT";
const authMechanism = "SCRAM-SHA-256";

const uri = `mongodb://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

// Create a new MongoClient
const client = new MongoClient(uri);

export async function insertWelcome(info) {
    try {
        const database = client.db("TaggingMusic");
        const point = database.collection("welcome")
        // insert data
        point.insertOne(info, function (err, res) {
            if (err) throw err;
            console.log("新访问记录：", info);
        })
    } catch {
        console.log('MONGODB IS CLOSED')
        await client.close()
    }
}

export async function insertVisitedPoint(info) {
    try {
        const database = client.db("TaggingMusic");
        const point = database.collection("point")
        // insert data
        point.insertOne(info, function (err, res) {
            if (err) throw err;
            console.log("埋点记录成功：", info);
        })
    } catch {
        console.log('MONGODB IS CLOSED')
        await client.close()
    }
}

export default { insertVisitedPoint, insertWelcome }
