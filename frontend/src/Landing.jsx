import { Grid ,Typography,Button} from "@mui/material";
// import myImage  from "./assets/courseverse-high-resolution-logo.jpg"
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";

function Landing(){
    const navigate = useNavigate()
    const userEmail = useRecoilValue(userEmailState)
    return(
       <Grid container>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop:100,paddingLeft:"30px"}}>
                    <Typography variant="h2" color={"black"}>Chat Application</Typography>
                </div>
                <div style={{paddingLeft:"35px",marginTop:5}}>
                    <Typography variant="h6" color={"black"}>A Platform for real-time messaging </Typography>
                </div>
                {!userEmail && <div style={{display:"flex",margin:30}}>
                    <div style={{marginRight:20}}>
                        <Button variant="contained" onClick={()=>{
                            navigate('/user/login')
                        }}>Login</Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={()=>{
                            navigate('/user/signup')
                        }}>Signup</Button>
                    </div>
                    </div>}
                <div></div>
            </Grid>
            
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop:40}}>
                    {/* <img src={myImage} width={"100%"}></img> */}
                </div>
            </Grid>
       </Grid>
    )
}

export default Landing;