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
    alert( text+result );
}
function startRecognize() {
    scan = new plus.barcode.Barcode('bcid');
    scan.onmarked = onmarked;
    scan.start();
}
function closeScan() {
    scan.close();
}


