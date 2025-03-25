var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
}

// Business
function bindBusinessddl() {
    $("#txtBusinessConstitution").select2();
    $("#ddlTaxpayerType").select2();
}
function bindBusinessTbl() {
    $.ajax({
        type: "POST",
        url: '/BusinessManagement/ShowBusinesstbl',
        data: '{ "Type": "1", "dataID": "0" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            console.log(data);
            $('#tblBusiness tbody').empty();
            if (data.length > 0) {
                $.each(data, function (rowIndex, r) {
                    $('#tblBusiness tbody').append("<tr><td><i class='fa fa-pencil IconBusinessEdit' data-ID=" + r.Id + "></i></td><td>" + r.Name + "</td><td>" + r.PanNo + "</td><td>" + r.RegistrationDate + "</td><td>" + r.ConstitutionID + "</td><td>" + r.TaxPayerID + "</td></tr>");
                });
            }
            //dataTableinit("tblBusiness", true, 10);
            $('#tblBusiness').DataTable();
        }
    });
}
$(document).on('click', '#btn-businessSave', function () {
    var _BusinessID = $('#hdnBusinessID').val();
    var _BusinessName = $('#txtBusinessName').val();
    var _BusinessPanNo = $('#txtBusinessPanNo').val();
    var _BusinessdtReg = $('#dtBusinessRegistration').val();
    var _BusinessConstitution = $('#txtBusinessConstitution').val();
    var _BusinessTaxpayer = $('#ddlTaxpayerType').val();

    if (window.FormData !== undefined) {
        var fileData = new FormData();
        var fileUpload = $("#UploadedBusinessLogo").get(0);
        var files = fileUpload.files;
        if (files.length > 0) {
            fileData.append(files[0].name, files[0]);
        }
        fileData.append("_BusinessID", _BusinessID);
        fileData.append("_BusinessName", _BusinessName);
        fileData.append("_BusinessPanNo", _BusinessPanNo);
        fileData.append("_BusinessdtReg", _BusinessdtReg);
        fileData.append("_BusinessConstitution", _BusinessConstitution);
        fileData.append("_BusinessTaxpayer", _BusinessTaxpayer);

        $.ajax({
            url: '/BusinessManagement/SaveBusiness',
            type: "POST",
            contentType: false,
            processData: false,
            data: fileData,
            success: function (data) {
                bindBusinessTbl();
                ClearBusinessForm();
                if (data == 'Yes') {
                    // Show success message
                }
                else {
                    // Show Error message
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }
    else {
        alert("FormData is not supported.");
    }
});
$(document).on('click', '.IconBusinessEdit', function () {
    var dataID = $(this).attr('data-ID');
    $.ajax({
        type: "POST",
        url: '/BusinessManagement/ShowBusinesstbl',
        data: '{ "Type": "2", "dataID": "' + dataID + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if (data.length > 0) {
                $('#hdnBusinessID').val(data[0].Id);
                $('#txtBusinessName').val(data[0].Name);
                $('#txtBusinessPanNo').val(data[0].PanNo);
                $('#dtBusinessRegistration').val(data[0].RegistrationDate);
                $("#ddlTaxpayerType").select2("val", data[0].TaxPayerID);
                $("#txtBusinessConstitution").select2("val", data[0].ConstitutionID);
            }
        }
    });
});
function ClearBusinessForm() {
    $('#hdnBusinessID').val('0');
    $('#txtBusinessName').val('');
    $('#txtBusinessPanNo').val('');
    $('#dtBusinessRegistration').val('');
    $('#ddlTaxpayerType').val('-1').trigger('change');
    $('#txtBusinessConstitution').val('-1').trigger('change');
}

// Business Unit
function bindBusinessUnitddl() {
    $("#ddlBusinessName").select2();
    $("#ddlBusinessUnitConstitution").select2();
    $("#ddlBusinessUnitNature").select2();
    $("#ddlTaxpayerType").select2();
    $("#ddlBusinessUnitState").select2();
    $("#ddlBusinessUnitStatus").select2();
}
function EditBisunessData(BuID) {
    $.ajax({
        type: "POST",
        url: '/BusinessManagement/EditBusinessUnit',
        data: '{ "BuID": ' + BuID + ' }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            console.log(data.BusinessUnitAddressList);
            console.log(data.BusinessUnitAddressList.length);
            $('#hdnBusinessUnitID').val(data.BusinessUnitProfileList[0].Id);
            $('#txtGSTIN').val(data.BusinessUnitProfileList[0].GSTIN);
            $('#txtBusinessUnitName').val(data.BusinessUnitProfileList[0].UnitName);
            $('#txtGSTUserName').val(data.BusinessUnitProfileList[0].GSTUserName);
            $('#txtBusinessUnitPan').val(data.BusinessUnitProfileList[0].PanNo);
            $('#txtBusinessUnitGrsturnover').val(data.BusinessUnitProfileList[0].LastYearGrossTrunOver);
            $('#dtBusinessUnitRegistration').val(data.BusinessUnitProfileList[0].RegistrationDate);
            $("#ddlBusinessName").select2("val", data.BusinessUnitProfileList[0].BusinessID);
            $("#ddlBusinessUnitConstitution").select2("val", data.BusinessUnitProfileList[0].ConstructionID);
            $("#ddlBusinessUnitNature").select2("val", data.BusinessUnitProfileList[0].NatureOfBusiness);
            $("#ddlTaxpayerType").select2("val", data.BusinessUnitProfileList[0].TaxPayerType);
            $("#ddlBusinessUnitState").select2("val", data.BusinessUnitProfileList[0].State);
            $("#ddlBusinessUnitStatus").select2("val", data.BusinessUnitProfileList[0].StatusID);

            var count = 0;
            if (data.BusinessUnitAddressList.length > 0) {
                for (var x = 1; x <= data.BusinessUnitAddressList.length; x++) {
                    if (count != 0)
                        $('.btn-moreaddress').click();

                    $('#txtBuildingNo_' + x).val(data.BusinessUnitAddressList[x - 1].BuildingNo);
                    $('#txtStreetName_' + x).val(data.BusinessUnitAddressList[x - 1].Street);
                    $('#txtSectorArea_' + x).val(data.BusinessUnitAddressList[x - 1].Sector);
                    $('#ddlCity_' + x).val(data.BusinessUnitAddressList[x - 1].CityID);
                    $('#txtPinCode_' + x).val(data.BusinessUnitAddressList[x - 1].PinCode);
                    count++;
                }
            }

            var cnct = 0;
            if (data.BusinessUnitContactList.length > 0) {
                for (var x = 1; x <= data.BusinessUnitContactList.length; x++) {
                    if (cnct != 0)
                        $('.btn-morecontact').click();

                    $('#txtPrincipalName_' + x).val(data.BusinessUnitContactList[x - 1].PrincipalName);
                    $('#txtEmail_' + x).val(data.BusinessUnitContactList[x - 1].EmailID);
                    $('#txtPhone_' + x).val(data.BusinessUnitContactList[x - 1].PhoneNo);
                    $('#txtDesignation_' + x).val(data.BusinessUnitContactList[x - 1].Designation);
                    cnct++;
                }
            }

        }
    });
}
function ClearBusinessUnitForm() {
    $('input[type="text"]').val('');
    $('#hdnBusinessUnitID').val('0');
    $('select').val('-1').trigger('change');
}