//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProfileMVCApplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TblFileInfo
    {
        public int ImageID { get; set; }
        public string ImageName { get; set; }
        public string ImagePath { get; set; }
        public Nullable<int> Size { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<System.DateTime> CreateOn { get; set; }
    }
}
