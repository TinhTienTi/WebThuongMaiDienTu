var txtSearchValue = '';
var CateName;
var txtCateName = '';
$(document).ready(function () {
    $('#form-search').show();
    $('#form-detail').hide();
    $('#form-info').hide();
});


function init_Grid_ListAll_Cate() {
    grid_ListAll_Category = $("#grid_ListAll_Category").kendoGrid({
        height: 500,
        scrollable: true,
        sortable: true,
        columns: [{
            field: "ID",
            title: "#",
            width: 150,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "CateName",
            title: "Tên loại sản phẩm",
            width: 200,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            command: {
                text: "Chỉnh sửa", click: showEditQuestion
            },
            title: " ",
            width: 100
        }, {
            command: {
                text: "Xoá", click: showDeleteQuestion
            },
            title: " ",
            width: 100
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
            width: 500
        }).data("kendoWindow");

    detailsTemplate1 = kendo.template($("#templateDelete").html());

    wnd = $("#editDetails")
        .kendoWindow({
            title: "Chỉnh sửa",
            modal: true,
            visible: false,
            resizable: false,
            width: 500
        }).data("kendoWindow");

    detailsTemplate = kendo.template($("#templateEdit").html());
}
function getCategory() {

    $('#form-search').show();
    $('#form-detail').show();
    $('#form-info').hide();

    init_Grid_ListAll_Cate();
    txtSearchValue = $('#txtSearch').val();
    if (txtSearchValue == '') {
        $.ajax({
            traditional: true,
            url: "GetAllCategory",
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
                        var listCate = data.ListCate;
                        setDataSource(grid_ListAll_Category, listCate);
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
            url: "GetCategoryByCateName",
            data: JSON.stringify({ CateName: txtSearchValue }),
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
                        var listCate = data.ListCate;
                        setDataSource(grid_ListAll_Category, listCate);
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
function callDivCategory() {
    $('#form-search').hide();
    $('#form-detail').hide();
    $('#form-info').show();

    $('#checkErrorImageCateName').hide();
    $('#checkErrorMessageCateName').hide();

}
function InsertCatefory() {
    txtCateName = $('#txtCateName').val();
    var hasInsert = 0;

    var letters = /^[A-Za-z]+$/;
    if (txtCateName == '') {
        hasInsert = 0;
        $('#checkErrorImageCateName').show();
        $('#checkErrorMessageCateName').show();
        document.getElementById('checkErrorMessageCateName').innerHTML = '<strong style= "color:red"> Tên loại sản phẩm không được để trống.'
    }
    else {
        hasInsert = 1;
        $('#checkErrorImageCateName').hide();
        $('#checkErrorMessageCateName').hide();
    }
    if (hasInsert == 1) {
        $.ajax({
            traditional: true,
            url: "InsertCategory",
            data: JSON.stringify({ CateName: txtCateName }),
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
                        var listCate = data.ListCate;
                        if (listCate[0].Result == 0) {
                            toastr.warning("Tên đã tồn tại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listCate[0].Result == -1) {
                            toastr.warning("Thể loại đã được cập nhật cho phép hoạt động trở lại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listCate[0].Result > 0) {
                            toastr.success("Thêm thành công", "Thông báo", { timeOut: 3000 });
                            BackSearch();
                            $('#txtCateName').val("");
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
// =============================================================== Delete ===========================================================================
function showDeleteQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate1(dataItem));
    wnd.center().open();
}
function DeleteCate(hasDelete, iD) {
    var deleteID = iD;
    if (hasDelete == 1) {
        $.ajax({
            traditional: true,
            url: "DeleteCategory",
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
                        var listCate = data.ListCate;
                        if (listCate[0].Result == 0) {
                            toastr.warning("Tên này không tồn tại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listCate[0].Result == -1) {
                            toastr.warning("Tên này đã được xoá", "Thông báo", { timeOut: 3000 });
                        }
                        if (listCate[0].Result == 1) {
                            toastr.success("Xoá thành công", "Thông báo", { timeOut: 3000 });
                            getCategory();
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
// =================================================================End delete=========================================================================
function showEditQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate(dataItem));
    wnd.center().open();

    $('#checkErrorEditImageCateName').hide();
    $('#checkErrorEditMessageCateName').hide();
}
function UpdateCate(hasUpdate, iD) {
    var updateID = iD;
    var name = $('#txtEditCateName').val();
    var isUpdate = hasUpdate;

    if (name == '') {
        $('#checkErrorEditImageCateName').show();
        $('#checkErrorEditMessageCateName').show();
        document.getElementById('checkErrorEditMessageCateName').innerHTML = '<strong style= "color:red"> Tên loại sản phẩm không được để trống.'
    }
    else {
        $('#checkErrorEditImageCateName').hide();
        $('#checkErrorEditMessageCateName').hide();
    }

    if (isUpdate == 1 && name != '' ) {
        $.ajax({
            traditional: true,
            url: "UpdateCategory",
            data: JSON.stringify({ ID: updateID, CateName: name }),
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
                        var listCate = data.ListCate;
                        if (listCate[0].Result == -1) {
                            toastr.warning("Tên này không tồn tại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listCate[0].Result == 0) {
                            toastr.warning("Tên này đã được xoá", "Thông báo", { timeOut: 3000 });
                        }
                        if (listCate[0].Result == -2) {
                            toastr.warning("Tên này đã tồn tại", "Thông báo", { timeOut: 3000 });
                        }
                        if (listCate[0].Result == 1) {
                            toastr.success("Chỉnh sửa thành công", "Thông báo", { timeOut: 3000 });
                            getCategory();
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