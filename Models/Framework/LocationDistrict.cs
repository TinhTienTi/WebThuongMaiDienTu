namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LocationDistrict")]
    public partial class LocationDistrict
    {
        public int ID { get; set; }

        public int? ProvinceID { get; set; }

        public int? DistrictID { get; set; }

        [StringLength(3)]
        public string LetterCode { get; set; }

        public byte? NumberCode { get; set; }

        [StringLength(50)]
        public string DistrictName { get; set; }

        [StringLength(100)]
        public string DistrictNameFULL { get; set; }

        [StringLength(200)]
        public string DistrictNameFULLVN { get; set; }

        public byte? IsEnable { get; set; }
    }
}
