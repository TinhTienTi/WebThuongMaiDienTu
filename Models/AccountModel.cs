using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Framework;
namespace Models
{
    public class AccountModel
    {
        private WebThuongMaiDienTu context = null;
        public AccountModel() {
            context = new WebThuongMaiDienTu();
        }
        public bool Login(string username, string password)
        {
            object[] sqlParams =
            {
                new SqlParameter("@Account", username),
                new SqlParameter("@Password", password)
            };
            var res = context.Database.SqlQuery<bool>("sp_Login @Account, @Password", sqlParams).SingleOrDefault();
            return res;
        }
    }
}
