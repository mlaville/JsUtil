/**
 * XHR Factory, use simple factory patten
 * It handle ajax create, request, send and etc
 * Written by liufeng cheng 
 * date: 2014/7/10
 * call example:
   window.onload = function(){
	    var xhrFactory = new XhrFactory();
	    var callback = {
	        success:function(responseText,responseXML){alert("Success:" + responseXML);},
	        failure:function(statusCode){alert("Failure" + statusCode);}
	    };
	    myHandler.request('GET','innerHTML.xml',callback);
	};
 */
var XhrFactory = function(){};

XhrFactory.prototype = {
	//ajax create，request，send and etc
    request:function(method,url,callback,postVars){
        var xhr = this.createXhrObject();
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4) return;
            (xhr.status == 200) ? 
            callback.success(xhr.responseText,xhr.responseXML):
            callback.failure(xhr.status);
        };
        xhr.open(method,url,true);
        if(method != "POST") postVars = null;
        xhr.send(postVars);
    },
    // return a xhr object in different case
    createXhrObject:function(){
        var methods = [
            function(){return new XMLHttpRequest();},
            function(){return new ActiveXObject('Msxml2.XMLHttp');},
            function(){return new ActiveXObject('Microsoft.XMLHttp');}
        ];
        for(var i = 0; i < 3; i++){
            try{
                methods[i]();
            }catch(e){
                continue;
            }
            this.createXhrObject = methods[i]();
            return methods[i]();
        }
        throw new Error("Error!");
    }
}