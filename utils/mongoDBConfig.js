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

/**
 * @desc: 插入 taggedSongs 数据
 * @param: { userId, profile, taggedSongs}
 */
export async function insertTaggedSongs(data) {
    try {
        const database = client.db("TaggingMusic");
        const Collection = database.collection("taggedSongs")
        // Query for a movie that has the title 'The Room'
        const query = { userId: data.userId };
        const isExist = await Collection.findOne(query);
        if (isExist) {
            // replace Data
            await Collection.replaceOne(query, data)
        } else {
            // insert data
            const options = { ordered: true };
            await Collection.insertOne(data, options)
        }
        console.log("taggedSongs 插入成功");
    } catch (err) {
        console.log('error: function insertTaggedSongs: ' + err)
        await client.close()
    }
}

/**
 * @desc: 获取 taggedSongs 数据
 */
export async function searchTaggedSongs(userId) {
    try {
        userId = Number(userId)
        const database = client.db("TaggingMusic");
        const Collection = database.collection("taggedSongs")
        // Query for a movie that has the title 'The Room'
        const query = { userId };
        const isExist = await Collection.findOne(query);
        console.log('success', isExist)
        if (isExist) {
            return isExist
        } else {
            return null
        }
    } catch (err) {
        console.log('error: function searchTaggedSongs: ' + err)
        await client.close()
    }
}

export default { insertVisitedPoint, insertWelcome, insertTaggedSongs, searchTaggedSongs }
