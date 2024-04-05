import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Protect({children,authentication=true}) {
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const authStatus=useSelector((state,action)=> state.auth.status);
    useEffect(()=>{
        if(authentication && authStatus===authentication){
            navigate('/all-posts');
        }else if(!authentication && authStatus!==authentication){
            navigate('/login');
        }
        setLoader(false);
    },[authStatus,navigate,authentication])
  return loader?<h1 className='flex justify-center w-full text-red-600'>Loading...</h1>:<>{children}</>
}

export default Protect
