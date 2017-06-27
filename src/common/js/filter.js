// 数字超过9显示省略号
export const num_filter = val =>{
	val = val - 0 ;
     if (val > 9 ) {
     	return "9+"
     }else{
      return val;
     }
}

// 前置货币符号
export const currency = val =>{
	return '￥' + val;
}

//日期格式转换
export const dateStyle  = time =>{
    time-=0;
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = trans(m);
    d = trans(d);
    return y +'-' + m + "-" + d ;
}
//时间日期格式转换
export const timeStyle  = time =>{
    time -= 0;
    var newDate = new Date(time);
    let {h,m,s}={h:newDate.getHours(),m:newDate.getMinutes(),s:newDate.getSeconds()};
    h = trans(h);
    m = trans(m);
    s = trans(s);
    return h +':' + m ;
}

// 日期格式转成中文
export const dateStyleCh  = time =>{
    time -= 0;
    time *= 1000 
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = trans(m);
    d = trans(d);
    return `${y}年${m}月${d}号` ;
}

// 带点日期格式
export const dateStylePoint  = time =>{
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = trans(m);
    d = trans(d);
    return `${y}.${m}.${d}` ;
}


// 时间格式转换成中文
export const timeStyleCh  = time =>{
    time -= 0;
    let {d,h,m,s}={d:parseInt(time/(24*3600)),h:parseInt(time/3600%24),m:parseInt(time/60%60),s:parseInt(time%60)};
    if (d===0) {
      d="";
    }else{
      d+="天";
    }
    h = trans(h);
    m = trans(m);
    s = trans(s);
    return d + h +'小时' + m + "分" + s + "秒" ;
}

function trans (val){
    if (val < 10) {
      val = "0" + val ;
    }
    return val ;
};
// 时间大于一个小时显示多少小时前
 export const timeTrans  = time =>{
        time-=0;
        var date = new Date(time);
         let {hh,mm} = {hh:date.getHours(),mm:date.getMinutes()};
         var newDate = new Date(time);
         let {h,m} = {h:newDate.getHours(),m:newDate.getMinutes()};
           h=hh-h;
           m = mm -m ;
           if (h >= 1) {
            return `${h}小时前`
           }else{
            return m + '分钟前'
           }
}

// 倒计时
export const countdown = time =>{
    time -= 0 ;
    let {d,h,m,s}={d:parseInt(time/(24*3600)),h:parseInt(time/3600%24),m:parseInt(time/60%60),s:parseInt(time%60)};
    h = trans(h);
    m = trans(m);
    s = trans(s);
    if (d===0) {
      return `${h}:${m}:${s}` ;
    }else{
      return d ;
    }
}