namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("AnhBia")]
    public partial class AnhBia
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string CoverName { get; set; }

        [Column(TypeName = "ntext")]
        public string Link { get; set; }
    }
}
