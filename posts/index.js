import express, { json } from 'express' 
import "dotenv/config"
import axios from 'axios' 
import { redisClient, setCache } from '../gateway/redis_client.js'


const app = express() 

const port = process.env.PORT || 3011 

app.use(express.json())

app.get('/', async (req,res)=>{ 
    try {
        const cachedData = await redisClient.get("posts");
        if (cachedData) {
            return res.status(200).json({ 
                message: "DATA FROM REDIS", 
                data: JSON.parse(cachedData)
            })
        }else{ 
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts') 
            if (data) {
                setCache("posts", data); 
               return res.status(200).json({message:"DATA FROM MAIN DATABASE", data: data});
            } 
            return res.status(404).json({message:"Data not found!"})
        }   
    } catch (error) {
        res.status(500).json({message:error})
    }
})

app.listen(port,()=> console.log(`Posts module runs on http://localhost:${port}`))