$(document).ready(function () {
    init_grid_ListAll_Product();
    $('#form-detail').show();
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
            width: 250,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "Content",
            title: "Giá",
            width: 250,
            attributes: { style: "text-align: left; font-size: 14px" }
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
        },
        complete: function (cpl) {
            enableControl(true);
        }
    });
}
function enableControl() { }
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