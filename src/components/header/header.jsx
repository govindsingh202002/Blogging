import React from 'react'
import {useSelector} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import Container from '../Container/Container'
import Logo from '../Container/Logo'
import LogoutBtn from './logoutBtn'

function Header() {
  const authStatus=useSelector((state,action)=>state.auth.status)
  const navigate=useNavigate();
  const navItems=[
    {
        name:'Home',
        slug:'/',
        active:true
    },
    {
        name:'Login',
        slug:'/login',
        active:!authStatus
    }, 
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },

  ]
    return (
    <header className='py-3 shadow bg-gray-500'>
        <Container>
            <nav className='flex items-center justify-between flex-wrap sm:flex-nowrap'>
            <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
                <Link to='/'>
                    <Logo/>
                </Link>
            </div> 
            <ul className='flex ml-auto'>
               {navItems.map((Item)=>
               Item?.active?(
                <li key={Item.name}>
                    <button
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    onClick={()=>navigate(Item.slug)}
                    >{Item.name}</button>
                </li>
               ):null
               )}
             {
                authStatus && (
                    <li>
                        <LogoutBtn/>
                    </li>
                )
             }
            </ul> 
            </nav>
        </Container>
    </header>
  )
}

export default Header
