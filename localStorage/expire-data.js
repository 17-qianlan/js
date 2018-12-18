// 不要把所有东西都暴露出去
// 设置过期时间,get里传入过期时间
// 然后和保存的时间比对,大于过期时间则提示过期,请重新保存

/*let time = new Date();
window.localStorage.setItem('111','cookie已存储');

setTimeout(() => {
    console.log(window.localStorage.getItem('111'));
    window.localStorage.removeItem('111');
    console.log(window.localStorage.getItem('111'));
},10000);*/



/*function set(key,val) {
    let currentTime = new Date().getTime();
    window.localStorage.setItem(key, JSON.stringify({val,time: currentTime}));
}

function get(key,expire) {
    let nowTime = new Date().getTime();
    let data = JSON.parse(window.localStorage.getItem(key));
    let val = '';
    if (nowTime - val.time >= expire) {
        window.localStorage.removeItem(key);
    } else {
        val = val.val;
        window.localStorage.setItem(key,JSON.stringify({val,time: nowTime}))
    }
    return val;
}*/

export default {
    get(key, expire) {
        let nowTime = new Date().getTime(); 
        let data = JSON.parse(window.localStorage.getItem(key));
        let val = '';
        if (nowTime - data.time >= expire) {
            window.localStorage.removeItem(key);
        } else {
            val = data.val;
            window.localStorage.setItem(key, JSON.stringify({
                key: val,
                time: nowTime
            }));
        }
        return val;
    },
    set(key, val) {
        let currentTime = new Date().getTime();
        window.localStorage.setItem(key, JSON.stringify({
            val,
            time: currentTime
        }));
    }
};
