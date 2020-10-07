namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LocationProvince")]
    public partial class LocationProvince
    {
        public int ID { get; set; }

        [StringLength(3)]
        public string LetterCode { get; set; }

        public byte? NumberCode { get; set; }

        [StringLength(50)]
        public string ProvinceName { get; set; }

        [StringLength(100)]
        public string ProvinceNameFULL { get; set; }

        [StringLength(200)]
        public string ProvinceNameFULLVN { get; set; }

        public byte? IsEnable { get; set; }

        [StringLength(100)]
        public string Region { get; set; }

        [StringLength(100)]
        public string RegionVN { get; set; }
    }
}
