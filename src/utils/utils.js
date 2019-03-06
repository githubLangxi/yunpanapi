import {keys, indexOf} from 'lodash';
import moment from 'moment';


export const pickRandomItem =(alist, pickNum)=> {
    let result = []
    let resultTurns = []
    if (alist.length === pickNum) {
        return [...alist]
    }
    for (let i = 0; i < pickNum; i++) {
        let turn = Math.floor(Math.random() * alist.length)
        while (indexOf(resultTurns, turn) === -1) {
            resultTurns.push(turn)
            result.push(alist[turn])
        }
    }
    return result
}

export const generateNonceString = function(length){
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var maxPos = chars.length;
	var noceStr = "";
	for (var i = 0; i < (length || 32); i++) {
		noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return noceStr;
}

function checkTime(i){ //将0-9的数字前面加上0，例1变为01
    if(i<10)
    {
        i = "0" + i;
    }
    return i;
}

export const hashcode = (str) => {
    let hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}


export const formatRemainTime = (leftMiSecond)=> {
    let days = parseInt(leftMiSecond / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    let hours = parseInt(leftMiSecond / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    let minutes = parseInt(leftMiSecond / 1000 / 60 % 60, 10);//计算剩余的分钟
    let seconds = parseInt(leftMiSecond / 1000 % 60, 10);//计算剩余的秒数
    days = checkTime(days);
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    return (days > 0 ? (days + "天") : '') + (hours > 0 ? (hours + "小时") : "") + (minutes > 0 ? (minutes + "分") : '') + seconds + "秒"
}

export const delayRun = (fun, ms, errerhandle)=> {
    setTimeout(async ()=> {
        try {
            await fun();
        } catch (err) {
            if (errerhandle)
                errerhandle(err);
            else {
                console.error("error in delayRun:");
                console.error(err);
            }
        }
    }, ms);
}

export const getCookie = (name) => {
    if(typeof document !=="object"){
        return null;
    }
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

export const setCookie =(name,value)=> {
    if(typeof document !=="object"){
        return
    }
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export const formatISODate = (date) => {
    let dateFor = new Date(date);
    return dateFor.getFullYear() + '-' + _add0IfLess10((dateFor.getMonth() + 1)) + '-' + _add0IfLess10(dateFor.getDate()) + ' ' + _add0IfLess10(dateFor.getHours()) + ':' + _add0IfLess10(dateFor.getMinutes()) + ':' + _add0IfLess10(dateFor.getSeconds())
}
export const _add0IfLess10  = (time)=>{
    if(parseInt(time) < 10){
        return `0${time}`
    }
    else{
        return time
    }
}

export const getCode = ({s, num = 2}) => {
    return `${s ? s : ''}${moment().format('YYMMDD')}${randomWord(false, num)}`
};
export const randomWord = (randomFlag, min, max, isnumber) => {
    var str = '',
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var s = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    var s1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (isnumber) {
        s = s1
    }
    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min
    }
    for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (s.length - 1))
        str += s[pos]
    }
    return str
};

export const getOrderCode=()=>{
   return getCode({
        s: 'D',
        num: 6
    })
};


