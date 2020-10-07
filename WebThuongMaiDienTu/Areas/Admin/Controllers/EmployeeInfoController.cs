using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Models;
using WebThuongMaiDienTu.Areas.Admin.Models;

namespace WebThuongMaiDienTu.Areas.Admin.Controllers
{
    public class EmployeeInfoController : Controller
    {
        // GET: Admin/EmployeeInfo
        public ActionResult Index()
        {
            return View();
        }   
    }
}
