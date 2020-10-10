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
    public class ParameterCate
    {
        public int ID { get; set; }
        public string CateName { get; set; }
    }
    public class ParameterVip
    {
        public int ID { get; set; }
        public string VipName { get; set; }
    }
    public class ParameterConsumer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CMND { get; set; }
        public string Location { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime? BirthDay { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string VipName { get; set; }
        public string Enable { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
    public class ParameterProducer
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}