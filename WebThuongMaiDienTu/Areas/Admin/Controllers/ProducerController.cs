using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebThuongMaiDienTu.Areas.Admin.Models.DB;
namespace WebThuongMaiDienTu.Areas.Admin.Controllers
{
    public class ProducerController : Controller
    {
        // GET: Admin/Producer
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAllProducer ()
        {
            try
            {
                List<GetProducer> listResult = GetProducer.GetAllProducer();
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
        public JsonResult InsertController(ParameterProducer model)
        {
            try
            {
                List<Producer> listResult = Producer.Insert(model);
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
        public JsonResult UpdateController(ParameterProducer model)
        {
            try
            {
                List<Producer> listResult = Producer.Update(model);
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
        public JsonResult DeleteController(ParameterProducer model)
        {
            try
            {
                List<Producer> listResult = Producer.Delete(model);
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