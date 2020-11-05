namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("EmployeeInfo")]
    public partial class EmployeeInfo
    {
        public int ID { get; set; }

        public long? EmployeeID { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(150)]
        public string FullName { get; set; }

        [StringLength(30)]
        public string NameVN { get; set; }

        [StringLength(300)]
        public string FullNameVN { get; set; }

        [StringLength(12)]
        public string CitizenID { get; set; }

        [StringLength(12)]
        public string Phone { get; set; }

        [StringLength(20)]
        public string HouseNumber { get; set; }

        [StringLength(50)]
        public string RoadName { get; set; }

        public int? LocationWardID { get; set; }

        public int? LocationDistrictId { get; set; }

        public int? LocationProvinceId { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [StringLength(12)]
        public string HomeTownHouseNumber { get; set; }

        [StringLength(50)]
        public string HomeTownRoadName { get; set; }

        [StringLength(50)]
        public string HomeTownWardName { get; set; }

        [StringLength(50)]
        public string HomeTownDistrictName { get; set; }

        [StringLength(50)]
        public string HomeTownProvinceName { get; set; }

        public byte? IsEnable { get; set; }

        [Column(TypeName = "date")]
        public DateTime? StartDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? EndDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? BirthDay { get; set; }
    }
}
