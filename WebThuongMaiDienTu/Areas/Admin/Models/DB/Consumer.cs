using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class GetConsumer
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string CMND { get; set; }
        public string Location { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime? BirthDay { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string VipName { get; set; }
        public string Enable { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public static List<GetConsumer> GetAllConsumer()
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<GetConsumer>("GetConsumer", commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class InsertConsumer
    {
        public int Result { get; set; }
        public static List<InsertConsumer> Insert(ParameterConsumer model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<InsertConsumer>("InsertConsumer", new
                {
                    Name = model.Name,
                    CMND = model.CMND,
                    Location = model.Location,
                    Phone = model.Phone,
                    Email = model.Email,
                    BirthDay = model.BirthDay
                }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class UpdateConsumer
    {
        public int Result { get; set; }
        public static List<UpdateConsumer> Update(ParameterConsumer model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<UpdateConsumer>("UpdateConsumer", new
                {
                    ID = model.Id,
                    Name = model.Name,
                    CMND = model.CMND,
                    Location = model.Location,
                    Phone = model.Phone,
                    Email = model.Email,
                    BirthDay = model.BirthDay
                }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class DeleteConsumer
    {
        public int Result { get; set; }
        public static List<DeleteConsumer> Delete(ParameterConsumer model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<DeleteConsumer>("DeleteConsumer", new
                {
                    ID = model.Id
                }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}