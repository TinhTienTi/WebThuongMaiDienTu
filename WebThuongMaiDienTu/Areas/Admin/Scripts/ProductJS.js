var urlAjax = "/Admin/Producer"
$(document).ready(function () {
    init_grid_ListAll_Product();
    $('#form-detail').show();
    $('#form-info').hide();
    getProduct();
});
function init_grid_ListAll_Product() {
    grid_ListAll_Product = $("#grid_ListAll_Product").kendoGrid({
        height: 500,
        scrollable: true,
        sortable: true,
        columns: [{
            field: "ID",
            title: "#",
            width: 30,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "ProductName",
            title: "Tên sản phẩm",
            width: 250,
            attributes: { style: "text-align: left; font-size: 14px" }
        }
            , {
            field: "Name",
            title: "Tên Nhà sản xuất",
            width: 145,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "Content",
            title: "Nội dung",
            width: 250,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "QuantityInStock",
            title: "Số lượng tồn",
            width: 120,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "Price",
            title: "Giá",
            width: 100,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "ProdImage",
            title: "Ảnh",
            width: 120,
            attributes: { style: "text-align: left; font-size: 14px" }
        }
            , {
            field: "ProdImage",
            title: "Ảnh 1",
            width: 120,
            attributes: { style: "text-align: left; font-size: 14px" }
        }
            , {
            field: "ProdImage",
            title: "Ảnh 2",
            width: 120,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "ProdImage",
            title: "Ảnh 3",
            width: 120,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "CreatedDate",
            title: "Ngày tạo",
            width: 150,
            template: "#= CreatedDate == null ? kendo.toString('') :  kendo.toString(kendo.parseDate(CreatedDate, 'yyyy-MM-dd'), 'MM/dd/yy hh:mm:ss') #",
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
            command: {
                template: "<a role='button' class='k-button k-button-icontext k-grid-edit' href='##'><span class='k-icon k-i-edit'></span>Chỉnh sửa</a>"
            },
            attributes: { style: "text-align: left; font-size: 14px" },
            title: " ",
            width: 130
        }, {
            command: {
                text: "Xoá",
                click: showDeleteQuestion
            },
            attributes: { style: "text-align: left; font-size: 14px" },
            title: " ",
            width: 90
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
            title: "Xoá Sản phẩm",
            modal: true,
            visible: false,
            resizable: false,
            width: 600
        }).data("kendoWindow");
    detailsTemplate1 = kendo.template($("#templateDelete").html());
}
function showDeleteQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate1(dataItem));
    wnd.center().open();
}
function callDivInsert() {
    $('#form-detail').hide();
    $('#form-info').show();

    $('#txtQuantityInStock').kendoNumericTextBox();
    var numerictextbox = $("#txtQuantityInStock").data("kendoNumericTextBox");
    numerictextbox.min(0)
    numerictextbox.max(10000);

    $('#checkErrorImageProductName').hide();
    $('#checkErrorMessageProductName').hide();

    $('#checkErrorImageContent').hide();
    $('#checkErrorMessageContent').hide();

    $('#checkErrorImageQuantityInStock').hide();
    $('#checkErrorMessageQuantityInStock').hide();

    var ddlProducer = $("#ddlProducer").kendoDropDownList({
        dataTextField: "Name",
        dataValueField: "ID",
        height: 310
    }).data("kendoDropDownList");

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
                    setDataSource(ddlProducer, listResult);
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
function getProduct() {
    $.ajax({
        traditional: true,
        url: "GetAllProduct",
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
                    setDataSource(grid_ListAll_Product, listResult);
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
                        if (listResult[0].Result == 1) {
                            toastr.success("Xoá thành công sản phẩm có mã là: " + id + ".", "Thông báo", { timeOut: 3000 });
                            getProduct();
                            wnd.center().close();
                        }
                        if (listResult[0].Result == 0) {
                            toastr.warning("Sản phẩm có mã là: " + id + " không tồn tại.", "Thông báo", { timeOut: 3000 });
                            wnd.center().close();
                        }
                        if (listResult[0].Result == -1) {
                            toastr.warning("Nhà sản xuất có mã là: " + id + " đã được xoá.", "Thông báo", { timeOut: 3000 });
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
function BackSearch() {
    getProduct();
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