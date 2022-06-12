var bookCount = 0;

var offset = 0;

var searchFlag = false;

var pageCount = 0;

var currentPage = 1



function addNewItem () {

    let $_URL = '/01_lab_web_programming/add_book/' +  document.getElementById('title_new_book').value + "/" +
                                document.getElementById('nb_publish_house').value + "/" +
                                document.getElementById('nb_authors').value + "/" +
                                document.getElementById('nb_year').value + "/" +
                                document.getElementById('nb_page_nr_book').value + "/" +
                                document.getElementById('nb_price').value

    $.ajax({
        url: $_URL,
        type: 'POST',
        success: function () {
            insertDataIntoTable(0)
        }, error: function (err) {
            console.log('error: ' + err)
        }
    })
}

function editDeleteItem ($_ACTION, $_URL, result) {

    if ($_ACTION == "PUT") {

        $bookTitle = document.getElementById("title_book_" + result['id_book']).value;
        $bookAuthor = document.getElementById("authors_" + result['id_book']).value;
        $bookPublishingHouse = document.getElementById("publish_house_" + result['id_book']).value;
        $bookYear = document.getElementById("year_" + result['id_book']).value;
        $bookNrOfPages = document.getElementById("page_nr_" + result['id_book']).value;
        $bookDescription = document.getElementById("description_" + result['id_book']).value;
        $bookCategory = document.getElementById("category_" + result['id_book']).value;
        $bookPrice = document.getElementById("price_" + result['id_book']).value;

        $bookPath = '';
        if (document.getElementById("bookInputImage" + result['id_book']).files[0] != undefined)
            $bookPath = document.getElementById("bookInputImage" + result['id_book']).files[0].name;
        else $bookPath = document.getElementById("bookImage" + result['id_book']).getAttribute("src")

        $bookPath = $bookPath.split("/");

        $_URL += "/" +  $bookTitle + "/" + 
                        $bookAuthor + "/" +                 
                        $bookPublishingHouse + "/" + 
                        $bookYear + "/" + 
                        $bookNrOfPages + "/" +
                        $bookDescription + "/" +
                        $bookCategory + "/" +
                        $bookPrice + "/" +
                        $bookPath[1];
    } 

    $.ajax({
        url: $_URL,
        type: $_ACTION,
        success: function (result) {
            
            if ($_ACTION == "DELETE")
                console.log("The record was successfully deleted");
            else console.log("The record was updated successfully");

            insertDataIntoTable(offset);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function pagination($page) {

    currentPage = $page

    offset = ($page - 1) * 6

    let searchValue = document.getElementById('searchBookByTitle').value

    if (searchValue != null && searchValue != '' && searchValue.substring(0, 1) != ' ') {
        seacrhForABook(offset)
    } else {
        insertDataIntoTable(offset);
    }
}

function insertDataIntoTable($offset) {

    getBookCount().then(function(count) {

        getItems('publishing_house', -1).then(function(ph) {

            getItems('author', -1).then(function(author) {

                getItems('category', -1).then(function(category) {

                    getItems('book', $offset).then(function(result) {
    
                        bookCount = count[0]['COUNT(id_book)'];
        
                        insertIntoTable(ph, author, category, result);
        
                    }).catch(function(err) {
                        console.log(err)
                    })
                })
            }).catch(function(err) {
                console.log(err);
            });
        }).catch(function(err) {
            console.log(err);
        });
    }).catch(function(err) {
        console.log(err);
    });
}

function fileName($idBookImage) {
    let $event = document.getElementById($idBookImage);
    console.log($event.files[0].name);
}

function insertIntoTable(ph, author, category, result) {

    let $_publishing_house;

    let $_authors;

    let $_category;

    let $_rows = "";

    let $yearOption = "";

    let $years = new Array();

    for (let j = 0, i = new Date().getFullYear(); i >= 1950; i--, j++)
        $years[j] = i;
    
    for (let i = 0; i < result.length; i++) {
        $_rows +=   "<tr><td><div>"
                +   "<input type='text' class='form-control' value='" + result[i]['title'] + "' id='title_book_" + result[i]['id_book'] + "'>"
                +   "</div></td>";

        $_publishing_house = "<td><select class='form-select' name='publish_house' id='publish_house_" + result[i]['id_book'] + "'>";

        $publishingHouseName = ''
        for (let j = 0; j < ph.length; j++)
            if (ph[j]['Id_publishing_house'] == result[i]['publishing_house']) {
                $_publishing_house += "<option value='" + ph[j]['Id_publishing_house'] + "' selected>" + ph[j]['Name'] + "</option>";
                $publishingHouseName = ph[j]['Name']
            } else {
                $_publishing_house += "<option value='" + ph[j]['Id_publishing_house'] + "'>" + ph[j]['Name'] + "</option>";
            }

        $_publishing_house += "</select></td>";

        $_authors = "<td><select class='form-select' name='authors' id='authors_" + result[i]['id_book'] + "'>";

        $authorName = ''
        for (let j = 0; j < author.length; j++)
            if (author[j]['Id_author'] == result[i]['author']) {
                $_authors += "<option value='" + author[j]['Id_author'] +"' selected>" + author[j]['Name']  + "</option>";
                $authorName = author[j]['Name']
            } else {
                $_authors += "<option value='" + author[j]['Id_author'] +"'>" + author[j]['Name']  + "</option>";
            }

        $_authors += "</select></td>";

        $_category = "<td><select class='form-select' name='category' id='category_" + result[i]['id_book'] + "'>";

        $bookCategory = ''
        for (let j = 0; j < category.length; j++) {

            if (category[j]['Id_category'] == result[i]['category']) {
                $_category += "<option value='" + category[j]['Id_category'] +"' selected>" + category[j]['Name_category']  + "</option>";
                $bookCategory = category[j]['Name_category']
            } else {
                $_category += "<option value='" + category[j]['Id_category'] +"'>" + category[j]['Name_category']  + "</option>";
            }
        }

        $_category += "</select></td>";

        $yearOption = "<td><select class='form-select' name='year' id='year_" + result[i]['id_book'] + "'>";

        $bookYear = ''
        for (let j = 0; j < $years.length; j++) {

            if ($years[j] == result[i]['year']) {
                $yearOption += "<option value='" + $years[j] + "' selected>" + $years[j] + "</option>";
                $bookYear = $years[j]
            } else {
                $yearOption += "<option value='" + $years[j] + "'>" + $years[j] + "</option>";
            }
        }
            

        $yearOption += "</selection></td>";

        $delete_option = "DELETE";

        $url1 = "/01_lab_web_programming/delete_from_table_by_id/book/" + result[i]['id_book'];

        $edit_option = "PUT";

        $url2 = "/01_lab_web_programming/update_book/" + result[i]['id_book']

        $idBookImage = 'bookInputImage' + result[i]['id_book']



        $_rows +=   $_publishing_house + $_authors + $yearOption +
                    "<td><input class='form-control' type='number' value='" + result[i]['pages'] + "' id='page_nr_" + result[i]['id_book'] + "'></td>" +
                    "<td><input class='form-control' type='number' value='" + result[i]['price'] + "' id='price_" + result[i]['id_book'] + "'></td>" +
                    "<td><input class='form-control' type='text' value='" + result[i]['description'] + "' id='description_" + result[i]['id_book'] + "'></td>" +
                    $_category +
                    "<td>" + 
                    "<label class='custom-file-upload' style='display: flex; justify-content: center'>" + 
                    "<input class='form-control' type='file' value='" + result[i]['book_image'] + "' id='bookInputImage" + result[i]['id_book'] + "' onchange='fileName(\"" + $idBookImage + "\")' style='display: none'>" +
                    "<img src='" + result[i]['book_image'] + "' id='bookImage" + result[i]['id_book'] + "' height='48.5'>" + 
                    "</label>" +
                    "</td>" +
                    "<td>" + 
                        "<button class='btn btn-success me-2' onclick='editDeleteItem(\"" + $edit_option + "\", \"" + $url2 + "\", " + JSON.stringify(result[i]) + ")'><i class='bi bi-pencil'></i></button>" + 
                        "<button class='btn btn-danger me-2' onclick='editDeleteItem(\"" + $delete_option + "\", \"" + $url1 + "\")'><i class='bi bi-trash'></i></button>" + 
                        "<button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#staticBackdrop" + result[i]['id_book'] + "'><i class='bi bi-eye'></i></button>" +

                        "<div class='modal fade' id='staticBackdrop" + result[i]['id_book'] + "' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>" +
                        "<div class='modal-dialog'>" +
                          "<div class='modal-content'>" +
                            "<div class='modal-header'>" + 
                              "<h5 class='modal-title' id='staticBackdropLabel'>Book preview</h5>" +
                              "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>" +
                            "</div>" +
                            "<div class='modal-body'>" +
                                "<div class='container-fluid'>" +
                                    "<div class='row'>" + 
                                        "<div class='col-md-7'>" + 
                                            "<div class='pb-1'>Tilte: " + result[i]['title'] + "</div>" +
                                            "<div class='pb-1'>Author: " + $authorName + "</div>" +
                                            "<div class='pb-1'>Publishing house: " + $publishingHouseName + "</div>" +
                                            "<div class='pb-1'>Category: " + $bookCategory + " years old</div>" +
                                            "<div class='pb-1'>Year: " + $bookYear + "</div>" +
                                            "<div class='pb-1'>Pages: " + result[i]['pages'] + "</div>" +
                                            "<div class='pb-1'>Price: " + result[i]['price'] + "</div>" +
                                        "</div>" +
                                        "<div class='col-md-5'>" + 
                                            "<img src='" + result[i]['book_image'] + "' height='250'>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='pb-2'>Description: <br>" + result[i]['description'] + "</div>" +

                                "</div>" +

                                "<div class='modal-footer'>" +
                                "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>" +
                                // "<button type='button' class='btn btn-primary'>Understood</button>" +
                                 
                          "</div>" +
                        "</div>" +
                        "</div>" +

                    "</td></tr>";
    }

    document.getElementById('book_table').innerHTML =   '<table id="book_table" class="table align-middle">' + 
                                                        '<tr>' + 
                                                        '<th style="width: 13%">Title</th>' + 
                                                        '<th style="width: 12%">Publishing house</th>' +
                                                        '<th style="width: 13%">Author</th>' +
                                                        '<th style="width: 10%">Year</th>' +
                                                        '<th style="width: 7%">Pages</th>' +
                                                        '<th style="width: 7%">Price</th>' +
                                                        '<th style="width: 10%">Description</th>' +
                                                        '<th style="width: 10%">Category</th>' +
                                                        '<th style="width: 5%">Image</th>' +
                                                        '<th>Actions</th>' +
                                                        '</tr>' +
                                                        '</table>'
    $("#book_table").append($_rows);
    
    if (document.getElementById('new_book'))
        if (document.getElementById('new_book').checked) {

            let add_row =   "<tr><td>" +
                            "<input type='text' id='title_new_book'>" + 
                        "</td>" +
                        "<td><select name='nb_publish_house' id='nb_publish_house'>";

            $_ph_options1 = "";

            for (let i = 0; i < ph.length; i++)
                $_ph_options1 += "<option value=" + ph[i]['Id_publishing_house'] + ">" + ph[i]['Name'] + "</option>";

            $_ph_options1 += "</select></td>";

            $_authors1 = "<td><select name='nb_authors' id='nb_authors'>";

            for (let i = 0; i < author.length; i++)
                $_authors1 += "<option value='" + author[i]['Id_author'] +"' selected>" + author[i]['Name']  + "</option>";

            $_authors1 += "</select></td>"

            $yearOption = "<td><select name='nb_year' id='nb_year'>";

            for (let i = 0; i < $years.length; i++)
                $yearOption += "<option value='" + $years[i] + "'>" + $years[i] + "</option>";

            $yearOption += "</selection></td>";

            add_row += $_ph_options1 + $_authors1 + $yearOption + 
                    "<td><input type='number' id='nb_page_nr_book'></td>" +
                    "<td><input type='number' id='nb_price'></td></td>" +
                    "<td>" + 
                        "<button onclick='addNewItem()'>Add new book</button>" + 
                    "</td></tr>";

            $("#book_table").append(add_row);
        }

    pageCount = Math.ceil(bookCount / 6);
    let rowLi =     "<li class='page-item " + (currentPage == 1 ? "disabled" : "") + "'>" +
                    "<a class='page-link' href='#' aria-label='Previous' onclick='giveActivePage(1)'>" +
                    "<span aria-hidden='true'>&laquo;</span>" +
                    "</a>" +
                    "</li>";
    for (let i = 0; i < pageCount; i++) {

        if (i == (offset / 6))
            rowLi += "<li class='page-item active'><a class='page-link' href='#' onclick='pagination(" + (i + 1) + ")'>" + (i + 1) + "</a></li>";
        else rowLi += "<li class='page-item'><a class='page-link' href='#' onclick='pagination(" + (i + 1) + ")'>" + (i + 1) + "</a></li>";
    }

    rowLi +=    "<li class='page-item " + (currentPage == pageCount ? "disabled" : "") + "'>" +
                "<a class='page-link' href='#' aria-label='Next' onclick='giveActivePage(0)'>" +
                "<span aria-hidden='true'>&raquo;</span>" +
                "</a>" +
                "</li>";

    document.getElementById('pagination').innerHTML = '<ul class="pagination" id="pagination"></ul>';
    $("#pagination").append(rowLi);
}

function giveActivePage(direction) {

    // direction 1 - left && 0 - right

    currentPage = document.getElementsByClassName('active')
                        .item(0)
                        .getElementsByTagName('a')
                        .item(0).innerHTML

    if (direction == 0) {
        if (currentPage < pageCount) {
            currentPage = parseInt(currentPage) + 1
        }
    } else {
        if (currentPage > 1) {
            currentPage = parseInt(currentPage) - 1
        }
    } 

    pagination(currentPage)
}

function seacrhForABook($offset) {

    var $title = document.getElementById('searchBookByTitle').value

    getBookCountByTitle($title).then(function(count) {

        getItems('publishing_house', -1).then(function(ph) {

            getItems('author', -1).then(function(author) {

                getItems('category', -1).then(function(category) {

                    bookCount = count[0]['COUNT(id_book)'];
                
                    getItemsByTitle($title, $offset).then(function(books) {

                        insertIntoTable(ph, author, category, books);
                        searchFlag = true;
                    }).catch(function(err) {
                        console.log(err);
                    });

                }).catch(function(err) {
                    console.log(err);
                });
            })
        })
    })
}

$(document).ready(function() {
    insertDataIntoTable(0)
});