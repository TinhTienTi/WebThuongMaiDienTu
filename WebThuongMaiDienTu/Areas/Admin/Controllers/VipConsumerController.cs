using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebThuongMaiDienTu.Areas.Admin.Models.DB;
namespace WebThuongMaiDienTu.Areas.Admin.Controllers
{
    public class VipConsumerController : Controller
    {
        // GET: Admin/VipConsumer
        public ActionResult VipConsumer()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAllVipConsumer()
        {
            try
            {
                List<GetVipConsumer> listResult = GetVipConsumer.GetALL();
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
        public JsonResult GetVipConsumerByVipName(ParameterVip model)
        {
            try
            {
                List<GetVipConsumer> listResult = GetVipConsumer.GetVipConsumerByName(model);
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
        public JsonResult InserVipConsumer(ParameterVip model)
        {
            try
            {
                List<InsertVipConsumer> listResult = InsertVipConsumer.InsertVip(model);
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
        public JsonResult UpdateVipConsumerController(ParameterVip model)
        {
            try
            {
                List<UpdateVipConsumer> listResult = UpdateVipConsumer.UpdateVip(model);
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
        public JsonResult DeleteVipConsumerController(ParameterVip model)
        {
            try
            {
                List<DeleteConsumer> listResult = DeleteConsumer.DeleteVip(model);
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