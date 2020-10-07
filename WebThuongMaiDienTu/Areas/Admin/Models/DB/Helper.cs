using System;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using Dapper;

namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class Helper
    {
        public static SqlConnection connDB = new SqlConnection(ConfigurationManager.ConnectionStrings["WebThuongMaiDienTu"].ConnectionString);
        public static string GetSqlConnection()
        {
            return System.Configuration.ConfigurationManager.ConnectionStrings["WebThuongMaiDienTu"].ConnectionString;
        }
        public static DataSet ExecuteDataset(string sql)
        {
            DataSet ds = new DataSet();
            SqlConnection conn = new SqlConnection(GetSqlConnection());
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.Fill(ds);
            conn.Close();
            conn.Dispose();
            da.Dispose();
            return ds;
        }
    }
    public class Converter
    {
        public static int ToInt(object obj)
        {
            return Convert.ToInt32(obj);
        }
        public static string ToString(object obj)
        {
            string valueReturn = "";
            if (obj != null)
            {
                valueReturn = Convert.ToString(obj);
                return valueReturn;
            }
            return valueReturn;
        }
        public static DateTime? ToDateTime(object obj)
        {
            DateTime? valueReturn = null;
            if (obj != null)
            {
                DateTime? returnDate = Convert.ToDateTime(obj);
                return returnDate;
            }
            return valueReturn;
        }
    }
}