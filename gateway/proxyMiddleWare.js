import { createProxyMiddleware } from 'http-proxy-middleware'

const proxyMiddleWare = (targetUrl, reWritePath)=>createProxyMiddleware( { target:targetUrl, reWritePath, pathRewrite:{reWritePath : "" } }) 

export default proxyMiddleWare