var txtNameValue = '';
var ID = 0, Name = '', IsEnable = 1;
$(document).ready(function () {
    $('#form-detail').show();
    $('#form-info').hide();
    init_grid_ListAll_Producer();
    getProducer();
});
function init_grid_ListAll_Producer() {
    grid_ListAll_Producer = $("#grid_ListAll_Producer").kendoGrid({
        height: 500,
        scrollable: true,
        sortable: true,
        columns: [{
            field: "ID",
            title: "#",
            width: 30,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "Name",
            title: "Tên Nhà sản xuất",
            width: 200,
            attributes: { style: "text-align: left; font-size: 14px" }
        }
            , {
            field: "Enable",
            title: "Trạng thái",
            width: 100,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "StartDate",
            title: "Ngày tạo",
            width: 120,
            template: "#= StartDate == null ? kendo.toString('') :  kendo.toString(kendo.parseDate(StartDate, 'yyyy-MM-dd'), 'MM/dd/yy hh:mm:ss') #",
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "EndDate",
            title: "Ngày tạm dừng",
            width: 100,
            template: "#= EndDate == null ? kendo.toString('') :  kendo.toString(kendo.parseDate(EndDate, 'yyyy-MM-dd'), 'MM/dd/yy hh:mm:ss') #",
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            command: {
                text: "Chỉnh sửa", click: showEditQuestion,
            },
            attributes: { style: "text-align: left; font-size: 14px" },
            title: " ",
            width: 80
        }, {
            command: {
                text: "Xoá", click: showDeleteQuestion
            },
            attributes: { style: "text-align: left; font-size: 14px" },
            title: " ",
            width: 60
        }],
        dataSource: {
            data: [],
            pageSize: 20
        },
        pageable: {
            pageSizes: [20, 50, "all"],
            refresh: true
        }
    }).data("kendoGrid");

    wnd = $("#deleteDetails")
        .kendoWindow({
            title: "Xoá Thông Tin",
            modal: true,
            visible: false,
            resizable: false,
            width: 600
        }).data("kendoWindow");

    detailsTemplate1 = kendo.template($("#templateDelete").html());

    wnd = $("#editDetails")
        .kendoWindow({
            title: "Chỉnh sửa",
            modal: true,
            visible: false,
            resizable: false,
            width: 700
        }).data("kendoWindow");

    detailsTemplate = kendo.template($("#templateEdit").html());
}
function getProducer() {
    $.ajax({
        traditional: true,
        url: "GetAllProducer",
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
                    setDataSource(grid_ListAll_Producer, listResult);
                    break;
                case 0:
                    toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                    break;
                case -1:
                    toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                    break;
            }
        }
    });
}
function callDivInsert() {
    $('#form-detail').hide();
    $('#form-info').show();
    $('#checkErrorEditImageName').hide();
    $('#checkErrorEditMessageName').hide();
}
function InsertProducer() {
    txtNameValue = $('#txtName').val();
    var hasInsert = 0;
    if (txtNameValue == '') {
        hasInsert = 0;
        $('#checkErrorEditImageName').show();
        $('#checkErrorEditMessageName').show();
        document.getElementById('checkErrorEditMessageName').innerHTML = '<strong style:"color:red">Tên nhà sản xuất không được để trống.'
    }
    else {
        hasInsert = 1;
        $('#checkErrorEditImageName').hide();
        $('#checkErrorEditMessageName').hide();
    }
    if (hasInsert == 1) {
        $.ajax({
            traditional: true,
            url: "InsertController",
            data: JSON.stringify({ Name: txtNameValue }),
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
                        if (listResult[0].Result > 0) {
                            toastr.success("Thêm thành công nhà sản xuất có tên: " + txtNameValue, "Thông báo", { timeOut: 3000 });
                            getProducer();
                            $('#form-detail').show();
                            $('#form-info').hide();
                            $('#txtName').val('');
                        }
                        if (listResult[0].Result == -1) {
                            toastr.warning("Tên nhà sản xuất " + txtNameValue + " đã được cho phép hoạt động trở lại.", "Thông báo", { timeOut: 3000 });
                            $('#txtName').val('');
                        }
                        if (listResult[0].Result == 0) {
                            toastr.warning("Tên nhà sản xuất " + txtNameValue + " đã tồn tại.", "Thông báo", { timeOut: 3000 });
                            $('#txtName').val('');
                        }
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
function Delete(hasDelete, id) {
    var deleteId = hasDelete;
    if (hasDelete == 1) {
        $.ajax({
            traditional: true,
            url: "DeleteController",
            data: JSON.stringify({ ID: id }),
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
                        if (listResult[0].Result > 0) {
                            toastr.success("Xoá thành công nhà sản xuất có mã là: " + id + ".", "Thông báo", { timeOut: 3000 });
                            getProducer();
                            wnd.center().close();
                        }
                        if (listResult[0].Result == 0) {
                            toastr.warning("Nhà sản xuất có mã là: " + id + " đang not active.", "Thông báo", { timeOut: 3000 });
                            wnd.center().close();
                        }
                        if (listResult[0].Result == -1) {
                            toastr.warning("Nhà sản xuất có mã là: " + id + " hiện đang còn phân phối sản phẩm.", "Thông báo", { timeOut: 3000 });
                            wnd.center().close();
                        }
                        break;
                    case 0:
                        toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                        break;
                    case -1:
                        toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                        break;
                }
            }
        });
    }
    else
        wnd.center().close();
}
function showEditQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate(dataItem));
    wnd.center().open();

    $('#checkErrorEditImageName').hide();
    $('#checkErrorEditMessageName').hide();

    var inputStatus = $("#inputStatus").kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "value",
        height: 310,
        dataSource: {
            serverFiltering: true,
            data: [{ Name: "Active", value: "1" },
            { Name: "Not Active", value: "0" }]
        }
    }).data("kendoDropDownList");
}
function showDeleteQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate1(dataItem));
    wnd.center().open();
}
function Update(hasUpdate, ID) {
    var isUpdate = hasUpdate;
    var updateID = ID;
    var statusID = $("#inputStatus").kendoDropDownList().val();
    var nameEdit = $('#txtEditName').val();

    if (nameEdit == '') {
        isUpdate = 0;
        $('#checkErrorEditImageName').show();
        $('#checkErrorEditMessageName').show();
        document.getElementById('checkErrorEditMessageName').innerHTML = '<strong style: "color:red"> Tên không được để trống.'
    }
    else {
        isUpdate = 1;
        $('#checkErrorEditImageName').hide();
        $('#checkErrorEditMessageName').hide();
    }

    if (isUpdate == 1) {
        $.ajax({
            traditional: true,
            url: "UpdateController",
            data: JSON.stringify({ ID: updateID, Name: nameEdit, IsEnable: statusID }),
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
                        if (listResult[0].Result == 0) {
                            toastr.warning("Không tồn tại nhà sản xuất có tên là " + txtNameValue + ".", "Thông báo", { timeOut: 3000 });
                        }
                        if (listResult[0].Result == 1 || listResult[0].Result == -1) {
                            toastr.success("Cập nhật thành công.", "Thông báo", { timeOut: 3000 });
                            getProducer();
                            wnd.center().close();
                        }
                        break;
                    case 0:
                        toastr.warning(_error, 'Thông báo', { timeOut: 1500 });
                        break;
                    case -1:
                        toastr.warning('Lỗi tìm kiếm.', 'Thông báo', { timeOut: 1500 });
                        break;
                }
            }
        });
    }
    if (hasUpdate == 2) {
        wnd.center().close();
    }
}
// ==========================================================================================================================================
function BackSearch() {
    getProducer();
    $('#form-detail').show();
    $('#form-info').hide();
    $('#txtName').val('');
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