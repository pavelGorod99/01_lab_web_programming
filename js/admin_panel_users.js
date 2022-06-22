var userCount = 0

function deleteUser($id) {

    $.ajax({
        url: "/Book_store/rest/delete_from_table_by_id/user/" + $id,
        type: "DELETE",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (result) {
            console.log(result);
            console.log("The record was successfully deleted");
            getUsers()
            // document.getElementById('toastText').innerHTML = 'The record was successfully deleted'
            // insertDataIntoTable(offset);
        },
        error: function (err) {
            console.log(err);
            // UserService.logout();
        }
    }); 
}

function insertIntoTable(users) {

    console.log(users);

    let $users = "<tbody>"

    for (let i = 0; i < users.length; i++) {
        $users +=   "<tr>" +
                    "<th scope='row'>" + (i + 1) + "</th>" + 
                    "<td>" +
                        "<div>" + 
                            users[i]['user_name'] +
                        "</div>" + 
                    "</td>" + 
                    "<td>" + 
                        "<div>" + 
                            users[i]['email'] + 
                        "</div>" + 
                    "</td>" + 
                    "<td>" +
                        "<div class='w-100 d-flex justify-content-center'>" +
                        "<button class='btn btn-danger me-2' onclick='deleteUser(\"" + users[i]['id_user'] + "\")'><i class='bi bi-trash'></i></button>" + 
                        "</div>" + 
                    "</td></tr>" 
    }

    $users += "</tbody>"

    document.getElementById('users-table').innerHTML =  
    '<thead>' +
        '<tr>' + 
        '<th scope="col">#</th>' +
        '<th scope="col">First</th>' +
        '<th scope="col">Email</th>' +
        '<th scope="col">Actions</th>' +
        '</tr>' +
    '</thead>'

    $('#users-table').append($users)
}

function getUsers() {
    getTableRowCount('user').then(function(result) {
        getItems('user', -1).then(function(users) {

            // console.log(users);
            userCount = result[0]['COUNT']
            insertIntoTable(users)
        })
    });
}

$(document).ready(function() {
    getUsers()
});