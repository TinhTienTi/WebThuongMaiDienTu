namespace Models.Framework
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Consumer")]
    public partial class Consumer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Consumer()
        {
            Orders = new HashSet<Order>();
        }

        public int ID { get; set; }

        [StringLength(150)]
        public string Name { get; set; }

        [StringLength(12)]
        public string CMND { get; set; }

        [StringLength(200)]
        public string Location { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        [StringLength(150)]
        public string Email { get; set; }

        [Column(TypeName = "date")]
        public DateTime? BirthDay { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? VipConsumerId { get; set; }

        public int? Score { get; set; }

        public short? IsEnable { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public long? AvailableBalances { get; set; }

        [StringLength(500)]
        public string UserName { get; set; }

        [StringLength(500)]
        public string Password { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
