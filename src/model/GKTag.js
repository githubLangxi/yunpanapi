import {vLog,actiondic,targetTypedic,sysNamedic,vLogRelations} from '/src/tables/panmongoose';
var mongoose=require('mongoose')
import _ from 'lodash'
import { ObjectId } from 'bson';

class GKTag {
    constructor() {
        throw '静态业务功能类无法实例化'
    }
    static async savevLogRelationsdic({action,userID,sysName,targetType,targetID,comment,targetOwnerUID,sourceHeaders}) {
        setImmediate(async()=>{
            //sysName
            //action
            //targetType
            let newvLogRelations = new vLogRelations({
                //设置信息的数据格式
                //行为所在的系统名称（二级域名名称，如wx、lubo、order等）
                sysName:sysName,
                //发起行为的用户UID
                userID:userID,
                //行为操作，可以理解为Event事件类型
                action:action,
                //事物类型
                targetType:targetType,
                //事物ID
                targetID:targetID,
                //备注
                comment:comment,
                //事物的归属用户ID（代操作时适用，比如后台管理员的操作）
                targetOwnerUID:targetOwnerUID,
                //请求的原始req头信息
                sourceHeaders:sourceHeaders,
                //事件的时间
                time:new Date(),

                //日志创建时间
                createTime: new Date()
            })
            //对实例化的内容进行保存
            let result = await newvLogRelations.save()
            console.log(result);
            let success = (result !== null)
        })
        return {success:true}

    }
    static async deletevLogRelationsdic({id}) {
        setImmediate(async()=>{
            //sysName
            //action
            //targetType
            console.log(id);
            let deleterelations= await vLogRelations.findByIdAndRemove(mongoose.Types.ObjectId(id))
            console.log(deleterelations);
            let success = (deleterelations !== null)
        })
        return {success:true}

    }


    static async queryactiondics({pagesize=30,pageindex=0}) {
        let limit=pagesize;
        let skip=pagesize*pageindex;
        let result = await actiondic.find({}).limit(limit).skip(skip);
        console.log(result)
        return {data: result}
    }
    static async saveactiondic({action}) {
       await actiondic.remove({});
        let actionlist=action.split('|');
      let result=await   _.forEach(  actionlist,async (value)=>{
          console.log(value)
            let newactiondic = new actiondic({

              //行为操作，可以理解为Event事件类型
              action: value,

              //日志创建时间
              createTime: new Date()
          })
          //对实例化的内容进行保存
          let  result = await newactiondic.save()
          console.log(result);
          return result;

        })
        console.log(result);

        let success = (result !== null)
        return {success}

    }
    static async querytargetTypedics({pagesize=30,pageindex=0}) {
        let limit=pagesize;
        let skip=pagesize*pageindex;
        let result = await targetTypedic.find({}).limit(limit).skip(skip);
        console.log(result)
        return {data: result}

    }
    static async savetargetTypedic({targetType}) {
        await targetTypedic.remove({});
        let targetTypelist=targetType.split('|');
        let result=await   _.forEach(  targetTypelist,async (value)=>{
            console.log(value)
            let newtargetTypedic = new targetTypedic({
                //行为操作，可以理解为Event事件类型
                targetType: targetType,

                //日志创建时间
                createTime: new Date()
            })
            //对实例化的内容进行保存
            let  result = await newtargetTypedic.save()
            console.log(result);
            return result;

        })
        console.log(result);

        let success = (result !== null)
        return {success}

    }
    static async querysysNamedics({pagesize=30,pageindex=0}) {
        let limit=pagesize;
        let skip=pagesize*pageindex;
        let result = await sysNamedic.find({}).limit(limit).skip(skip);
        console.log(result)
        return {data: result}

    }
    static async savesysNamedic({sysName}) {
        await sysNamedic.remove({});
        let sysNamelist=sysName.split('|');
        let result=await   _.forEach(  sysNamelist,async (value)=>{
            console.log(value)
            let newtargetTypedic = new sysNamedic({
                //行为操作，可以理解为Event事件类型
                sysName: sysName,

                //日志创建时间
                createTime: new Date()
            })
            //对实例化的内容进行保存
            let  result = await newtargetTypedic.save()
            console.log(result);
            return result;

        })
        console.log(result);

        let success = (result !== null)
        return {success}

    }

