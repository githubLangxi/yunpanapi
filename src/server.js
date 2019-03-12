import './init'
import express from 'express'
import path from 'path'
import _config from "./config.js" ;
import {createServer} from 'class2api'
import GKTag from './model/GKTag';
import test from './model/test';
//import TransferVLog from './jscomponent/TransferVLog';
console.log(`global.config_path = ${global.config_path}`)
let {redis} = _config


/**
 * 每个API被调用前的拦截处理
 * @param req
 * @param params
 * @param modelSetting
 * @returns {Promise<*>}
 */
const beforeCall = async ({req, params, modelSetting})=> {
    //判断对应的API类模块是否有认证修饰器函数，有则执行
    let {__Auth} = modelSetting
    if(process.env.NODE_ENV === "development") {
        console.log(`beforeCall [${ req.originalUrl }]:....${( typeof __Auth )}`)
        console.log('params:....' + JSON.stringify(params))
        console.log('req.header:token....' + JSON.stringify(req.header('token')))
        console.log('req.header:jwtoken....' + JSON.stringify(req.header('jwtoken')))
        console.log('req.cookies:....' + JSON.stringify(req.cookies))
    }
    //根据类的__Auth配置来进行身份验证,具体的验证逻辑由类的修饰器配置决定，这里不进行类静态方法的权限认证
    if (__Auth) {
        const userInfo = await __Auth({req})
        params.uID = userInfo.userInfo.id
        params.userinfo = userInfo.userInfo
    }
    return params
}


/**
 * 每个API被调用后的拦截处理，可以对返回数据做修饰处理
 * @param req
 * @param res
 * @param result
 * @returns {Promise<*>}
 */
const afterCall = async ({req,res,result})=> {
    let {__user} = req
    if (__user) {
        result.__user = __user
    }
    return result
}

//创建微服务对象
createServer({
    modelClasses:[GKTag,test],
    beforeCall,
    afterCall,
    config:{
        redis,
        frontpage_default:_config.frontPage.site,
        cros:true,
        cros_headers:['jwtoken']
    },
    custom:(expressInstence)=>{
        //const staticPath = path.join(__dirname, "./../public")
        //expressInstence.use(express.static(staticPath))
        return expressInstence
    }
}).then((server)=>{
    //region 开始监听指定的端口
    let port = process.env.PORT || _config.PORT ||  8057;
    server.listen(port, "0.0.0.0",(err)=> {
        if (err)
            throw err
        console.info("==> 🌎 Listening on port %s. Open up http://local.gankao.com:%s/ in your browser.", port, port);
    });
    //endregion
}).catch((error)=> {
    setTimeout(function () {
        throw  error
    })
})
