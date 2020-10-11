using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class GetProduct
    {
        public int ID { get; set; }
        public string ProductName { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string ProdImage { get; set; }
        public string ProdImage1 { get; set; }
        public string ProdImage2 { get; set; }
        public string ProdImage3 { get; set; }
        public int QuantityInStock { get; set; }
        public float Price { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public static List<GetProduct> GetAllProduct()
        {
            using (IDbConnection conn = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                return conn.Query<GetProduct>("GetAllProduct", commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class Product
    {
        public int Result { get; set; }
        public static List<Product> Update(ParameterProduct model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Product>("UpdateProduct", new {
                    ID = model.ID,
                    ProductName = model.ProductName,
                    ProducerID = model.ProducerID,
                    Content = model.Content,
                    ProdImage = model.ProdImage,
                    ProdImage1 = model.ProdImage1,
                    ProdImage2 = model.ProdImage2,
                    ProdImage3 = model.ProdImage3,
                    QuantityInStock = model.QuantityInStock,
                    Price = model.Price,
                    IsEnable = model.IsEnable
                }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public static List<Product> Insert(ParameterProduct model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Product>("Insert_Product", new {
                    ProductName = model.ProductName,
                    ProducerID = model.ProducerID,
                    Content = model.Content,
                    ProdImage = model.ProdImage,
                    ProdImage1 = model.ProdImage1,
                    ProdImage2 = model.ProdImage2,
                    ProdImage3 = model.ProdImage3,
                    QuantityInStock = model.QuantityInStock,
                    Price = model.Price
                }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public static List<Product> Delete(ParameterProduct model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Product>("DeleteProduct", new { ID = model.ID }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}