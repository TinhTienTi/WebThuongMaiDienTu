using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebThuongMaiDienTu.Areas.Admin.Models.DB;
namespace WebThuongMaiDienTu.Areas.Admin.Controllers
{
    public class CategoryController : Controller
    {
        // GET: Admin/Category
        public ActionResult CategoryView()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAllCategory()
        {
            List<Category> listCate = Category.GetAllCatefory();
            if (listCate.Count > 0)
            {
                var listSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListCate = listCate
                };
                var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetCategoryByCateName(ParameterCate model)
        {
            List<Category> listCate = Category.GetCateforyByCateName(model);
            if (listCate.Count > 0)
            {
                var listSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListCate = listCate
                };
                var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertCategory(ParameterCate model)
        {
            try
            {
                List<InsertCate> listCate = InsertCate.InsertCategory(model);
                if (listCate.Count > 0)
                {
                    var listSuccess = new
                    {
                        Result = 1,
                        Today = DateTime.Now.ToString(),
                        ListCate = listCate
                    };
                    var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                    return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = 0, Error = string.Format("Lỗi hệ thống." + ex.Message, ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult DeleteCategory(ParameterCate model)
        {
            try
            {
                List<DeleteCate> listCate = DeleteCate.DeleteCategory(model);

                if (listCate.Count > 0)
                {
                    var listSuccess = new
                    {
                        Result = 1,
                        Today = DateTime.Now.ToString(),
                        ListCate = listCate
                    };
                    var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                    return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = 0, Error = string.Format("Lỗi hệ thống." + ex.Message, ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult UpdateCategory(ParameterCate model)
        {
            try
            {
                List<UpdateCate> listCate = UpdateCate.UpdateCategory(model);
                if (listCate.Count > 0)
                {
                    var listSuccess = new
                    {
                        Result = 1,
                        Today = DateTime.Now.ToString(),
                        ListCate = listCate
                    };
                    var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                    return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = 0, Error = string.Format("Lỗi hệ thống." + ex.Message, ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}