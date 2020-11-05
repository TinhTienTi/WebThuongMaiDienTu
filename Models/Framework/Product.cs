namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Product")]
    public partial class Product
    {
        public int ID { get; set; }

        [StringLength(200)]
        public string ProductName { get; set; }

        public int? ProducerID { get; set; }

        [StringLength(50)]
        public string ProdImage { get; set; }

        [StringLength(50)]
        public string ProdImage1 { get; set; }

        [StringLength(50)]
        public string ProdImage2 { get; set; }

        [StringLength(50)]
        public string ProdImage3 { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public int? QuantityInStock { get; set; }

        public double? Price { get; set; }

        public int? IsEnable { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(20)]
        public string CreatedBy { get; set; }

        [StringLength(4000)]
        public string Content { get; set; }

        public virtual Producer Producer { get; set; }
    }
}
