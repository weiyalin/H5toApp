let login = localStorage.getItem("login");
let lastsend = localStorage.getItem("lastsend");
let ukey  = localStorage.getItem("ukey");

if (login && lastsend && ukey) {
    $.post( realmName + 'sf_zhzf/m/user/login',{
        login   : login,
        imei    : plus.device.imei,
        lastsend: lastsend,
        ukey    : ukey
    },function(data,status){
        if(data.statusCode == 200){
            window.location.href = "./html/main.html";
        }else{
            //TODO::自动登录错误
            // alert(data.message);
        }
    });
}

// window.location.href = "./html/main.html";