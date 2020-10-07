using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class ParameterInfo
    {
        public int ID { get; set; }
        public int EmployeeID { get; set; }
        public int ProvinceID { get; set; }
        public int DistrictID { get; set; }

        #region Insert Employee
        public string FullNameVN { get; set; }
        public string CitizenID { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDay { get; set; }
        public string HouseNumber { get; set; }
        public string RoadName { get; set; }
        public int LocationWardID { get; set; }
        public int LocationDistrictId { get; set; }
        public int LocationProvinceId { get; set; }
        public string Email { get; set; }
        public string HomeTownHouseNumber { get; set; }
        public string HomeTownRoadName { get; set; }
        public int HomeTownWardName { get; set; }
        public int HomeTownDistrictName { get; set; }
        public int HomeTownProvinceName { get; set; }
        #endregion
    }
}