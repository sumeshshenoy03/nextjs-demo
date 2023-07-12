import MeetupDetail from "../../components/meetups/MeetupDetails";
import { MongoClient,ObjectId } from "mongodb";
function MeetupDetails(props){
  return <MeetupDetail image={props.meetupData.image} title={props.meetupData.title} address = {props.meetupData.address} description = {props.meetupData.description} />

}

export async function getStaticPaths(){

  const client = await MongoClient.connect("mongodb+srv://sumesh:sumesh@cluster0.8jgrw.mongodb.net/?retryWrites=true&w=majority")
  const db = client.db("meetups")
  const meetupsCollection = db.collection('meetups')
  const meetupIds = await meetupsCollection.find({},{_id:1}).toArray();
  client.close()
  return{
    fallback:false,
    paths:meetupIds.map(meetup=>({
      params:{
        meetupId:meetup._id.toString()
      }
    }))
     
  }
}


export async function getStaticProps(context){
  //fetch data
  const meetupId = context.params.meetupId
  const client = await MongoClient.connect("mongodb+srv://sumesh:sumesh@cluster0.8jgrw.mongodb.net/?retryWrites=true&w=majority")
  const db = client.db("meetups")
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.findOne({_id:new ObjectId(meetupId)})
  client.close()
  return{
    props:{
      meetupData:{
        title:meetups.title.toString(),
        image:meetups.image.toString(),
        description:meetups.description.toString(),
        address:meetups.address.toString()
      }
    }
  }


}






export default MeetupDetails;