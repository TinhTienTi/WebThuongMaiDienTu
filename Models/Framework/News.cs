namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class News
    {
        public int ID { get; set; }

        [StringLength(100)]
        public string ImageNews { get; set; }

        [StringLength(100)]
        public string Header { get; set; }

        [Column(TypeName = "ntext")]
        public string Link { get; set; }

        [Column(TypeName = "ntext")]
        public string Content2 { get; set; }

        [Column(TypeName = "ntext")]
        public string Content3 { get; set; }

        [Column(TypeName = "ntext")]
        public string Content { get; set; }
    }
}
