using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;
namespace WebThuongMaiDienTu.Areas.Admin.Models.DB
{
    public class Account
    {
        public int EmployeeID { get; set; }
        public string FullNameVN { get; set; }
        public string AccountName { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedByUser { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedByUser { get; set; }
        public static List<Account> GetAllAccounts()
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<Account>("GetAllAccount", commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
    public class AccountPartner: Account
    {
        public static List<AccountPartner> GetAllAccountByEmployeeId(ParameterInfo model)
        {
            using (IDbConnection db = new SqlConnection(Helper.GetSqlConnection()))
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                return db.Query<AccountPartner>("Get_AccountByEmployeeID", new { EmployeeID = model.EmployeeID }, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}