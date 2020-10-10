
$(document).ready(function () {
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
        },
        complete: function (cpl) {
            enableControl(true);
        }
    });
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