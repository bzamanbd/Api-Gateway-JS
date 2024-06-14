import express, { json } from 'express' 
import "dotenv/config"
import proxyMiddleWare from './proxyMiddleWare.js'
import limiter from './rateLimitter.js'

const app = express() 

const port = process.env.PORT || 3001 

app.use([express.json(), limiter]) 

app.use('/post', proxyMiddleWare("http://127.0.0.1:3010","^/post"))
app.use('/comment', proxyMiddleWare("http://127.0.0.1:3020","^/comment"))




app.listen(port,()=> console.log(`Posts module runs on http://localhost:${port}`))