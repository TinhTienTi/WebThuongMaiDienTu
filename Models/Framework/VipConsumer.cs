namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("VipConsumer")]
    public partial class VipConsumer
    {
        public int ID { get; set; }

        [StringLength(150)]
        public string VipName { get; set; }

        public int? IsEnable { get; set; }

        public DateTime? CreateDated { get; set; }

        [StringLength(20)]
        public string CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        [StringLength(20)]
        public string ModifiedByUser { get; set; }
    }
}
