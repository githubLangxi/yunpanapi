import request from 'request'
import Promise from 'bluebird';

Promise.promisifyAll(request);

let filelist = []

const _timer = setInterval(async()=>{
    if(filelist.length>0) {
        console.log('items need resend . '+ filelist.length)
        for (let i = 0; i < filelist.length; i++) {
            let item = filelist.shift()
            if (item) {
                send(item).then()
            }
        }
    }
},1000);

export const send = async ({sysName, sourceHeaders, userID, action, targetType, time='2019-09-08', targetID, comment, targetOwnerUID}) => {
    try {
        //发送流水
        let uri = "https://vlog.api.gankao.com/gktag/savevLog";
        let req_options = {
            uri,
            rejectUnauthorized: false,
            headers: {},
            body: {sysName, sourceHeaders, userID, action, targetType, time, targetID, comment, targetOwnerUID},
            json: true,
        }
        let {body} = await request.postAsync(req_options)
        let {err, result} = body
        console.log(body);
        if (true && err) {
            filelist.push({
                sysName,
                sourceHeaders,
                userID,
                action,
                targetType,
                time,
                targetID,
                comment,
                targetOwnerUID
            });
        }
    } catch (ex) {
        return false;
    }
}


send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();

send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:""}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
send({sysName:"",time:"2019-01-09"}).then();
