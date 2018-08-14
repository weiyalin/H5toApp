/**
 * 拍照
 */
function captureImage(){
    var cmr = plus.camera.getCamera();
    var res = cmr.supportedImageResolutions[0];
    var fmt = cmr.supportedImageFormats[0];
    alert("Resolution: "+res+", Format: "+fmt);
    cmr.captureImage( function( path ){
        alert( "Capture image success: " + path );
    },
    function( error ) {

    },
    {
        resolution:res,format:fmt
    });
}

/**
 * 扫码
 */
var scan = null;
var execobjId = null;
function onmarked( type, result ) {
    var text = '未知: ';
    switch(type){
        case plus.barcode.QR:
            text = 'QR: ';
            break;
        case plus.barcode.EAN13:
            text = 'EAN13: ';
            break;
        case plus.barcode.EAN8:
            text = 'EAN8: ';
            break;
    }
    // alert( text+result );
    execobjId = result;
    $.post( realmName + 'sf_zhzf/msys/enterprise/qrcode',{
        code : result
    },function(data,status){
        //成功直接返回企业信息，失败时statusCode为300/310
        if(data.statusCode){    //失败
            alert(data.message);
        }else{                  //成功
            /*data = {"id":"201","regionCode":"开发区街道","objName":"XXX餐馆","busiAddr":"科隆大道与牧野路交叉口",
                    "localAddr":"XXX街道","fuzeren":"张三","fuzerenPhone":"13612341234",
                    "jianguanren":"李四","jiangguanPhone":"1232123131231","seatNum":"50","caotouNum":"4",
                    "guimo":"50","yyjhqNum":"4","statusCode":"200","message":"OK"}*/
            //TODO::展示得到的数据

        }
    });
}
function startRecognize() {
    scan == null && scan.close();
    scan = new plus.barcode.Barcode('bcid');
    scan.onmarked = onmarked;
    scan.start();
}
function closeScan() {
    scan.close();
}

/**
 * 得到清洗列表
 * @param pageNum   页数
 * @param numPerPage    每页显示多少条
 */
function getWashList(pageNum = 1,numPerPage = 15) {
    $.post( realmName + 'sf_zhzf/msys/cleanhist/list',{
        execobjId : execobjId,
        pageNum : pageNum,
        numPerPage : numPerPage
    },function(data,status){
        if(data.statusCode == 200){
            /*"list":[{"id":"1","execobjId":"121","imgurl":"http://wwww.xx.xx.com/img/12313.jpg",
            "status":"合格","cretime":"2018-06-19 18:12:34"}]*/
            let list = data.list;
            //TODO::展示清洗列表

        }else if(data.statusCode == 310){
            //登录超时
            localStorage.clear();
            window.location.href = "./index.html";
        }else{
            alert(data.message);
        }
    });
}

/**
 * 得到检查记录
 * @param pageNum   页数
 * @param numPerPage    每页显示多少条
 */
function getSuperviseList(pageNum = 1,numPerPage = 15) {
    $.post( realmName + 'sf_zhzf/msys/inspnotes/list',{
        execobjId : execobjId,
        pageNum : pageNum,
        numPerPage : numPerPage
    },function(data,status){
        if(data.statusCode == 200){
            /*"list":[{"id":"123","inspCode","302728","typeDesc":"餐饮油烟检查","inspDesc":"油烟净化器是否正常使用",
            "inspResult":"是","inspStatus":"符合要求","officerName":"xxx,xxxx"}]*/
            let list = data.list;
            //TODO::展示检查记录

        }else if(data.statusCode == 310){
            //登录超时
            localStorage.clear();
            window.location.href = "./index.html";
        }else{
            alert(data.message);
        }
    });
}

/**
 * 监管人员获取检查标准
 * @param inspType  固定值，后续确定
 */
function getStandardList(inspType) {
    //TODO::inspType待确定
    $.post( realmName + 'sf_zhzf/msys/inspstandard/list',{
        inspType : inspType
    },function(data,status){
        if(data.statusCode == 200){
            /*"list":[{"id":"123","inspCode","302728","inspType":"餐饮油烟检查","inspDesc":"油烟净化器是否正常使用",
            "replyOption":"是,否"}]*/
            let list = data.list;
            //TODO::根据list的结果列出问题
        }else if(data.statusCode == 310){
            //登录超时
            localStorage.clear();
            window.location.href = "./index.html";
        }else{
            alert(data.message);
        }
    });
}


/**
 * 监管人员提交检查记录
 */
function submitCheck() {
    //TODO::待确定!!!!!!!!!!!!!!!!
    let data = null;
    let inspCode = null;
    let inspResult = null;
    let inspStatus = null;
    let officerName = null;
    $.post( realmName + 'sf_zhzf/msys/inspnotes/add',{
        data : data,

        inspCode   : inspCode,
        inspResult : inspResult,
        inspStatus : inspStatus,
        officerName: officerName
    },function(data,status){
        if(data.statusCode == 200){
            //TODO::成功则跳转到检查记录页面
        }else if(data.statusCode == 310){
            //登录超时
            localStorage.clear();
            window.location.href = "./index.html";
        }else{
            alert(data.message);
        }
    });
}

/**
 * 监管人员获取消息列表
 * @param pageNum   页数
 * @param numPerPage    每页显示多少条
 */
function getNoticeList(pageNum = 1,numPerPage = 15) {
    $.post( realmName + 'sf_zhzf/msys/notice/list',{
        pageNum : pageNum,
        numPerPage : numPerPage
    },function(data,status){
        if(data.statusCode == 200){
            /*"list":[{"id":"123","title","油烟超期未清理","content":"XXXX餐馆，超过10天未提交清理信息",
            "msgStatus":"1","cretime":"2018-08-12 14:12:23"}]*/
            let list = data.list;
            //TODO::展示消息，没读过的有小红点

        }else if(data.statusCode == 310){
            //登录超时
            localStorage.clear();
            window.location.href = "./index.html";
        }else{
            alert(data.message);
        }
    });
}

/**
 * 监管人员更新消息状态
 * @param id 消息id
 */
function updateNoticeStatus(id) {
    $.post( realmName + 'sf_zhzf/msys/notice/reading',{
        id : id
    },function(data,status){
        if(data.statusCode == 200){
            //TODO::已阅读，将小红点去掉
        }else if(data.statusCode == 310){
            //登录超时
            localStorage.clear();
            window.location.href = "./index.html";
        }else{
            alert(data.message);
        }
    });
}

/**
 * 遗留的问题
 */
//TODO::现场检查：提交的参数问题

//TODO::我：公告
//TODO::我：系统设置：个人信息
//TODO::我：系统设置：密码修改

//TODO::缺少API