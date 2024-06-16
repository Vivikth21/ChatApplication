import { useState,useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Landing from './Landing';
import AppBars from './AppBars';
import {RecoilRoot,useSetRecoilState} from 'recoil';
import { userState } from '../store/atoms/user';
import Home from './Home';
import axios from 'axios';

function App() {
  return (

    <div style={{width:"100vw",minHeight:"100vh",background:'#eef0e6'}}>
      <Router>
        <AppBars/>
        <InitUser/>
        
        <Routes>
          <Route path='/user/signup' element = {<Signup/>}/>
          <Route path = '/user/login' element = {<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/' element = {<Landing/>}/>
        </Routes>
      </Router>
    </div>
  )
}

function InitUser(){

  const setUser = useSetRecoilState(userState)
  const init = async()=>{
    try{
        const response = await axios.get('http://localhost:3000/allUsers/me', {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
      console.log("Main data: ",response.data);
      console.log("Username Main: ",response.data.username);
      console.log("Id Main: ",response.data.id);
      if(response.data.username){
        setUser({
          isLoading:false,
          userEmail:response.data.username,
          userId:response.data.id
        })
      }
      else{
        setUser({
          isLoading:false,
          userEmail:null,
          userId:null
        })
      }
    }catch(e){

      setUser({
        isLoading: false,
        userEmail: null,
        userId: null
      })
    }
  }

  useEffect(()=>{
    init()
  },[])

  return <></>
}


export default App
