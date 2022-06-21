function getItems ($table, $offset) {

    return new Promise(function(resolve, reject) {
        $.ajax({
            url : '/Book_store/rest/get_all',
            type : 'POST',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data : {
                'table': $table,
                'offset': $offset
            },
            success : function (result) {
                resolve(result);
            },
            error : function (error) {
                reject(error);
                // UserService.logout();
            }
        });
    });
}

function getItemsByTitle($title, $offset) {

    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/Book_store/rest/get_by_title',
            type: 'POST',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: {
                'title' : $title,
                'offset': $offset
            },
            success: function (result) {
                resolve(result);
            },
            error: function (error) {
                reject(error);
                // UserService.logout();
            }
        })
    })
}

function getTableRowCount($table) {

    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/Book_store/rest/get_table_row_count',
            type: 'POST',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: {
                'table' : $table
            },
            success: function(count) {
                resolve(count);
            },
            error: function (error) {
                reject(error);
                // UserService.logout();
            }
        })
    })
}

function getBookCountByTitle($title) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/Book_store/rest/get_book_count_by_title',
            type: 'POST',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            data: {
                'title': $title
            },
            success: function(count) {
                resolve(count);
            },
            error: function (error) {
                reject(error);
                // UserService.logout();
            }
        })
    })
}