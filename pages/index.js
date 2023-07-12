import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
const DUMMY_MEETUPS = [
  {
    id:'m1',
    title:'A first meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1024px-Stadtbild_M%C3%BCnchen.jpg',
    address:'Some address 5, Munchen , Germany ',
    description:'This is a first meetup'
  },
  {
    id:'m2',
    title:'A Second meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1024px-Stadtbild_M%C3%BCnchen.jpg',
    address:'Some address 6, Munchen , Germany ',
    description:'This is a second meetup'
  }
]

const HomePage = (props)=>{
  return <MeetupList meetups = {props.meetups} />
}

export async function getStaticProps(){
  const client = await MongoClient.connect("mongodb+srv://sumesh:sumesh@cluster0.8jgrw.mongodb.net/?retryWrites=true&w=majority")
  const db = client.db("meetups")
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return{
    props:{
      meetups:meetups.map(meetup=>({
        title:meetup.title,
        image:meetup.image,
        address:meetup.address,
        description:meetup.description,
        id:meetup._id.toString()

      }))
    }
  }
}


export default HomePage;