
$(document).ready(function () {
    $('#form-detail').show();
    $('#form-info').hide();
    init_grid_List_Consumer();
    getAllConsumer();
});

function init_grid_List_Consumer() {
    grid_List_Consumer = $("#grid_List_Consumer").kendoGrid({
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
            title: "Tên khách hàng",
            width: 200,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "CMND",
            title: "CMND",
            width: 150,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "Location",
            title: "Địa chỉ",
            width: 200,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "Phone",
            title: "SĐT",
            width: 150,
            attributes: { style: "text-align: right; font-size: 14px" }
        }, {
            field: "Email",
            title: "Email",
            width: 200,
            attributes: { style: "text-align: left; font-size: 14px" }
        }, {
            field: "BirthDay",
            title: "Ngày sinh",
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
function showEditQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate(dataItem));
    wnd.center().open();

    $('#checkErrorEditImage').hide();
    $('#checkErrorEditMessage').hide();
}
function showDeleteQuestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    wnd.content(detailsTemplate1(dataItem));
    wnd.center().open();
}

function getAllConsumer() {
    $('#form-detail').show();
    $('#form-info').hide();
    $.ajax({
        traditional: true,
        url: "GetAllConsumer",
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
                    setDataSource(grid_List_Consumer, listResult);
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