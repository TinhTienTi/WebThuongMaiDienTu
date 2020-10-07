using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebThuongMaiDienTu.Areas.Admin.Models.DB;

namespace WebThuongMaiDienTu.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        // GET: Admin/Account
        public ActionResult AccountView()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAllAccount()
        {
            List<Account> listAccount = Account.GetAllAccounts();
            if (listAccount.Count > 0)
            {
                var listSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListAccount = listAccount
                };
                var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetAccountByEmployeeId(ParameterInfo model)
        {
            List<AccountPartner> listAccount = AccountPartner.GetAllAccountByEmployeeId(model);
            if (listAccount.Count > 0)
            {
                var listSuccess = new
                {
                    Result = 1,
                    Today = DateTime.Now.ToString(),
                    ListAccount = listAccount
                };
                var jsonResult = Json(listSuccess, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
                return Json(new { Result = 0, Error = string.Format("Không tìm thấy thông tin.", ""), Type = "danger" }, JsonRequestBehavior.AllowGet);
        }
    }
}
