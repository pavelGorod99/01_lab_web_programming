function getItems ($_TABLE) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url : '/01_lab_web_programming/get_all/' + $_TABLE,
            type : 'GET',
            success : function (result) {
                resolve(result);
            },
            error : function (error) {
                reject(error);
            }
        });
    });
}   