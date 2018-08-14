$(document).ready(function(){
    $("#submit").click(function(){

        var name = $.trim($("#name").val());
        var password = $.trim($("#password").val());
        var imei = plus.device.imei;

        $.post(realmName + 'sf_zhzf/m/user/login',{
            login : name,
            pwd   : password,
            imei  : imei
        },function(data,status){
            if(data.statusCode == 200){
                localStorage.setItem("login", data.login);
                localStorage.setItem("imei", data.imei);

                window.location.href = "./html/main.html";
            }else{
                alert(data.message);
            }
        });
    });
});