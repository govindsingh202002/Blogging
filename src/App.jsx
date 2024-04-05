import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router-dom';
import {login,logout} from './store/authSlice'

function App() {
const [loading,setLoading]=useState(true);
const dispatch=useDispatch();
useEffect(()=>{
   authService.getcurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }else{
      dispatch(logout());
    }
  })
  .finally(()=> setLoading(false))
},[]);
return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ):<h1 className='text-red-600 flex w-full h-full justify-center'>Loading....</h1>
}

export default App
