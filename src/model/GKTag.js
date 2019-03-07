import {vLog,actiondic,targetTypedic,sysNamedic} from '/src/tables/panmongoose';
import _ from 'lodash'

class GKTag {
    constructor() {
        throw '静态业务功能类无法实例化'
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
    static async queryvLogs({sysName, userID, action, targetType, targetID, targetOwnerUID, pageindex=0,pagesize=30}) {
        let limit=pagesize;
        let skip=pagesize*pageindex;
        let fileter = {}
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
        let result = await vLog.find(fileter).limit(limit).skip(skip);
        console.log(result)
        return {data: result}
    }

    static async savevLog({sysName, sourceHeaders, userID, action, targetType, targetID, comment, time,targetOwnerUID}) {
        //sysName
        //action
        //targetType
        let newvLog = new vLog({
            //行为所在的系统名称（二级域名名称，如wx、lubo、order等）
            sysName: sysName,
            //发起行为的用户UID
            userID: userID,
            //行为操作，可以理解为Event事件类型
            action: action,
            //事物类型
            targetType: targetType,
            //事物ID
            targetID: targetID,
            //备注
            comment: comment,
            //事物的归属用户ID（代操作时适用，比如后台管理员的操作）
            targetOwnerUID: targetOwnerUID,
            //请求的原始req头信息
            sourceHeaders: JSON.stringify(sourceHeaders),
            time:new Date(time),
            //日志创建时间
            createTime: new Date()
        })
        //对实例化的内容进行保存
        let result = await newvLog.save()
        let success = (result !== null)
        return {success}
    }

    static async hello({name}) {
        return {name, age: 123}
    }
}

export default GKTag