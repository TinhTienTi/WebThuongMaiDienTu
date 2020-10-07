using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Framework;

namespace Models
{
    public class EmployeeInfoModel
    {

        private WebThuongMaiDienTu context = null;
        public EmployeeInfoModel()
        {
            context = new WebThuongMaiDienTu();
        }
        public List<EmployeeInfo> ListAll()
        {
            var list = context.Database.SqlQuery<EmployeeInfo>("Get_ListEmployeeInfo").ToList();
            return list;
        }
    }
}
