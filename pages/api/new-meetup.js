import { MongoClient } from "mongodb";

async function handler(req,res){
  if(req.method ==='POST'){
    const data = req.body;
    const client = await MongoClient.connect("mongodb+srv://sumesh:sumesh@cluster0.8jgrw.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db("meetups")
    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data)
    console.log(result);
    res.status(201).json({message:"Created meetup successfully"})
  }

}

export default handler;