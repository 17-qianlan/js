/*
*浅蓝    qlhdtly12189@163.com
* 201803
* */

(function(){
    //获取css计算后的样式
    function getStyle(obj,attr){
        return window.getComputedStyle?getComputedStyle(obj)[attr]:obj.currentStyle[attr];
    }

    function getB(obj,attr1,attr2){
        return (parseFloat(getStyle(obj,attr1))+parseFloat((getStyle(obj,attr2))));
    }
    //insetAfter: ->
    /*
    	在某一个元素插入
		ele : 在当前的元素节点后面插入 object
		eleType : 要插入的新元素    string
    */
    // prevNode : 上一个兄弟元素     对象节点

    //nextNode : 下一个兄弟元素      对象节点

    //toggleClass
    /*有就删除class,否则添加    20180618
    ele 元素    object
    CName 目标class类名   string
    */

    //ajax   Ajax(json)
    /*
    * Ajax({
    *   type : 发送方式   默认GET   string
    *   asny : 是否异步   默认false    boolean
    *   date : 数据
    *   dateType : 请求数据类型   默认json
    *   url  : 文件路径    string
    *   val  : 预设写入数据   json
    *   success : 成功的回调函数  function
    *   error  : 失败的回调函数   function
    *   返回response
    * })
     */

    //centerAuto
    /*居中     父级→子级
    需要传两个参数,父级和子级
    子级可以不设置绝对定位
     20180329
     fObj     对象(父节点)
     sObj     对象(子节点)
     兼容IE8
     margin和padding会有影响(border不影响结果)
     */

    //csstransform   20180331
    //要在JS内设置后再获取,否则获取不到
    var api = {
        insetAfter: function(ele,eleType){
            var parent = ele.parentNode,
                newEle = document.createElement(eleType);
            if( parent.children[parent.children.length-1] === ele ){
                parent.appendChild(newEle);
            }else{
                parent.insertBefore(newEle,ele.nextSibling||ele.nextElementSibling);
            }
            return this;
        },
        prevNode:function(ele){
            return ele.previousElementSibling || ele.previousSibling;
        },
        nextNode: function(ele){
            return ele.nextElementSibling || ele.nextSibling;
        },
        toggleClass: function (ele,cName){
            var arrName = ele.className.split(" "),
                targetName = cName.split(" ");
            var newArr = (function (arr){
                for (var i = arr.length-1; i >= 0; i--) {
                    var thisDate = arr[i];
                    var repeatIndex = arr.indexOf(thisDate),
                        repeatNum = 0;
                    while( repeatIndex !== -1 && repeatIndex !== i-repeatNum ){
                        arr.splice(repeatIndex,1);
                        repeatIndex = arr.indexOf(thisDate);
                        repeatNum++;
                    }
                    if( repeatNum ){
                        i -= repeatNum;
                        arr.splice(i,1);
                    }
                }
                return arr;
            })(arrName.concat(targetName));
            ele.className = newArr.join(" ");
        },
        Ajax: function (json){
            var type = json.type || "GET",
                asny = json.asny !== false,
                date = json.date,
                dateType = json.dateType || "json",
                url = json.url,
                val = "",
                success = json.success,
                error = json.error;
            if( date ){
                for( var key in json.date ) {
                    val += key + "=" + json.date[key] + "&";
                }
                if( type.toUpperCase() === "GET" ){
                    var d = new Date().getTime();
                    url = json.url +"?" + val +";"+ d;
                    val = null;
                }
            }
            var xhr;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHttp.6.0");
                }catch(e){
                    xhr = new ActiveXObject("Msxml2.XMLHttp.3.0");
                }
            }
            xhr.open(type,url,asny);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(val);
            xhr.onreadystatechange = function(){
                var response;
                if( this.readyState === 4 ){
                    if( this.status >=200 && this.status < 300 ){
                        if( dateType === "text" ){
                            response = this.responseText;
                        }else if( dateType === "json" ){
                            response = JSON.parse(this.responseText);
                        }else{
                            response = this.responseXML;
                        }
                        success&&success();
                        return response;
                    }else{
                        error&&error();
                    }
                }
            };
        },
        centerAuto: function (fObj,sObj){
            fObj.width = parseFloat(getStyle(fObj,"width"));
            fObj.height = parseFloat(getStyle(fObj,"height"));
            sObj.len = sObj.length;
            if( !sObj.len ){
                sObj.width  = parseFloat(getStyle(sObj,"width"));
                sObj.height = parseFloat(getStyle(sObj,"height"));
                sObj.style.position = "absolute";
                sObj.borderL = getB(sObj,"borderLeftWidth","borderRightWidth");
                sObj.borderT = getB(sObj,"borderTopWidth","borderBottomWidth");
                sObj.style.left = (fObj.width/2 - sObj.width/2 - sObj.borderL) + "px";
                sObj.style.top = (fObj.height/2 - sObj.height/2 - sObj.borderT) + "px";
            }else {
                for (var i = 0; i < sObj.len; i++) {
                    sObj.width = parseFloat(getStyle(sObj[i], "width"));
                    sObj.height = parseFloat(getStyle(sObj[i], "height"));
                    sObj.borderL = getB(sObj[i],"borderLeftWidth","borderRightWidth");
                    sObj.borderT = getB(sObj[i],"borderTopWidth","borderBottomWidth");
                    sObj[i].style.position = "absolute";
                    sObj[i].style.left = (fObj.width / 2 - sObj.width / 2 - sObj.borderL) + "px";
                    sObj[i].style.top = (fObj.height / 2 - sObj.height / 2 - sObj.borderT) + "px";
                }
            }
        },
        cssTransform: function (obj,attr,val){
            if( !obj.transform ){
                obj.transform = {};
            }
            if( arguments.length === 3 ){
                obj.transform[attr] = val;
                var str = "";
                for (var key in obj.transform) {
                    switch( key ){
                        case "rotate":
                        case "rotateY":
                        case "rotateX":
                            str = key + "("+ obj.transform[key] + "deg)";
                            break;
                        case "translate":
                        case "translateX":
                        case "translateY":
                            str = key + "(" + obj.transform[key] + "px)";
                            break;
                        case "scale":
                        case "scaleX":
                        case "scaleY":
                            str = key + "(" + obj.transform[key] +")";
                            break;
                    }
                    obj.style.transform = str;
                }
            }else{
                val = obj.transform[attr];
                if( typeof val === "undefined" ){
                    if( attr === "scale" || attr === "scaleX" || attr === "scaleY" ){
                        val = 1;
                    }else{
                        val = 0;
                    }
                }
                return val;
            }
        }
    };
    this.$$ = api;
})();



