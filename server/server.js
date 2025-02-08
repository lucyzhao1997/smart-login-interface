import express from 'express';
import dotenv from 'dotenv';
import {envs, Client} from "stytch";
import cors from "cors";

dotenv.config();

const app = express();
const client = new Client({
    project_id : process.env.PROJECT_ID,
    secret: process.env.SECRET,
    env: envs.test
});

const port = process.env.PORT || 3333;
app.use(cors());
app.use(express.json());

app.post('/register'  , async (req, res) => {
    const  {email, password} = req.body;
    try{
        //new token
        const resp = await client.passwords.create({
            email,
            password,
            session_duration_minutes: 60
        })
        res.json({
            success:true,
            message:'User created successfully',
            token: resp.session_token
        })
    } catch(e){
        console.log(e);
        res.json({
            success: false,
            message: e.error_message,
            e:e
        })
    }
})

app.post('/login'   , async (req, res) => {
    const  {email, password} = req.body;
    try{
        
        const resp = await client.passwords.authenticate({
            email,
            password,
            session_duration_minutes: 60
        })
        res.json({
            success:true,
            message:'User logged in successfully',
            token: resp.session_token
        })
    } catch(e){
        console.log(e);
        res.json({
            success: false,
            message: e.error_message,
            e:e
        })
    }
})
//check if token is still valid
app.post('/authenticate'   , async (req, res) => {
    const  {session_token} = req.body;
    try{
        await client.sessions.authenticate({
            session_token
        })
        res.json({
            success:true,
            message:'Token is valid'
        })
    } catch(e){
        console.log(e);
        res.json({
            success: false,
            message: e.error_message,
            e:e
        })
    }
})
//logout and wipe token
app.post('/logout'   , async (req, res) => {
    const  {session_token} = req.body;
    console.log('Received session_token:', session_token);
    try{
       
        await client.sessions.revoke({
            session_token
        })
        res.json({
            success:true,
            message:'Successfully logged out'
        })
    } catch(e){
        console.log(e);
        res.json({
            success: false,
            message: e.error_message,
            e:e
        })
    }
})
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
