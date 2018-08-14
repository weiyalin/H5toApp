let login = localStorage.getItem("login");
let imei  = localStorage.getItem("imei");
if (temp && imei) {
    $.post( realmName + 'sf_zhzf/m/user/login',{
        login : login,
        imei  : imei
    },function(data,status){
        if(data.statusCode == 200){
            window.location.href = "./html/main.html";
        }else{
            alert(data.message);
        }
    });
}

// window.location.href = "./html/main.html";