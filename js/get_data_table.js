function getItems ($_TABLE) {

    return new Promise(function(resolve, reject) {
        $.ajax({
            url : '/get_all/' + $_TABLE,
            type : 'GET',
            success : function (result) {
                resolve(result);
            },
            error : function () {
                reject('error');
            }
        });
    });
}