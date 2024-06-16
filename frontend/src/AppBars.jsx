import AppBar from '@mui/material/AppBar';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import { userLoadingState } from '../store/selectors/userLoading';
import { userState } from '../store/atoms/user';
import { useNavigate } from 'react-router-dom';


function AppBars(){
    const navigate = useNavigate()
    // const [userEmail,setUserEmail] = useState(null)
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(userLoadingState)
    const setUser = useSetRecoilState(userState)
    
        if(userEmail){
            return(
       
                <div style={
                    {
                        display:'flex',
                        justifyContent:"space-between",
                        backgroundColor:"white",
                        height:50
                    }
                }>
                    <div style={{marginLeft:10}}>
                        <Button onClick={()=>{
                             navigate("/")
                        }}>
                       <Typography variant= "h5" style={{color:'black'}}>ChatApp</Typography>
                </Button>
                </div>
                <div style={{display:"flex",justifyContent:"flex-end",marginTop:10,marginRight:10}}>
                <div style={{marginRight:15}}>
                        <Button variant='contained' onClick={()=>{
                            navigate('/home')
                        }}>Home</Button>
                    </div>
                    <div>
                    
                    <Button variant='contained' onClick={()=>{
                        localStorage.setItem('token',null)
                        setUser({
                            isLoading:false,
                            userEmail:null,
                            userId:null
                        })
                        navigate('/user/signup')
                    }}>Logout</Button>
                    </div>
                </div>
                </div>
             
            )
        }

    return(
       
        <div style={
            {
                display:'flex',
                justifyContent:"space-between",
                backgroundColor:"white",
                height:50
            }
        }>
            <div style={{marginLeft:10}}>
                <Button onClick={()=>{
                    navigate("/")
                }}>
               <Typography variant= "h5" style={{color:'black'}}>ChatApp</Typography>
        </Button>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:10,marginRight:10}}>
            <div style={{marginRight:10}}>
            <Button variant='contained' onClick={()=>{
                window.location = '/user/login'
            }}>Login</Button>
            </div>
            <div>
            
            <Button variant='contained' onClick={()=>{
                navigate('/user/signup')
            }}>SignUp</Button>
            </div>
        </div>
        </div>
     
    )
}

export default AppBars;