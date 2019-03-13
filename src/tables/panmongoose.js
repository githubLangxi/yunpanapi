var mongoose=require('mongoose')

//import DB_URL from './../config/'
//数据库连接地址  链接到myStudent数据库
//var DB_URL='mongodb://panlog:panlog1221@localhost:27018/panLog'
//var DB_URL='mongodb://panlog:panlog1221@10.9.106.10:27017/panLog'
var DB_URL='mongodb://panlog:panlog1221@10.9.107.130:27017/panLog'


//数据库连接
mongoose.connect(DB_URL, { useNewUrlParser: true })

//连接成功终端显示消息
mongoose.connection.on('connected',function () {
    console.log('mongoose connection open to '+DB_URL)
})
//连接失败终端显示消息
mongoose.connection.on('error',function (err) {
    console.error(err);
    console.log('mongoose error ')
})
//连接断开终端显示消息
mongoose.connection.on('disconnected',function () {
    console.log('mongoose disconnected')
})

//创建一个Schema  每一个schema会一一对应mongo中的collection
let schema=mongoose.Schema

//实例化一个Schema
let sysNameSchema=new schema({  sysName:{type:String},createTime:{type:Date}})
let actionSchema=new schema({  action:{type:String},createTime:{type:Date}})
let targetTypeSchema=new schema({  targetType:{type:String},createTime:{type:Date}})


//实例化一个字典关系Schema
let Relationschema=new schema({
    //设置信息的数据格式
    //行为所在的系统名称（二级域名名称，如wx、lubo、order等）
    sysName:{type:String},
    //发起行为的用户UID
    userIdentifier:{type:String},
    //行为操作，可以理解为Event事件类型
    action:{type:String},
    //事物类型
    targetType:{type:String},
    //事物ID
    targetID:{type:String},
    //备注
    extraInfo:{type:String},
    //事物的归属用户ID（代操作时适用，比如后台管理员的操作）
    targetOwnerIdentifier:{type:String},
    //请求的原始req头信息
    sourceHeaders:{type:String},
    //事件的时间
    time:{type:Date},
    isProduction:{type:Number},
    //日志创建时间
    createTime:{type:Date}

})
let PanLogSchema=new schema(
    {
        //设置信息的数据格式
        //行为所在的系统名称（二级域名名称，如wx、lubo、order等）
        sysName:{type:String},
        //发起行为的用户UID
        userIdentifier:{type:String},
        //行为操作，可以理解为Event事件类型
        action:{type:String},
        //事物类型
        targetType:{type:String},
        //事物ID
        targetID:{type:String},
        //备注
        extraInfo:{type:String},
        //事物的归属用户ID（代操作时适用，比如后台管理员的操作）
        targetOwnerIdentifier:{type:String},
        //请求的原始req头信息
        sourceHeaders:{type:String},
        //事件的时间
        time:{type:Date},
        isProduction:{type:Number},
        //日志创建时间
        createTime:{type:Date}
    },

    {
        versionKey:false
    }
)

let PanLog=mongoose.model('vlog',PanLogSchema)
let sysNamedic=mongoose.model('sysNamedic',sysNameSchema)
let actiondic=mongoose.model('actiondic',actionSchema)
let targetTypedic=mongoose.model('targetTypedic',targetTypeSchema)
let vLogRelations=mongoose.model('vLogRelation',Relationschema)


//将PanLog的model导出
module.exports.vLog=PanLog
module.exports.vLogRelations=vLogRelations
module.exports.sysNamedic=sysNamedic
module.exports.actiondic=actiondic
module.exports.targetTypedic=targetTypedic
