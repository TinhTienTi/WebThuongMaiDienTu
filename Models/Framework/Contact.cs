namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Contact")]
    public partial class Contact
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string ConsumerName { get; set; }

        [StringLength(50)]
        public string Emai { get; set; }

        [Column(TypeName = "ntext")]
        public string Content { get; set; }
    }
}
