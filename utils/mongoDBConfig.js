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

export async function pingDb() {
    // try {
    //     // Establish and verify connection
    //     await client.db("admin").command({ ping: 1 });
    //     console.log("Connected successfully to server");
    // } finally {
    //     // Ensures that the client will close when you finish/error
    //     console.log('MONGODB IS CLOSED')
    //     await client.close();
    // }
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

// export function insertVisitedPoint(info) {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("TaggingMusic");
//         dbo.collection("point").insertOne(info, function (err, res) {
//             if (err) throw err;
//             console.log("埋点记录成功：", info);
//             db.close();
//         });
//     });
// }

export default { insertVisitedPoint, pingDb }