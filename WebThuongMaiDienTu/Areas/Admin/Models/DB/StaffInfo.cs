using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class StaffInfo
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int IsEnable { get; set; }
        public string CitizenID { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDay { get; set; }
        public string Enable { get { switch (IsEnable) { case 1: return "Active"; } return "Not active"; } }
        public int EmployeeID { get; set; }
        public string HomeTown { get; set; }
        public string Location { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public StaffInfo() { }
        public static List<StaffInfo> GetALL()
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<StaffInfo>("ListEmployee", commandType: CommandType.StoredProcedure).ToList();
            }
        }
        public static List<StaffInfo> getByEmployeeId(ParameterInfo model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<StaffInfo>("GetEmployeeInfoByEmployeeID", new { EmployeeID = model.EmployeeID }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class StaffInfo_Parter
    {
        public int EmployeeID { get; set; }
        public int Result { get; set; }
        public string ResultString { get { switch (Result) { case 0: return "Nhân viên này đã được xoá"; case 1: return "Xoá nhân viên thành công"; } return "Mã nhân viên không tồn tại"; } }
        public StaffInfo_Parter() { }
        public StaffInfo_Parter(DataRow row)
        {
            Result = Converter.ToInt(row["Result"]);
        }
        public static List<StaffInfo_Parter> DeleteEmployeeByEmployeeId(ParameterInfo model)
        {
            List<StaffInfo_Parter> listStaff = new List<StaffInfo_Parter>();
            using (SqlConnection con = new SqlConnection(Helper.GetSqlConnection()))
            {
                SqlDataAdapter da = new SqlDataAdapter("Delete_EmployeeInfo", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                DataSet ds = new DataSet();
                da.SelectCommand.Parameters.AddWithValue("@EmployeeID", model.EmployeeID);
                da.Fill(ds);
                if (ds.Tables.Count > 0)
                {
                    StaffInfo_Parter item = null;
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        item = new StaffInfo_Parter(row);
                        listStaff.Add(item);
                    }
                }
            }
            return listStaff;
        }
    }
    public class Insert_Employee
    {
        public int Result { get; set; }
        public Insert_Employee() { }
        public Insert_Employee(DataRow row)
        {
            Result = Converter.ToInt(row["Result"]);
        }
        public static List<Insert_Employee> InsertEmployeeModel(ParameterInfo model)
        {
            List<Insert_Employee> inserts = new List<Insert_Employee>();
            using (SqlConnection con = new SqlConnection(Helper.GetSqlConnection()))
            {
                SqlDataAdapter da = new SqlDataAdapter("Insert_EmployeeInfo", con);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                DataSet ds = new DataSet();
                da.SelectCommand.Parameters.AddWithValue("@EmployeeID", model.EmployeeID);
                da.SelectCommand.Parameters.AddWithValue("@FullNameVN", model.FullNameVN);
                da.SelectCommand.Parameters.AddWithValue("@CitizenID", model.CitizenID == null ? "" : model.CitizenID);
                da.SelectCommand.Parameters.AddWithValue("@Phone", model.Phone == null ? "" : model.Phone);
                da.SelectCommand.Parameters.AddWithValue("@BirthDay", model.BirthDay);
                da.SelectCommand.Parameters.AddWithValue("@HouseNumber", model.HouseNumber == null ? "" : model.HouseNumber);
                da.SelectCommand.Parameters.AddWithValue("@RoadName", model.RoadName == null ? "" : model.RoadName);
                da.SelectCommand.Parameters.AddWithValue("@LocationWardID", model.LocationWardID);
                da.SelectCommand.Parameters.AddWithValue("@LocationDistrictId", model.LocationDistrictId);
                da.SelectCommand.Parameters.AddWithValue("@LocationProvinceId", model.LocationProvinceId);
                da.SelectCommand.Parameters.AddWithValue("@Email", model.Email == null ? "" : model.Email);
                da.SelectCommand.Parameters.AddWithValue("@HomeTownHouseNumber", model.HomeTownHouseNumber == null ? "" : model.HomeTownHouseNumber);
                da.SelectCommand.Parameters.AddWithValue("@HomeTownRoadName", model.HomeTownRoadName == null ? "" : model.HomeTownRoadName);
                da.SelectCommand.Parameters.AddWithValue("@HomeTownWardName", model.HomeTownWardName);
                da.SelectCommand.Parameters.AddWithValue("@HomeTownDistrictName", model.HomeTownDistrictName);
                da.SelectCommand.Parameters.AddWithValue("@HomeTownProvinceName", model.HomeTownProvinceName);
                da.Fill(ds);
                if (ds.Tables.Count > 0)
                {
                    Insert_Employee item = null;
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        item = new Insert_Employee(row);
                        inserts.Add(item);
                    }
                }
            }
            return inserts;
        }
    }
}