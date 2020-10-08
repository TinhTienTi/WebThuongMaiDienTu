using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebThuongMaiDienTu.Areas.Admin.Models.DB;
namespace WebThuongMaiDienTu.Areas.Admin.Controllers
{
    public class ConsumerController : Controller
    {
        // GET: Admin/Consumer
        public ActionResult ConsumerView()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAllConsumer()
        {
            //try
            //{
                List<GetConsumer> listResult = GetConsumer.GetAllConsumer();
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
            //}
            //catch
            //{
            //    return Json(new { Result = 0, Error = string.Format("Lỗi.", ""), JsonRequestBehavior.AllowGet });
            //}
        }
        [HttpPost]
        public JsonResult InsertConsumerController(ParameterConsumer model)
        {
            try
            {
                List<InsertConsumer> listResult = InsertConsumer.Insert(model);
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
        public JsonResult UpdateConsumerController(ParameterConsumer model)
        {
            try
            {
                List<UpdateConsumer> listResult = UpdateConsumer.Update(model);
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
        public JsonResult DeleteConsumerController(ParameterConsumer model)
        {
            try
            {
                List<DeleteConsumer> listResult = DeleteConsumer.Delete(model);
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