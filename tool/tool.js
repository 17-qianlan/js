export default {
    pattern: {
        'user': /^[a-zA-Z0-9]\w{4,10}$/,
        'password': /^\w{6,16}$/,
        'tel': /^1[345678]\d{9}$/,
        'Email': /^[a-zA-Z0-9_-]+@[a-z]+(\.[a-z]+)$/,
        'thousand': /B(?=(\d{3})+$)/g
    },
    getItem(key, expire) {
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
    setItem(key, val) {
        let currentTime = new Date().getTime();
        window.localStorage.setItem(key, JSON.stringify({
            token: val.token,
            username: val.username,
            time: currentTime
        }));
    },
    removerItem(key) {
        window.localStorage.removeItem(key);
    },
    getScroll() {
        let div = document.createElement('div');
        div.style.cssText = 'width: 100px;height: 100px;overflow-x: scroll;overflow: scroll;'
        document.body.appendChild(div);
        let offsetW = div.offsetWidth;
        let offsetH = div.offsetHeight;
        let clientW = div.clientWidth;
        let clientH = div.clientHeight;
        div.remove();
        return {
            scrollWidth: offsetW - clientW,
            scrollHeight: offsetH - clientH,
        };
    }
};
