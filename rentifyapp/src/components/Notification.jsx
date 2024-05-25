import React,{useEffect, useState} from 'react'
import axios from 'axios';
import NotifyCard from './NotifyCard';
const Notification = () => {
  const [not,setNot]=useState([]);
  const allNoti=async()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
        // console.log(formData);
      const res=await axios.get('https://rentify-kumt.onrender.com/notification', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNot(res.data);
    console.log(res);
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  
  }
  useEffect(()=>{
allNoti();
  },[])
  return (
    <div>
{not.length==0 ? <>
You do not have any notifications

</> :
<>
{not?.map((val)=>(
  <NotifyCard listing={val} />
))}
</>}

    </div>
  )
}

export default Notification;