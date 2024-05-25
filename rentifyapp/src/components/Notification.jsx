import React,{useEffect, useState} from 'react'
import axios from 'axios';
import NotifyCard from './NotifyCard';
const Notification = () => {
  const [not,setNot]=useState([]);
  const [loading,setLoading]=useState(false);
  const allNoti=async()=>{
    setLoading(true);
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
    }finally{
      setLoading(false);
    }
  
  }
  useEffect(()=>{
allNoti();
  },[])
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
{loading ? <span>Loading...</span> : <>{not.length==0 ? <>
You do not have any notifications

</> :
<>
{not?.map((val)=>(
  <NotifyCard listing={val} />
))}
</>}
</>}

    </div>
  )
}

export default Notification;