var url_Ajax = "Admin/"
var txtEmployeeIDVal = 0, EmployeeID = 0;
var grid_ListAll_Staff;
var ProvinceID = 0, DistrictID = 0;
var FullNameVN, CitizenID, Phone, BirthDay, HouseNumber, RoadName, LocationWardID, LocationDistrictId, LocationProvinceId, Email, HomeTownHouseNumber,
    HomeTownRoadName, HomeTownWardName, HomeTownDistrictName, HomeTownProvinceName

$(document).ready(function () {
    $('#checkErrorImageID').hide();
    $('#checkErrorMessageID').hide();

    $('#checkErrorImageName').hide();
    $('#checkErrorMessageName').hide();

    $('#checkErrorImageEmail').hide();
    $('#checkErrorMessageEmail').hide();

    $('#checkErrorImageCitizenID').hide();
    $('#checkErrorMessageCitizenID').hide();

    OpenOrCloseForm(0);
});
function OpenOrCloseForm(e) {
    if (e == 0) {
        $('#form-search').show();
        $('#form-detail').hide();
        $('#form-info').hide();

    }
    if (e == 1) {
        $('#form-detail').show();

    }
    if (e == 2) {
        $('#form-info').show();
        $('#form-search').hide();
        $('#form-detail').hide();
    }

}
function init_Grid_ListAll_Staff() {
    grid_ListAll_Staff = $("#grid_ListAll_Staff").kendoGrid({
        height: 500,
        scrollable: true,
        columns: [{
            field: "ID",
            title: "ID",
            width: 40,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "EmployeeID",
            title: "Mã nhân viên",
            width: 120,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "Name",
            title: "Họ và Tên",
            with: 150,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "Phone",
            title: "Số điện thoại",
            with: 120,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "CitizenID",
            title: "CMND",
            with: 120,
            attributes: { style: "text-align: left; font-size: 13px" }
        }, {
            field: "Location",
            title: "Địa chỉ",
            with: 240,
            attributes: { style: "text-align: left; font-size: 13px" }
        }, {
            command: { text: "Xem chi tiết", click: showDetails },
            title: " ",
            width: "100px"
        }, {
            command: {
                text: "Xoá", click: showDeleteQuestion
            },
            title: " ",
            width: "100px"
        }],
        dataSource: {
            data: [],
            pageSize: 5
        },
        pageable: {
            pageSizes: [5, 10, 20, 50, "all"],
            refresh: true
        }
    }).data("kendoGrid");

    wnd = $("#details")
        .kendoWindow({
            title: "Thông tin chi tiết",
            modal: true,
            visible: false,
            resizable: false,
            width: 500
        }).data("kendoWindow");

    detailsTemplate = kendo.template($("#template").html());

    wnd = $("#deleteDetails")
        .kendoWindow({
            title: "Xoá Thông Tin Nhân Viên",
            modal: true,
            visible: false,
            resizable: false,
            width: 500
        }).data("kendoWindow");

    detailsTemplate1 = kendo.template($("#templateDelete").html());

}
function showDetails(e) {

    e.preventDefault();

    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate(dataItem));
    wnd.center().open();
}
function paramerter() {
    txtEmployeeIDVal = $('#txtEmployee').val();
}
// load
function GetAllEmployee() {
    init_Grid_ListAll_Staff();
    paramerter();

    if (txtEmployeeIDVal == '') {
        $.ajax({
            traditional: true,
            url: "getListEmployee",
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            dataType: 'json',
            timeout: 60 * 60000,
            error: function (xhr, e) {
                toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
            },
            success: function (data) {
                var _result = data.Result;
                var _error = data.Error;
                var _type = data.Type;
                switch (_result) {
                    case 1:

                        OpenOrCloseForm(1);

                        var listStaff = data.ListStaff;
                        setDataSource(grid_ListAll_Staff, listStaff);

                        break;
                    case 0:
                        toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                        break;
                    case -1:
                        toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                        break;
                }
            },
            complete: function (cpl) {
                enableControl(true);
            }
        });
    }
    else {
        $.ajax({
            traditional: true,
            url: "getListEmployeeByEmployeeID",
            data: JSON.stringify({ EmployeeID: txtEmployeeIDVal }),
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            dataType: 'json',
            timeout: 60 * 60000,
            error: function (xhr, e) {
                toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
            },
            success: function (data) {
                var _result = data.Result;
                var _error = data.Error;
                var _type = data.Type;
                switch (_result) {
                    case 1:

                        OpenOrCloseForm(1);

                        var listStaff = data.ListStaff;
                        setDataSource(grid_ListAll_Staff, listStaff);

                        break;
                    case 0:
                        toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                        break;
                    case -1:
                        toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                        break;
                }
            },
            complete: function (cpl) {
                enableControl(true);
            }
        });
    }
}
// End load
function showDeleteQuestion(e) {
    e.preventDefault();

    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate1(dataItem));
    wnd.center().open();
}
// Delete
function DeleteEmployee(id, EmployeeID) {
    if (id == 1) {
        paramerter();

        $.ajax({
            traditional: true,
            url: "DeleteEmployee",
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: JSON.stringify({ EmployeeID: EmployeeID }),
            dataType: 'json',
            timeout: 60 * 60000,
            error: function (xhr, e) {
                toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
            },
            success: function (data) {
                var _result = data.Result;
                var _error = data.Error;
                var _type = data.Type;
                switch (_result) {
                    case 1:

                        OpenOrCloseForm(1);

                        var listStaff = data.ListStaff;
                        toastr.success('Thành công', "Xoá thông tin nhân viên", { timeOut: 1500 })

                        GetAllEmployee();
                        wnd.center().close();
                        break;
                    case 0:
                        toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                        break;
                    case -1:
                        toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                        break;
                }
            },
            complete: function (cpl) {
                enableControl(true);
            }
        });
    }
    else {
        wnd.center().close();
    }
}
// Insert
function insertEmployeePre() {

    $('#form-search').hide();
    $('#form-detail').hide();
    $('#form-info').show();

    $.ajax({
        traditional: true,
        url: "GetAllProvince",
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        dataType: 'json',
        timeout: 60 * 60000,
        error: function (xhr, e) {
            toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
        },
        success: function (data) {
            var _result = data.Result;
            var _error = data.Error;
            var _type = data.Type;
            switch (_result) {
                case 1:

                    OpenOrCloseForm(1);

                    var listProvince = data.ListProvince;

                    setDataSource(inputProvince, listProvince);
                    setDataSource(homeTownProvince, listProvince);

                    break;
                case 0:
                    toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                    break;
                case -1:
                    toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                    break;
            }
        },
        complete: function (cpl) {
            enableControl(true);
        }
    });

    var inputProvince = $("#inputProvince").kendoDropDownList({
        optionLabel: "Chọn tỉnh thành phố",
        dataTextField: "ProvinceNameFULLVN",
        dataValueField: "ID",
        height: 310,
        change: function (e) {
            var value = this.value();
            setDataSource(inputDistrict, []);
            setDataSource(inputWard, []);
            $.ajax({
                traditional: true,
                url: "GetDistrictByID",
                data: JSON.stringify({ ProvinceID: value }),
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                dataType: 'json',
                timeout: 60 * 60000,
                error: function (xhr, e) {
                    toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
                },
                success: function (data) {
                    var _result = data.Result;
                    var _error = data.Error;
                    var _type = data.Type;
                    switch (_result) {
                        case 1:

                            OpenOrCloseForm(1);

                            var listDistrict = data.ListDistrict;

                            setDataSource(inputDistrict, listDistrict);

                            break;
                        case 0:
                            toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                            break;
                        case -1:
                            toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                            break;
                    }
                },
                complete: function (cpl) {
                    enableControl(true);
                }
            });
        }
    }).data("kendoDropDownList");

    var inputDistrict = $("#inputDistrict").kendoDropDownList({
        optionLabel: "Chọn quận/huyện",
        dataTextField: "DistrictNameFULLVN",
        dataValueField: "DistrictID",
        height: 310,
        dataSource: {
            serverFiltering: true,
            data: []
        },
        change: function (e) {
            var value = this.value();

            $.ajax({
                traditional: true,
                url: "GetWardByID",
                data: JSON.stringify({ DistrictID: value }),
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                dataType: 'json',
                timeout: 60 * 60000,
                error: function (xhr, e) {
                    toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
                },
                success: function (data) {
                    var _result = data.Result;
                    var _error = data.Error;
                    var _type = data.Type;
                    switch (_result) {
                        case 1:

                            OpenOrCloseForm(1);

                            setDataSource(inputWard, []);

                            var listWard = data.ListWard;

                            setDataSource(inputWard, listWard);

                            break;
                        case 0:
                            toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                            break;
                        case -1:
                            toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                            break;
                    }
                },
                complete: function (cpl) {
                    enableControl(true);
                }
            });
        }
    }).data("kendoDropDownList");

    var inputWard = $("#inputWard").kendoDropDownList({
        optionLabel: "Chọn phường/xã",
        dataTextField: "WardNameFullVN",
        dataValueField: "ID",
        height: 310,
        dataSource: {
            serverFiltering: true,
            data: []
        }
    }).data("kendoDropDownList");

    var homeTownProvince = $("#homeTownProvince").kendoDropDownList({
        optionLabel: "Chọn tỉnh thành phố",
        dataTextField: "ProvinceNameFULLVN",
        dataValueField: "ID",
        height: 310,
        change: function (e) {
            var value = this.value();
            setDataSource(homeTownDistrict, []);
            setDataSource(homeTownWard, []);
            $.ajax({
                traditional: true,
                url: "GetDistrictByID",
                data: JSON.stringify({ ProvinceID: value }),
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                dataType: 'json',
                timeout: 60 * 60000,
                error: function (xhr, e) {
                    toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
                },
                success: function (data) {
                    var _result = data.Result;
                    var _error = data.Error;
                    var _type = data.Type;
                    switch (_result) {
                        case 1:

                            OpenOrCloseForm(1);

                            var listDistrict = data.ListDistrict;

                            setDataSource(homeTownDistrict, listDistrict);

                            break;
                        case 0:
                            toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                            break;
                        case -1:
                            toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                            break;
                    }
                },
                complete: function (cpl) {
                    enableControl(true);
                }
            });
        }
    }).data("kendoDropDownList");

    var homeTownDistrict = $("#homeTownDistrict").kendoDropDownList({
        optionLabel: "Chọn quận/huyện",
        dataTextField: "DistrictNameFULLVN",
        dataValueField: "DistrictID",
        height: 310,
        dataSource: {
            serverFiltering: true,
            data: []
        },
        change: function (e) {
            var value = this.value();

            $.ajax({
                traditional: true,
                url: "GetWardByID",
                data: JSON.stringify({ DistrictID: value }),
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                dataType: 'json',
                timeout: 60 * 60000,
                error: function (xhr, e) {
                    toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
                },
                success: function (data) {
                    var _result = data.Result;
                    var _error = data.Error;
                    var _type = data.Type;
                    switch (_result) {
                        case 1:

                            OpenOrCloseForm(1);

                            setDataSource(inputWard, []);

                            var listWard = data.ListWard;

                            setDataSource(homeTownWard, listWard);

                            break;
                        case 0:
                            toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                            break;
                        case -1:
                            toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                            break;
                    }
                },
                complete: function (cpl) {
                    enableControl(true);
                }
            });
        }
    }).data("kendoDropDownList");

    var homeTownWard = $("#homeTownWard").kendoDropDownList({
        optionLabel: "Chọn phường/xã",
        dataTextField: "WardNameFullVN",
        dataValueField: "ID",
        height: 310,
        dataSource: {
            serverFiltering: true,
            data: []
        }
    }).data("kendoDropDownList");

    // Ngày Sinh
    $("#dpkBirthDay").kendoDatePicker({
        value: kendo.date.today(),
        start: "year",
        culture: "vi-VN",
        depth: "month",
        format: "dd/MM/yyyy",
        max: new Date(),
        dateInput: true
    });
}
function insert_EmployeeCheck() {

    var employeeID = $('#txtEmployeeID').val().trim();
    var fullNameVN = $('#txtFullName').val().trim();
    var citizenID = $('#txtCitizenID').val().trim();
    var phone = $('#txtPhoneNumber').val().trim();
    var birthDay = $('#dpkBirthDay').data('kendoDatePicker').value();
    var houseNumber = $('#inputHouseNumber').val().trim();
    var roadName = $('#inputRoadName').val().trim();
    var locationWardID = $("#inputWard").kendoDropDownList().val();
    var locationDistrictId = $("#inputDistrict").kendoDropDownList().val();
    var locationProvinceId = $("#inputProvince").kendoDropDownList().val();
    var email = $('#txtEmail').val().trim();
    var homeTownHouseNumber = $('#inputHouseNumber').val().trim();
    var homeTownRoadName = $('#inputHouseNumber').val().trim();
    var homeTownWardName = $("#homeTownWard").kendoDropDownList().val();
    var homeTownDistrictName = $("#homeTownDistrict").kendoDropDownList().val();
    var homeTownProvinceName = $("#homeTownProvince").kendoDropDownList().val();

    var hasInsert = 0;

    if (employeeID == '') {
        hasInsert = 0;
        $('#checkErrorImageID').show();
        $('#checkErrorMessageID').show();
        document.getElementById('checkErrorMessageID').innerHTML = "<label style='color:red'>Mã nhân viên không được để trống.";
    }
    else {
        hasInsert = 1;
        $('#checkErrorImageID').hide();
        $('#checkErrorMessageID').hide();
    }
    if (fullNameVN == '') {
        hasInsert = 0;
        $('#checkErrorImageName').show();
        $('#checkErrorMessageName').show();
        document.getElementById('checkErrorMessageName').innerHTML = "<label style='color:red'>Tên nhân viên không được để trống.";
    } else {
        hasInsert = 1;
        $('#checkErrorImageName').hide();
        $('#checkErrorMessageName').hide();
    }

    if (email == '') {
        hasInsert = 0;
        $('#checkErrorImageEmail').show();
        $('#checkErrorMessageEmail').show();
        document.getElementById('checkErrorMessageEmail').innerHTML = "<label style='color:red'>Email nhân viên không được để trống.";
    } else if (!isEmail(email)) {
        hasInsert = 0;
        $('#checkErrorImageEmail').show();
        $('#checkErrorMessageEmail').show();
        document.getElementById('checkErrorMessageEmail').innerHTML = "<label style='color:red'>Sai định dạng(Mẫu: example@gmail.com).";
    }
    else {
        hasInsert = 1;
        $('#checkErrorImageEmail').hide();
        $('#checkErrorMessageEmail').hide();
    }
    if (citizenID == '') {
        hasInsert = 0;
        $('#checkErrorImageCitizenID').show();
        $('#checkErrorMessageCitizenID').show();
        document.getElementById('checkErrorMessageCitizenID').innerHTML = "<label style='color:red'>CMND nhân viên không được để trống.";
    } else if (citizenID.length === 9 || citizenID.length === 12) {
        hasInsert = 1;
        $('#checkErrorImageCitizenID').hide();
        $('#checkErrorMessageCitizenID').hide();
       
    } else {
        hasInsert = 0;
        $('#checkErrorImageCitizenID').show();
        $('#checkErrorMessageCitizenID').show();
        document.getElementById('checkErrorMessageCitizenID').innerHTML = "<label style='color:red'>CMND phải là 9 hoặc 12 số.";
    }

    if (hasInsert == 1) {
        $.ajax({
            traditional: true,
            url: "Insert_EmployeeController",
            data: JSON.stringify({
                EmployeeID: employeeID,
                FullNameVN: fullNameVN,
                CitizenID: citizenID,
                Phone: phone,
                BirthDay: birthDay,
                HouseNumber: houseNumber,
                RoadName: roadName,
                LocationWardID: locationWardID,
                LocationDistrictId: locationDistrictId,
                LocationProvinceId: locationProvinceId,
                Email: email,
                HomeTownHouseNumber: homeTownHouseNumber,
                HomeTownRoadName: homeTownRoadName,
                HomeTownWardName: homeTownWardName,
                HomeTownDistrictName: homeTownDistrictName,
                HomeTownProvinceName: homeTownProvinceName
            }),
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            dataType: 'json',
            timeout: 60 * 60000,
            error: function (xhr, e) {
                toastr.error('Lỗi tìm kiếm. Mã lỗi ' + xhr.status, 'Thông báo', { timeOut: 1500 });
            },
            success: function (data) {
                var _result = data.Result;
                var _error = data.Error;
                var _type = data.Type;
                switch (_result) {
                    case 1:

                        var listResult = data.ListResult;
                        var result = listResult[0].Result;

                        if (result > 0)
                            toastr.success("Thêm nhân viên thành công", "Thông báo", { timeOut: 3000 });
                        else if (result = 0)
                            toatr.warning("Mã nhân viên đã tồn tại", "Thông báo", { timeOut: 3000 });
                        else
                            toastr.warning("Đã bật lại trạng thái hoạt động cho nhân viên", "Thông báo", { timeOut: 3000 });

                        break;
                    case 0:
                        toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                        break;
                    case -1:
                        toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                        break;
                }
            },
            complete: function (cpl) {
                enableControl(true);
            }
        });
    }
}
// ======================================================================
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function enableControl() { }
function BackSearch() {
    OpenOrCloseForm(0);
}
function setDataSource(ctrl, data) {
    if (!ctrl) return false
    // get config
    var options = $.extend(true, {}, ctrl.dataSource.options)
    // set new data
    options.data = data
    // set dataSource
    ctrl.setDataSource(new kendo.data.DataSource(options));
}