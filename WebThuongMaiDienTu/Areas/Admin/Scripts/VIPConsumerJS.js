var VipName = '', txtVipName = '';
$(document).ready(function () {
    $('#form-detail').hide();
    $('#form-search').show();
    $('#form-info').hide();
});


function init_Grid_List_VipConsumer() {
    grid_List_VipConsumer = $("#grid_List_VipConsumer").kendoGrid({
        height: 500,
        scrollable: true,
        sortable: true,
        columns: [{
            field: "ID",
            title: "#",
            width: 30,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "VipName",
            title: "Tên loại VIP",
            width: 200,
            attributes: { style: "text-align: left; font-size: 14px" }
        }
            , {
            field: "Enable",
            title: "Trạng thái",
            width: 100,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "CreateDated",
            title: "Ngày tạo",
            width: 120,
            template: "#= CreateDated == null ? kendo.toString('') :  kendo.toString(kendo.parseDate(CreateDated, 'yyyy-MM-dd'), 'MM/dd/yy hh:mm:ss') #",
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "CreatedBy",
            title: "Người tạo",
            width: 100,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "ModifiedDate",
            title: "Ngày chỉnh sửa",
            template: "#= ModifiedDate == null ? kendo.toString('') :  kendo.toString(kendo.parseDate(ModifiedDate, 'yyyy-MM-dd'), 'MM/dd/yy hh:mm:ss') #",
            width: 150,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "ModifiedByUser",
            title: "Người chỉnh sửa",
            width: 140,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            command: {
                text: "Chỉnh sửa", click: showEditQuestion,
                style: "background-color: red; font-size: 14px"
            },
            title: " ",

            width: 125
        }, {
            command: {
                text: "Xoá", click: showDeleteQuestion
            },
            title: " ",
            width: 90
        }
        ],
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
            width: 500
        }).data("kendoWindow");

    detailsTemplate1 = kendo.template($("#templateDelete").html());

    wnd = $("#editDetails")
        .kendoWindow({
            title: "Chỉnh sửa",
            modal: true,
            visible: false,
            resizable: false,
            width: 600
        }).data("kendoWindow");

    detailsTemplate = kendo.template($("#templateEdit").html());
}
function callDivVip() {
    $('#form-search').hide();
    $('#form-detail').hide();
    $('#form-info').show();
    $('#checkErrorImageVipName').hide();
    $('#checkErrorEditMessageVipName').hide();
}
function getVipConsumer() {
    $('#form-detail').show();
    $('#form-search').show();
    $('#form-info').hide();
    init_Grid_List_VipConsumer();

    txtSearchValue = $('#txtSearch').val();
    if (txtSearchValue == '') {
        $.ajax({
            traditional: true,
            url: "GetAllVipConsumer",
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
                        setDataSource(grid_List_VipConsumer, listResult);
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
            url: "GetVipConsumerByVipName",
            data: JSON.stringify({ VipName: txtSearchValue }),
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
                        setDataSource(grid_List_VipConsumer, listResult);
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
function showEditQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate(dataItem));
    wnd.center().open();

    $('#checkErrorEditImageVipName').hide();
    $('#checkErrorEditMessageVipName').hide();
}
function showDeleteQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate1(dataItem));
    wnd.center().open();
}
function DeleteVip(hasDelete, iD) {
    var deleteID = iD;
    if (hasDelete == 1) {
        $.ajax({
            traditional: true,
            url: "DeleteVipConsumerController",
            data: JSON.stringify({ ID: deleteID }),
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
                            toastr.warning("Tên này không tồn tại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listResult[0].Result == -1) {
                            toastr.warning("Tên này đã được xoá", "Thông báo", { timeOut: 3000 });
                        }
                        if (listResult[0].Result == 1) {
                            toastr.success("Xoá thành công", "Thông báo", { timeOut: 3000 });
                            getVipConsumer();
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
            },
            complete: function (cpl) {
                enableControl(true);
            }
        });
    }
    else
        wnd.center().close();
}

function UpdateCate(hasUpdate, iD) {
    var updateID = iD;
    var name = $('#txtEditVipName').val();
    var isUpdate = hasUpdate;

    if (name == '') {
        $('#checkErrorEditImageVipName').show();
        $('#checkErrorEditMessageVipName').show();
        document.getElementById('checkErrorEditMessageCateName').innerHTML = '<strong style= "color:red"> Tên loại không được để trống.'
    }
    else {
        $('#checkErrorEditImageVipName').hide();
        $('#checkErrorEditMessageVipName').hide();
    }

    if (isUpdate == 1 && name != '') {
        $.ajax({
            traditional: true,
            url: "UpdateVipConsumerController",
            data: JSON.stringify({ ID: updateID, VipName: name }),
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
                        if (listResult[0].Result == -1) {
                            toastr.warning("Tên này không tồn tại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listResult[0].Result == 0) {
                            toastr.warning("Tên này đã được xoá", "Thông báo", { timeOut: 3000 });
                        }
                        if (listResult[0].Result == 1) {
                            toastr.success("Chỉnh sửa thành công", "Thông báo", { timeOut: 3000 });
                            getVipConsumer();
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
            },
            complete: function (cpl) {
                enableControl(true);
            }
        });
    }
    if (isUpdate == 2)
        wnd.center().close();
}
function InsertVipConsumer() {
    txtVipName = $('#txtVipName').val();
    var hasInsert = 0;

    var letters = /^[A-Za-z]+$/;
    if (txtVipName == '') {
        hasInsert = 0;
        $('#checkErrorImageVipName').show();
        $('#checkErrorMessageVipName').show();
        document.getElementById('checkErrorMessageVipName').innerHTML = '<strong style= "color:red"> Tên loại không được để trống.'
    }
    else {
        hasInsert = 1;
        $('#checkErrorImageVipName').hide();
        $('#checkErrorMessageVipName').hide();
    }
    if (hasInsert == 1) {
        $.ajax({
            traditional: true,
            url: "InserVipConsumer",
            data: JSON.stringify({ VipName: txtVipName }),
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
                            toastr.warning("Tên đã tồn tại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listResult[0].Result == -1) {
                            toastr.warning("Thể loại đã được cập nhật cho phép hoạt động trở lại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listResult[0].Result > 0) {
                            toastr.success("Thêm thành công", "Thông báo", { timeOut: 3000 });
                            BackSearch();
                            $('#txtVipName').val("");
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
// ==========================================================================================================================================
function enableControl() { }
function BackSearch() {
    $('#form-search').show();
    $('#form-detail').hide();
    $('#form-info').hide();
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