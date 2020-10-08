using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class GetVipConsumer
    {
        public int ID { get; set; }
        public string VipName { get; set; }
        public string Enable { get; set; }
        public DateTime? CreateDated { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedByUser { get; set; }
        public static List<GetVipConsumer> GetALL()
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<GetVipConsumer>("getAllVip", commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public static List<GetVipConsumer> GetVipConsumerByName(ParameterVip model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<GetVipConsumer>("getVipByName", new { VipName = model.VipName}, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class InsertVipConsumer
    {
        public int Result { get; set; }
        public static List<InsertVipConsumer> InsertVip(ParameterVip model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<InsertVipConsumer>("Insert_VipConsumer", new { VipName = model.VipName }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class UpdateVipConsumer
    {
        public int Result { get; set; }
        public static List<UpdateVipConsumer> UpdateVip(ParameterVip model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<UpdateVipConsumer>("UpdateVipConsumer", new { ID = model.ID, VipName = model.VipName }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class DeleteConsumer
    {
        public int Result { get; set; }
        public static List<DeleteConsumer> DeleteVip(ParameterVip model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<DeleteConsumer>("DeleteVipConsumer", new { ID = model.ID }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}