var txtSearchVal = '', EmployeeId = 0;

$(document).ready(function () {


});

function init_Grid_ListAll_Staff() {
    grid_ListAll_Account = $("#grid_ListAll_Account").kendoGrid({
        height: 500,
        scrollable: true,
        columns: [{
            field: "EmployeeID",
            title: "Mã nhân viên",
            width: 150,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "FullNameVN",
            title: "Họ và Tên",
            width: 200,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "AccountName",
            title: "Tên tài khoản",
            width: 100,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "Password",
            title: "Mật khẩu",
            width: 350,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "CreatedDate",
            title: "Ngày tạo",
            width: 200,
            template: "#= CreatedDate == null ? kendo.toString('') :  kendo.toString(kendo.parseDate(CreatedDate, 'yyyy-MM-dd'), 'MM/dd/yy hh:mm:ss') #",
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "CreatedByUser",
            title: "Người tạo",
            width: 150,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "ModifiedDate",
            title: "Ngày chỉnh sửa",
            width: 150,
            template: "#= ModifiedDate == null ? kendo.toString('') :  kendo.toString(kendo.parseDate(ModifiedDate, 'yyyy-MM-dd'), 'MM/dd/yy hh:mm:ss') #",
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "ModifiedByUser",
            title: "Người chỉnh sửa",
            width: 150,
            attributes: { style: "text-align: left; font-size: 14px" }
        },],
        dataSource: {
            data: [],
            pageSize: 5
        },
        pageable: {
            pageSizes: [5, 10, 20, 50, "all"],
            refresh: true
        }
    }).data("kendoGrid");
}
function getAllAccount() {

    init_Grid_ListAll_Staff();
    txtSearchVal = $('#txtSearch').val();

    if (txtSearchVal == '') {
        $.ajax({
            traditional: true,
            url: "GetAllAccount",
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

                        var listAccount = data.ListAccount;
                        setDataSource(grid_ListAll_Account, listAccount);

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
    else if (txtSearchVal != '') {
        $.ajax({
            traditional: true,
            url: "GetAccountByEmployeeId",
            data: JSON.stringify({ EmployeeID: txtSearchVal }),
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

                        var listAccount = data.ListAccount;
                        setDataSource(grid_ListAll_Account, listAccount);

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
function enableControl() { }
function BackSearch() { }
function setDataSource(ctrl, data) {
    if (!ctrl) return false
    // get config
    var options = $.extend(true, {}, ctrl.dataSource.options)
    // set new data
    options.data = data
    // set dataSource
    ctrl.setDataSource(new kendo.data.DataSource(options));
}