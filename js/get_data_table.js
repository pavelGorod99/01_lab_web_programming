function getItems ($table, $offset) {

    return new Promise(function(resolve, reject) {
        $.ajax({
            url : '/Book_store/rest/get_all',
            type : 'POST',
            data : {
                'table': $table,
                'offset': $offset
            },
            success : function (result) {
                resolve(result);
            },
            error : function (error) {
                reject(error);
            }
        });
    });
}

function getItemsByTitle($title, $offset) {

    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/Book_store/rest/get_by_title',
            type: 'POST',
            data: {
                'title' : $title,
                'offset': $offset
            },
            success: function (result) {
                resolve(result);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

function getBookCount() {

    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/Book_store/rest/get_book_count',
            type: 'POST',
            success: function(count) {
                resolve(count);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

function getBookCountByTitle($title) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/Book_store/rest/get_book_count_by_title',
            type: 'POST',
            data: {
                'title': $title
            },
            success: function(count) {
                resolve(count);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}