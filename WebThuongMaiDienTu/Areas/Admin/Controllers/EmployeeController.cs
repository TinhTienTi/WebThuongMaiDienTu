using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using WebThuongMaiDienTu.Areas.Admin.Models.DB;

namespace WebThuongMaiDienTu.Areas.Admin.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Admin/Employee
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult getListEmployee()
        {
            List<StaffInfo> listStaff = StaffInfo.GetALL();

            if (listStaff.Count > 0)
            {
                var listResultSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListStaff = listStaff
                };

                var jsonResult = Json(listResultSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult getListEmployeeByEmployeeID(ParameterInfo model)
        {
            List<StaffInfo> listStaff = StaffInfo.getByEmployeeId(model);
            
            if (listStaff.Count > 0)
            {
                var listResultSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListStaff = listStaff
                };

                var jsonResult = Json(listResultSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult DeleteEmployee(ParameterInfo model)
        {
            List<StaffInfo_Parter> listStaff = StaffInfo_Parter.DeleteEmployeeByEmployeeId(model);

            if (listStaff.Count > 0)
            {
                var listResultSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListStaff = listStaff
                };

                var jsonResult = Json(listResultSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult GetAllProvince()
        {
            List<GetPronvince> listProvince = GetPronvince.GetAllProvince();

            if (listProvince.Count > 0)
            {
                var listResultSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListProvince = listProvince
                };

                var jsonResult = Json(listResultSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult GetDistrictByID(ParameterInfo model)
        {
            List<GetDistrict> listDistrict = GetDistrict.GetDistrictByProvinceID(model);

            if (listDistrict.Count > 0)
            {
                var listResultSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListDistrict = listDistrict
                };

                var jsonResult = Json(listResultSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult GetWardByID(ParameterInfo model)
        {
            List<GetWard> listWard = GetWard.GetWardByDistrictID(model);

            if (listWard.Count > 0)
            {
                var listResultSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListWard = listWard
                };

                var jsonResult = Json(listResultSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult Insert_EmployeeController(ParameterInfo model)
        {
            List<Insert_Employee> listResult = Insert_Employee.InsertEmployeeModel(model);

            if (listResult.Count > 0)
            {
                var listResultSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListResult = listResult
                };

                var jsonResult = Json(listResultSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
