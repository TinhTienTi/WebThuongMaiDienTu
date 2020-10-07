namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Account")]
    public partial class Account
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string DisplayName { get; set; }

        public int? EmployeeID { get; set; }

        [StringLength(20)]
        public string AccountName { get; set; }

        [StringLength(100)]
        public string Password { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(20)]
        public string CreatedByUser { get; set; }

        public byte? IsEnable { get; set; }

        public DateTime? ModifiedDate { get; set; }

        [StringLength(20)]
        public string ModifiedByUser { get; set; }

        public byte? IsHas { get; set; }

        public byte? TypeHas { get; set; }
    }
}
