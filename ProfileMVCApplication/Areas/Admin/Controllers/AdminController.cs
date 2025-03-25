using ProfileMVCApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;



namespace ProfileMVCApplication.Areas.Admin.Controllers
{

    public class AdminController : Controller
    {
        AssessmentEntities EmpEntities = new AssessmentEntities();
        // GET: Admin/Admin
        public ActionResult Index()
        {
            return View();
        }

        #region Student_Master
        public ActionResult AddEmployee()
        {
            return View();  
        }
        public ActionResult SaveEmp(EmpManagement EmpInfoObj)
        {
            string Message = string.Empty;
            try
            {
                EmpEntities.EmpManagements.Add(EmpInfoObj);
                int z = EmpEntities.SaveChanges();
                if (z > 0)
                {
                    Message = "Success";
                }
                else
                {
                    Message = "Not Success";
                }
            }
            catch (Exception ex)
            {
                Message = Convert.ToString(ex.Message);
            }
            return Json(Message, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ViewEmployee()
        {
            return View();
        }
        public ActionResult GetEmpList()
        {
            try
            {
                var EmpList = (from test in EmpEntities.EmpManagements
                                   select new
                                   {
                                       test.EmpID,
                                       test.Name,
                                       test.Email,
                                       test.Address,
                                       test.Mobile
                                       
                                   }).ToList();
                return Json(new { EmpList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Convert.ToString(ex.Message));
            }

        }
        public ActionResult GetEmployeeDetails(int EmpID)
        {
            try
            {
                var EmployeeDetails = (from test in EmpEntities.EmpManagements
                                      where test.EmpID == EmpID
                                      select new
                                      {
                                          test.EmpID,
                                          test.Name,
                                          test.Email,
                                          test.Address,
                                          test.Mobile,
                                          
                                      }).FirstOrDefault();
                return Json(new { EmployeeDetails }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Convert.ToString(ex.Message));
            }
        }
        public ActionResult UpdateEmployee(EmpManagement EmployeeInfoObj)
        {
            string Message = string.Empty;
            try
            {
                var EmpDetails = (from test in EmpEntities.EmpManagements where test.EmpID == EmployeeInfoObj.EmpID select test).FirstOrDefault();
                EmpDetails.Name = EmployeeInfoObj.Name;
                EmpDetails.Email = EmployeeInfoObj.Email;
                EmpDetails.Address = EmployeeInfoObj.Address;
                EmpDetails.Mobile = EmployeeInfoObj.Mobile;
                
                
                int z = EmpEntities.SaveChanges();
                if (z > 0)
                {
                    Message = "Success";
                }
                else
                {
                    Message = "Not Success";
                }
                return Json(Message, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Convert.ToString(ex.Message));
            }
        }
        public ActionResult DeleteEmployeeRecord(int EmpID)
        {
            string Message = string.Empty;
            try
            {
                var EmpDetails = (from test in EmpEntities.EmpManagements where test.EmpID == EmpID select test).FirstOrDefault();
                EmpEntities.EmpManagements.Remove(EmpDetails);
                int z = EmpEntities.SaveChanges();
                if (z > 0)
                {
                    Message = "Success";
                }
                else
                {
                    Message = "Not Success";
                }
                return Json(Message, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Convert.ToString(ex.Message));
            }
        }

      

       

        #region FilterEmployee
         public ActionResult FilterEmployee() {
            return View();
         }
        public ActionResult GetEmployeeDetailsByName(string EmployeeName)
        {
            try
            {
                var EmployeeList = (from Emp in EmpEntities.EmpManagements
                                    
                                    where Emp.Name.ToLower().Contains(EmployeeName.ToLower())
                                    select new
                                    {
                                       
                                        Emp.Name,
                                        Emp.Email,
                                        Emp.Address,
                                        Emp.Mobile,
                                       
                                    }).ToList();
                return Json(EmployeeList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Convert.ToString(ex.Message));
            }
        }
        #endregion

        #endregion
    }
}