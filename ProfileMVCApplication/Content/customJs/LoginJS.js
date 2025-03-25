$('#btnLogin').on('click', function (e) {
    var _Username = $.trim($('#txtUserName').val());
    var _Password = $.trim($('#txtPassword').val());
    if (_Username == '') {
        $("#txtUserName").focus();
        return false;
    } else
        if (_Password == '') {
            $("#txtPassword").focus();
            return false;
        }
        else {
            $('.login').addClass('loading');
            $('.state').html('Authenticating');
            $.ajax({
                type: 'POST',
                data: { _Username: _Username, _Password: _Password },
                url: '/Login/CheckLogin',
                success: function (response) {
                    if (response == "Yes") {
                        $('.login').addClass('ok');
                        var URL = '/Dashboard/Index';
                        window.location.href = URL;
                    }
                    else {
                        $('.state').html(response);
                        $('.login').removeClass('ok').addClass('cancel');
                        setTimeout(function () {
                            $('.login').removeClass('cancel loading');
                            $('.state').html('Log in');
                            $('#txtPassword').val('');
                            $("#txtUserName").focus();
                        }, 2000);
                    }
                },
                error: function (error) {
                    console.log(error);
                    $('.state').html('Invalid User');
                    $('.login').removeClass('ok').addClass('cancel');
                    $('.login').removeClass('cancel loading');
                    $('.state').html('Log in');
                }
            });
        }
});