var userList = new ListUser();
var validation = new Validation();

function getUserList() {
    userList.getList()
        .then(function (response) {
            displayTable(response.data);
            userList.userArray = response.data;
        })
        .catch(function (error) {
            displayTable(error);
        });
}
getUserList();

function displayTable(userArray) {
    var content = "";
    userArray.map(function (item, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteUser('${item.id}');">Xoá</button>
                    <button class="btn btn-info" onclick="getDetails('${item.id}');" data-toggle="modal" data-target="#myModal">Xem</button>

                </td>
            </tr>
        `;
    })
    document.querySelector("#tblDanhSachNguoiDung").innerHTML = content;
}

function addUser() {
    var tk = document.querySelector("#TaiKhoan").value;
    var ten = document.querySelector("#HoTen").value;
    var pass = document.querySelector("#MatKhau").value;
    var mail = document.querySelector("#Email").value;
    var type = document.querySelector("#loaiNguoiDung").value;
    var nn = document.querySelector("#loaiNgonNgu").value;
    var desc = document.querySelector("#MoTa").value;
    var hinh = document.querySelector("#HinhAnh").value;
    console.log(tk, ten, pass, mail, type, nn, desc, hinh);

    // VALIDATION
    var isValid = true;

    // Check tai khoan
    isValid &= validation.checkEmpty(tk, "tbTaiKhoan", "Tài khoản không được để trống!") && validation.checkOverlap(tk, "tbTaiKhoan", "Tài khoản không được trùng!", userList.userArray);

    // Check name
    isValid &= validation.checkEmpty(ten, "tbHoTen", "Tên không được để trống!") && validation.checkName(ten, "tbHoTen", "Tên phải là ký tự chữ!");

    // Check email
    isValid &= validation.checkEmpty(mail, "tbEmail", "Email không được để trống!") && validation.checkEmail(mail, "tbEmail", "Email không đúng định dạng!");

    // Check pass
    isValid &= validation.checkEmpty(pass, "tbPass", "Pass không được để trống!") && validation.checkPass(pass, "tbPass", "Mật khẩu không đúng định dạng!");

    // Check image
    isValid &= validation.checkEmpty(hinh, "tbImage", "Hình ảnh không được để trống!");

    // Check loại người dùng
    isValid &= validation.checkDropdown("loaiNguoiDung", "tbType", "Hãy chọn người dùng!");

    // Check ngôn ngữ
    isValid &= validation.checkDropdown("loaiNgonNgu", "tbLanguage", "Hãy chọn ngôn ngữ!");

    // Check mô tả
    isValid &= validation.checkEmpty(desc, "tbDesc", "Mô tả không được để trống!") && validation.textLength(desc, "tbDesc", "Dưới 60 ký tự!", 60);

    if (isValid) {
        document.querySelectorAll('.sp-thongbao').forEach(function (el) {
            el.style.display = 'none';
        });
        var user = new User(tk, ten, pass, mail, type, nn, desc, hinh);
        console.table(user);
        userList.add(user)
            .then(function (response) {
                // success
                console.log(response.data);
                getUserList();
                document.querySelector("#myModal .close").click();

            })
            .catch(function (error) {
                // fail
                console.log(error);

            });
    } else {
        console.log(document.getElementsByClassName("sp-thongbao"));
        document.querySelectorAll('.sp-thongbao').forEach(function (el) {
            el.style.display = 'block';
        });
    }
}

document.querySelector("#btnThemNguoiDung").addEventListener("click", function () {
    document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="addUser();">Thêm người dùng</button>
    `;
});

function getDetails(id) {
    userList.getDetail(id)
        .then(function (response) {
            console.log(response.data);
            document.querySelector("#TaiKhoan").value = response.data.taiKhoan;
            document.querySelector("#HoTen").value = response.data.hoTen;
            document.querySelector("#MatKhau").value = response.data.matKhau;
            document.querySelector("#Email").value = response.data.email;
            document.querySelector("#loaiNguoiDung").value = response.data.loaiND;
            document.querySelector("#loaiNgonNgu").value = response.data.ngonNgu;
            document.querySelector("#MoTa").value = response.data.moTa;
            document.querySelector("#HinhAnh").value = response.data.hinhAnh;

            document.querySelector(".modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="updateUser('${response.data.id}');">Cập nhật</button>
        `;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateUser(id) {
    var tk = document.querySelector("#TaiKhoan").value;
    var ten = document.querySelector("#HoTen").value;
    var pass = document.querySelector("#MatKhau").value;
    var mail = document.querySelector("#Email").value;
    var type = document.querySelector("#loaiNguoiDung").value;
    var nn = document.querySelector("#loaiNgonNgu").value;
    var desc = document.querySelector("#MoTa").value;
    var hinh = document.querySelector("#HinhAnh").value;
    console.log(tk, ten, pass, mail, type, nn, desc, hinh);

    // VALIDATION
    var isValid = true;

    // Check tai khoan
    isValid &= validation.checkEmpty(tk, "tbTaiKhoan", "Tài khoản không được để trống!") && validation.checkOverlap(tk, "tbTaiKhoan", "Tài khoản không được trùng!", userList.userArray);

    // Check name
    isValid &= validation.checkEmpty(ten, "tbHoTen", "Tên không được để trống!") && validation.checkName(ten, "tbHoTen", "Tên phải là ký tự chữ!");

    // Check email
    isValid &= validation.checkEmpty(mail, "tbEmail", "Email không được để trống!") && validation.checkEmail(mail, "tbEmail", "Email không đúng định dạng!");

    // Check pass
    isValid &= validation.checkEmpty(pass, "tbPass", "Pass không được để trống!") && validation.checkPass(pass, "tbPass", "Mật khẩu không đúng định dạng!");

    // Check image
    isValid &= validation.checkEmpty(hinh, "tbImage", "Hình ảnh không được để trống!");

    // Check loại người dùng
    isValid &= validation.checkDropdown("loaiNguoiDung", "tbType", "Hãy chọn người dùng!");

    // Check ngôn ngữ
    isValid &= validation.checkDropdown("loaiNgonNgu", "tbLanguage", "Hãy chọn ngôn ngữ!");

    // Check mô tả
    isValid &= validation.checkEmpty(desc, "tbDesc", "Mô tả không được để trống!") && validation.textLength(desc, "tbDesc", "Dưới 60 ký tự!", 60);

    if (isValid) {
        document.querySelectorAll('.sp-thongbao').forEach(function (el) {
            el.style.display = 'none';
        });
        var user = new User(tk, ten, pass, mail, type, nn, desc, hinh);
        console.table(user);
        userList.update(user, id)
            .then(function (response) {
                // success
                console.log(response.data);
                getUserList();
                document.querySelector("#myModal .close").click();

            })
            .catch(function (error) {
                // fail
                console.log(error);

            });
    } else {
        console.log(document.getElementsByClassName("sp-thongbao"));
        document.querySelectorAll('.sp-thongbao').forEach(function (el) {
            el.style.display = 'block';
        });
    }
}

function deleteUser(id) {
    userList.delete(id)
        .then(function (response) {
            console.log(response.data);
            getUserList();
        })
        .catch(function (error) {
            console.log(error);
        })
}