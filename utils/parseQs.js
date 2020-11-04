export const parseQueryString = url => {
    var urlKey = url.split("?")[1]
    var objKeyValue ={}
    if(urlKey){
        var urlObj = urlKey.split("&")
        // 以对象形式存放
        for(var i = 0; i<urlObj.length;i++){
            objKeyValue[urlObj[i].split("=")[0]] = urlObj[i].split("=")[1]
        }
        return objKeyValue
    }
}