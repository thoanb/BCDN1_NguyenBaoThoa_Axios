function Validation() {
    this.checkEmpty = function(inputval, spanID, message){
        console.log(inputval);
        if(inputval.trim() == "") {
            //Khong hop le
            document.getElementById(spanID).innerHTML = message;
            return false;
        }else {
            //Hop le
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }
    this.checkOverlap = function (inputval, spanID, message, array) {
        var isExist = false;
        console.log(array);
        isExist = array.some(function (item) {
            console.log(item.taiKhoan)
            return item.taiKhoan === inputval.trim();
        });
        
        if (isExist) {
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    this.checkName = function (inputval, spanID, message) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        
        if (pattern.test(inputval)) {
            //Hop le
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //Khong hop le
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    this.checkEmail = function (inputval, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (inputval.match(pattern)) {
            //Hop le
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //Khong hop le
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    this.checkDropdown = function (selID, spanID, message) {
        var optIndex = document.getElementById(selID).selectedIndex;

        if (optIndex!= 0) {
            //Hop le
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else {
            //Khong hop le
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    this.checkPass = function(inputval, spanID, message){
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if (inputval.match(pattern)) {
            //Hop le
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            //Khong hop le
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
    
    this.textLength = function(inputval, spanID, message, num){
        var str = inputval.trim();
        if(str.length <= num){
            //Hop le
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        else{
            //Khong hop le
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
}