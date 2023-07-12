import { userAgent } from 'next/server'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'

const NewMeetup = ()=>{
  const router = useRouter();
  const addMeetuphandler=async(eneteredData)=>{
    const response = await fetch('/api/new-meetup',{
      method:'POST',
      body:JSON.stringify(eneteredData),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const data = await response.json();

    console.log(data);
    router.push('/')
  }
  return <NewMeetupForm onAddMeetup = {addMeetuphandler} />
}

export default NewMeetup;