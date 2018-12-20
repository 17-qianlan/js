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



/*function setItem(key,json) {
    let currentTime = new Date().getTime();
    window.localStorage.setItem(key, JSON.stringify({
        username: json.username,
        token: json.token,
        time: currentTime
    }));
}

function getItem(key,expire) {
    let nowTime = new Date().getTime();
    let data = JSON.parse(window.localStorage.getItem(key));
    let val = '';
    if (nowTime - data.time >= expire) {
        window.localStorage.removeItem(key);
    } else {
        val = data.username;
        window.localStorage.setItem(key,JSON.stringify({
            username: data.username,
            token: data.token,
            time: nowTime
        }))
    }
    return val;
}

setItem('user', {
    username: '1111',
    token: '66666'
});

let storage = getItem('user', 10000);
console.log(storage);

*/


export default {
    getItem(key, expire) {
        // key   存入浏览器的键名  类型为字符串
        // expire  单位是小时   类型为数字
        let data = JSON.parse(window.localStorage.getItem(key));
        if (!data) return false;
        let nowTime = new Date().getTime();
        expire = expire * 1e3 * 60 * 60;
        let val = '';
        if (nowTime - data.time >= expire) {
            window.localStorage.removeItem(key);
        } else {
            val = data.username;
            window.localStorage.setItem(key, JSON.stringify({
                token: data.token,
                username: data.username,
                time: nowTime
            }));
        }
        return val;
    },
    setItem(key, json) {
        // key  类型为字符串
        // json 必须是对象{}
        let currentTime = new Date().getTime();
        window.localStorage.setItem(key, JSON.stringify({
            token: json.token,
            username: json.username,
            time: currentTime
        }));
    },
    removerItem(key) {
        // key  类型为字符串
        window.localStorage.removeItem(key);
    }
};
