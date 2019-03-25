var mongoose=require('mongoose')

import DB_URL1 from './../config'
//数据库连接地址  链接到myStudent数据库
var DB_URL=DB_URL1.DB_URL;
//var DB_URL='mongodb://panlog:panlog1221@10.9.106.10:27017/panLog'
//var DB_URL='mongodb://panlog:panlog1221@10.9.107.130:27017/panLog'


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
    action:{type:String, unique: true},
    //事物类型
    targetType:{type:String, unique: true},
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
let fileSchema=new schema(
    {
        //上传人
        uid :{type:String, default: ''},
        //0-试卷，讲义，学案，教案
        type :{type:Number, default: 0},
//隶属于某个专属类目的，例如《教材一加一》，例如是来自某本书的课件
        father  :{type:schema.Types.ObjectId,ref: 'menu'},
        // 0-公开，1-私有仅限老师自己使用
        private:{type:Number, default: 0},

      //  title :{type:String, default: '',   unique: true},
        //标记的标题(默认为文件原始文件名)
        title :{type:String, default: ''},
        //文件大小，单位：字节
        filesize :{type:String, default: ''},
        //文件名原始名字
        filename :{type:String, default: ''},
        //文件类型：0未知，1-DOC，2-PPT，3-PDF，4-ZIP，5-图片，
        filetype :{type:Number, default: 0},
        //浏览次数
        viewed  :{type:Number, default: 0},
        //下载次数
        downloaded   :{type:Number, default: 0},
        //浏览次数
        shared   :{type:Number, default: 0},
        //缩略图
        thumb  :{type:String, default: ''},
        //版本：人教版/沪教版
        version  :{type:String, default: ''},
        //年级
        grade   :{type:String, default: ''},
        //科目
        subject   :{type:String, default: ''},


        Remarks:{type:String},

        //更新时间
        updated  :{type:Date},
        //上传时间
        createTime:{type:Date,default:new Date()}
    },

    {
        versionKey:false
    }
)

//文档菜单Schema
let entitychema=new schema({
    parentMenuId:{type:schema.Types.ObjectId},
    name:{type:String},

    icon:{type:String},

    alias:{type:String},

    state:{type:String},
    sort:{type:Number},
    value:{type:String},

    type:{type:String},
    Remarks:{type:String},
    discription:{type:String},

    createUserId:{type:Number},
    //事件的时间
    time:{type:Date},

    //日志创建时间
    createTime:{type:Date}

})
let Menuschema=new schema({

    childs:[{type: schema.Types.ObjectId, ref: 'menu'}],

    entity:{type:entitychema},
    Remarks:{type:String},
    //日志创建时间
    createTime:{type:Date}

})
let PanLogSchema=new schema(
    {
        //设置信息的数据格式
        //行为所在的系统名称（二级域名名称，如wx、lubo、order等）
        sysName:{type:String, default: ''},
        //发起行为的用户UID
        userIdentifier:{type:String,default: ''},
        //行为操作，可以理解为Event事件类型
        action:{type:String,default: ''},
        //事物类型
        targetType:{type:String,default: ''},
        //事物ID
        targetID:{type:String,default: ''},
        //备注
        extraInfo:{type:Object,default: {}},
        //事物的归属用户ID（代操作时适用，比如后台管理员的操作）
        targetOwnerIdentifier:{type:String,default: ''},
        //请求的原始req头信息
        sourceHeaders:{type:Object,default: ''},
        //事件的时间
        time:{type:Date},
        isProduction:{type:Number,default: 1},
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
let menu=mongoose.model('menu',Menuschema)
let file=mongoose.model('file',fileSchema)


//将PanLog的model导出

module.exports.file=file
module.exports.menu=menu
module.exports.vLog=PanLog
module.exports.vLogRelations=vLogRelations
module.exports.sysNamedic=sysNamedic
module.exports.actiondic=actiondic
module.exports.targetTypedic=targetTypedic
