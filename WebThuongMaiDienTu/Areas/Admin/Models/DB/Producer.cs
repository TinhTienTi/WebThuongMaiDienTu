using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class GetProducer
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public int IsEnable { get; set; }
        public string Enable { get { switch (IsEnable) { case 0: return "Not Active"; case 1: return "Active"; } return "Không xácc định"; } }
        public DateTime? EndDate { get; set; }
        public static List<GetProducer> GetAllProducer()
        {
            using (IDbConnection conn = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                return conn.Query<GetProducer>("GetAllProducer", commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class Producer
    {
        public int Result { get; set; }
        public static List<Producer> Update(ParameterProducer model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Producer>("UpdateProducer", new { ID = model.ID, Name = model.Name, IsEnable = model.IsEnable }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public static List<Producer> Insert(ParameterProducer model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Producer>("InsertProducer", new { Name = model.Name }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public static List<Producer> Delete(ParameterProducer model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Producer>("DeleteProducer", new { ID = model.ID }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}