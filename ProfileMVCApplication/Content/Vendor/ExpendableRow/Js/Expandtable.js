﻿$(document).on('click', ".exploder", function () {
    $(this).toggleClass("btn-success btn-danger");

    $(this).children("span").toggleClass("glyphicon glyphicon-chevron-down");

    $(this).closest("tr").next("tr").toggleClass("hide");

    if ($(this).closest("tr").next("tr").hasClass("hide")) {
        $(this).closest("tr").next("tr").children("td").slideUp();
    }
    else {
        $(this).closest("tr").next("tr").children("td").slideDown(350);
    }
});