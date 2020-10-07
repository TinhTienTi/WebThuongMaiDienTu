using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class GetPronvince
    {
        public int ID { get; set; }
        public string ProvinceNameFULLVN { get; set; }
        public GetPronvince() { }
        public GetPronvince(DataRow row)
        {
            ID = Converter.ToInt(row["ID"]);
            ProvinceNameFULLVN = Converter.ToString(row["ProvinceNameFULLVN"]);
        }
        public static List<GetPronvince> GetAllProvince()
        {
            List<GetPronvince> getListPronvinces = new List<GetPronvince>();
            DataSet ds = Helper.ExecuteDataset("GET_All_Province");
            if (ds.Tables.Count > 0)
            {
                GetPronvince item = null;
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    item = new GetPronvince(row);
                    getListPronvinces.Add(item);

                }
            }
            return getListPronvinces;
        }
    }
    public class GetDistrict
    {
        public int DistrictID { get; set; }
        public string DistrictNameFULLVN { get; set; }
        public GetDistrict() { }
        public GetDistrict(DataRow row)
        {
            DistrictID = Converter.ToInt(row["DistrictID"]);
            DistrictNameFULLVN = Converter.ToString(row["DistrictNameFULLVN"]);
        }
        public static List<GetDistrict> GetDistrictByProvinceID(ParameterInfo model)
        {
            List<GetDistrict> listStaff = new List<GetDistrict>();
            using (SqlConnection con = new SqlConnection(Helper.GetSqlConnection()))
            {
                SqlDataAdapter da = new SqlDataAdapter("GET_ByProvinceID_District", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                DataSet ds = new DataSet();
                da.SelectCommand.Parameters.AddWithValue("@ProvinceID", model.ProvinceID);
                da.Fill(ds);
                if (ds.Tables.Count > 0)
                {
                    GetDistrict item = null;
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        item = new GetDistrict(row);
                        listStaff.Add(item);
                    }
                }
            }
            return listStaff;
        }
    }
    public class GetWard
    {
        public int ID { get; set; }
        public string WardNameFullVN { get; set; }
        public GetWard() { }
        public GetWard(DataRow row)
        {
            ID = Converter.ToInt(row["ID"]);
            WardNameFullVN = Converter.ToString(row["WardNameFullVN"]);
        }
        public static List<GetWard> GetWardByDistrictID(ParameterInfo model)
        {
            List<GetWard> gets = new List<GetWard>();
            using (SqlConnection con = new SqlConnection(Helper.GetSqlConnection()))
            {
                SqlDataAdapter da = new SqlDataAdapter("Get_Ward_ByDistrictID", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                DataSet ds = new DataSet();
                da.SelectCommand.Parameters.AddWithValue("@DistrictID", model.DistrictID);
                da.Fill(ds);
                if (ds.Tables.Count > 0)
                {
                    GetWard item = null;
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        item = new GetWard(row);
                        gets.Add(item);
                    }
                }
            }
            return gets;
        }
    }
}