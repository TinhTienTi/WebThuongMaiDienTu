namespace Models.Framework
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class WebThuongMaiDienTu : DbContext
    {
        public WebThuongMaiDienTu()
            : base("name=WebThuongMaiDienTu")
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<EmployeeInfo> EmployeeInfoes { get; set; }
        public virtual DbSet<LocationDistrict> LocationDistricts { get; set; }
        public virtual DbSet<LocationProvince> LocationProvinces { get; set; }
        public virtual DbSet<LocationWard> LocationWards { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .Property(e => e.AccountName)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .Property(e => e.CreatedByUser)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .Property(e => e.ModifiedByUser)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.FullName)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.CitizenID)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.Phone)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.HouseNumber)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.RoadName)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.HomeTownHouseNumber)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.HomeTownRoadName)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.HomeTownWardName)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.HomeTownDistrictName)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeInfo>()
                .Property(e => e.HomeTownProvinceName)
                .IsUnicode(false);

            modelBuilder.Entity<LocationDistrict>()
                .Property(e => e.LetterCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<LocationDistrict>()
                .Property(e => e.DistrictName)
                .IsUnicode(false);

            modelBuilder.Entity<LocationDistrict>()
                .Property(e => e.DistrictNameFULL)
                .IsUnicode(false);

            modelBuilder.Entity<LocationProvince>()
                .Property(e => e.LetterCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<LocationProvince>()
                .Property(e => e.ProvinceName)
                .IsUnicode(false);

            modelBuilder.Entity<LocationProvince>()
                .Property(e => e.ProvinceNameFULL)
                .IsUnicode(false);

            modelBuilder.Entity<LocationProvince>()
                .Property(e => e.Region)
                .IsUnicode(false);

            modelBuilder.Entity<LocationWard>()
                .Property(e => e.LetterCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<LocationWard>()
                .Property(e => e.WardName)
                .IsUnicode(false);

            modelBuilder.Entity<LocationWard>()
                .Property(e => e.WardNameFull)
                .IsUnicode(false);

            modelBuilder.Entity<LocationWard>()
                .Property(e => e.WardNameFullVN)
                .IsUnicode(false);
        }
    }
}