    /**
     *
     * @param sysName
     * @param userID
     * @param action
     * @param targetType
     * @param targetID
     * @param targetOwnerUID
     * @param res
     * @returns {Promise<{data: *}>}
     */
    static async queryvLogs({duration,isProduction,sysName, userID, action, targetType, targetID, targetOwnerUID, pageindex=0,pagesize=30,starttime,endtime}) {

        let limit=pagesize;
        let skip=pagesize*pageindex;
        let fileter = {}
        if(isProduction){
            fileter.isProduction=isProduction;
        }
        if (sysName) {
            fileter.sysName = sysName;
        }
        if (userID) {
            fileter.userID = userID;
        }
        if (action) {
            fileter.action = action;
        }
        if (targetType) {
            fileter.targetType = targetType;
        }
        if (targetID) {
            fileter.targetID = targetID;
        }
        if (targetOwnerUID) {
            fileter.targetOwnerUID = targetOwnerUID;
        }
        fileter.time={$gte: new Date(starttime), $lt:new Date(endtime)}
        let group={}

        if(duration=="日")
        {
            group={ _id: {month:"$month",year:"$year",day:"$day"},count:{ $sum: 1 }}
        }
        else if(duration=="月")
        {
            group={ _id: {month:"$month",year:"$year"},count:{ $sum: 1 }}
        }else {
            group = {_id: {year: "$year"}, count: {$sum: 1}}
        }
        let result1=await  vLog.aggregate([
            {$match: fileter},
            // {$group: {: "$", total: {$sum: "$num"}}}
            {
                $project:
                    {
                        year: { $year: "$time" },
                        month: { $month: "$time" },
                        day: { $dayOfMonth: "$time" }
                    }
            }


        ]).group(group)
        console.log("result1"+JSON.stringify(result1));

        let result2 = await vLog.find(fileter).limit(limit).skip(skip);
        console.log("result2"+JSON.stringify(result2));
        return {data: {report:result1,list:result2}}
    }
    static async savevLog({isProduction,sysName, sourceHeaders, userIdentifier, action, targetType, targetID, extraInfo, time,targetOwnerIdentifier}) {
        setImmediate(async()=>{
            //sysName
            //action
            //targetType
            let newvLog = new vLog({
                //行为所在的系统名称（二级域名名称，如wx、lubo、order等）
                sysName: sysName,
                //发起行为的用户UID
                userIdentifier: userIdentifier,
                //行为操作，可以理解为Event事件类型
                action: action,
                //事物类型
                targetType: targetType,
                //事物ID
                targetID: targetID,
                //备注
                extraInfo: extraInfo,
                //事物的归属用户ID（代操作时适用，比如后台管理员的操作）
                targetOwnerIdentifier: targetOwnerIdentifier,
                //请求的原始req头信息
                sourceHeaders: JSON.stringify(sourceHeaders),
                time:new Date(time),
                isProduction:isProduction,
                //日志创建时间
                createTime: new Date()
            })
            let fileter = {}
            if (sysName) {
                fileter.sysName = sysName;
            }
            if (action) {
                fileter.action = action;
            }
            if (targetType) {
                fileter.targetType = targetType;
            }

            let filterresult = await vLogRelations.find(fileter);
            //if(filterresult && filterresult.length>0) {
                //对实例化的内容进行保存
                let result = await newvLog.save()
                let success = (result !== null)
           // }
        })
        return {success:true}
    }
    static async hello({name}) {
        return {name, age: 123}
    }
}

export default GKTag