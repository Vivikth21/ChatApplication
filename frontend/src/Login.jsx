import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';


function Login(){
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate();

    const handleLogin = ()=>{
        if(username.trim() === '' || password.trim()===''){
            alert('Empty fields cannot exist');
            return;
        }

        axios.post('http://localhost:3000/user/login',{},{
            headers:{
                username: username,
                password: password
            }
        }).then(response=>{
            localStorage.setItem('token',response.data.token);
            const id = response.data.id;
            setUser({
                isLoading:false,
                userEmail:username,
                userId: id
              })
            console.log(response.data);
            alert('Logged in successfully');
            setUsername('')
            setPassword('')
            navigate('/home');
        }).catch(error=>{
            alert("User does not exist")
            setUsername('')
            setPassword('')
          })
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <center>
            <h3 style={{ color: 'black', marginBottom: 20 }}><b>Please Login below</b></h3>
        </center>
        <Card variant='outlined' style={{ width: 500, borderColor: "black", backgroundColor: "white" }}>
            <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <TextField id="outlined-basic" label="Username" variant="outlined" style={{ width: "100%", backgroundColor: "white" }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <TextField id="outlined-password" label="Password" type="password" variant="outlined" style={{ width: "100%", backgroundColor: "white" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Button variant="contained" onClick={handleLogin}>Login</Button>
            </CardContent>
        </Card>
    </div>
    )
}

export default Login;