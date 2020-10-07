using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;
namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class Category
    {
        public int ID { get; set; }
        public string CateName { get; set; }
        public static List<Category> GetAllCatefory()
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Category>("GET_All_Category", commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public static List<Category> GetCateforyByCateName(ParameterCate model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Category>("GetCategoryByCateName", new { CateName = model.CateName }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class InsertCate
    {
        public int Result { get; set; }
        public static List<InsertCate> InsertCategory(ParameterCate model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<InsertCate>("Insert_Category", new { CateName = model.CateName }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class UpdateCate
    {
        public int Result { get; set; }
        public static List<UpdateCate> UpdateCategory(ParameterCate model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<UpdateCate>("Update_Category", new { ID = model.ID, CateName = model.CateName }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class DeleteCate
    {
        public int Result { get; set; }
        public static List<DeleteCate> DeleteCategory(ParameterCate model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<DeleteCate>("Delete_Category", new { ID = model.ID }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
} 