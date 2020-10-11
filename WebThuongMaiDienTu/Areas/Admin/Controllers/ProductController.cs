using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebThuongMaiDienTu.Areas.Admin.Models.DB;

namespace WebThuongMaiDienTu.Areas.Admin.Controllers
{
    public class ProductController : Controller
    {
        // GET: Admin/Product
        public ActionResult ProductView()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAllProduct()
        {
            try
            {
                List<GetProduct> listResult = GetProduct.GetAllProduct();
                if (listResult.Count > 0)
                {
                    var listSuccess = new
                    {
                        Result = 1,
                        Today = DateTime.Now.ToString(),
                        ListResult = listResult
                    };

                    var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                    return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin", ""), JsonRequestBehavior.AllowGet });
            }
            catch
            {
                return Json(new { Result = 0, Error = string.Format("Lỗi.", ""), JsonRequestBehavior.AllowGet });
            }
        }
        [HttpPost]
        public JsonResult InsertController(ParameterProduct model)
        {
            try
            {
                List<Product> listResult = Product.Insert(model);
                if (listResult.Count > 0)
                {
                    var listSuccess = new
                    {
                        Result = 1,
                        Today = DateTime.Now.ToString(),
                        ListResult = listResult
                    };

                    var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                    return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), JsonRequestBehavior.AllowGet });
            }
            catch
            {
                return Json(new { Result = 0, Error = string.Format("Lỗi.", ""), JsonRequestBehavior.AllowGet });
            }
        }
        [HttpPost]
        public JsonResult UpdateController(ParameterProduct model)
        {
            try
            {
                List<Product> listResult = Product.Update(model);
                if (listResult.Count > 0)
                {
                    var listSuccess = new
                    {
                        Result = 1,
                        Today = DateTime.Now.ToString(),
                        ListResult = listResult
                    };

                    var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                    return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), JsonRequestBehavior.AllowGet });
            }
            catch
            {
                return Json(new { Result = 0, Error = string.Format("Lỗi.", ""), JsonRequestBehavior.AllowGet });
            }
        }
        [HttpPost]
        public JsonResult DeleteController(ParameterProduct model)
        {
            try
            {
                List<Product> listResult = Product.Delete(model);
                if (listResult.Count > 0)
                {
                    var listSuccess = new
                    {
                        Result = 1,
                        Today = DateTime.Now.ToString(),
                        ListResult = listResult
                    };

                    var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                    return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), JsonRequestBehavior.AllowGet });
            }
            catch
            {
                return Json(new { Result = 0, Error = string.Format("Lỗi.", ""), JsonRequestBehavior.AllowGet });
            }
        }
    }
}