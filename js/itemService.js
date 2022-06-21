var bookCount = 0;

var offset = 0;

var searchFlag = false;

var pageCount = 0;

var currentPage = 1

var bookEditImagePath = ''

function editItem($idBook) {

    $inputImage = document.getElementById("bookInputImage" + $idBook)
    $form = document.getElementById("form" + $idBook)
    var fd = new FormData($form);

    if ($inputImage.files[0] == undefined) {
        $imageSrc = document.getElementById("bookImage" + $idBook).getAttribute("src")
        $imageSrc = $imageSrc.split("/");
        fd.append('image', $imageSrc[2])
    }

    $.ajax({
        url: "/Book_store/rest/update_book",
        type: "POST",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        data:  fd,
        success: function (result) {
            
            console.log(result);
            URL.revokeObjectURL(imgObject)
            $("#liveToast1").toast('show');
            console.log("The record was updated successfully");
            insertDataIntoTable(offset);
        },
        error: function (err) {
            console.log(err);
            // UserService.logout();    
        },
        processData: false,
        contentType: false
    });
}

function deleteBook ($bookId) {

    $.ajax({
        url: "/Book_store/rest/delete_from_table_by_id/book/" + $bookId,
        type: "DELETE",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        success: function (result) {
            console.log(result);
            console.log("The record was successfully deleted");
            document.getElementById('toastText').innerHTML = 'The record was successfully deleted'
            $("#liveToast1").toast('show');
            insertDataIntoTable(offset);
        },
        error: function (err) {
            console.log(err);
            // UserService.logout();
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

    getTableRowCount('book').then(function(count) {

        getItems('publishing_house', -1).then(function(ph) {

            getItems('author', -1).then(function(author) {

                getItems('category', -1).then(function(category) {

                    getItems('book', $offset).then(function(result) {

                        bookCount = count[0]['COUNT'];
        
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

var imgObject

var oldOneImage

var oldOneIdImage

function fileName($idInput, $idImage) {

    let $event = document.getElementById($idInput);
    let obj = URL.createObjectURL($event.files[0]);
    document.getElementById($idImage).src = obj;
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
        $_rows +=   "<tr>" +
                    "<td>" + 
                        "<div>" +
                            result[i]['title'] +
                        "</div>" + 
                    "</td>";

        $publishingHouseId = -1;
        $_publishing_house =    "<td class='d-none d-lg-block-table-cell d-xl-block-table-cell p-table-column'>" +
                                "<div>";

        $publishingHouseName = ''
        for (let j = 0; j < ph.length; j++) {

            if (ph[j]['Id_publishing_house'] == result[i]['publishing_house']) {
                $_publishing_house = $_publishing_house + ph[j]['Name'];
                $publishingHouseName = ph[j]['Name']
                $publishingHouseId = ph[j]['Id_publishing_house']
            }
        }

        $_publishing_house += "</div></td>";

        $authorId = -1
        $_authors = "<td class='d-none d-lg-block-table-cell d-xl-block-table-cell a-table-column'>" + 
                    "<div>";

        $authorName = ''
        for (let j = 0; j < author.length; j++) {

            if (author[j]['Id_author'] == result[i]['author']) {
                $_authors = $_authors + author[j]['Name']
                $authorName = author[j]['Name']
                $authorId = author[j]['Id_author']
            }
        }

        $_authors += "</div></td>";

        $_category =    "<td style='text-align: center' class='d-none d-lg-block-table-cell d-xl-block-table-cell sm-table-coolumns'>" + 
                        "<div>";

        $categoryId = -1
        $bookCategory = ''
        for (let j = 0; j < category.length; j++) {

            if (category[j]['Id_category'] == result[i]['category']) {
                $_category = $_category + category[j]['Name_category'];
                $bookCategory = category[j]['Name_category']
                $categoryId = category[j]['Id_category']
            }
        }

        $_category += "</div></td>";

        $yearOption = "<td class='d-none d-lg-block-table-cell d-xl-block-table-cell sm-table-coolumns'>" +
                        "<div>";

        $bookYear = ''
        for (let j = 0; j < $years.length; j++) {

            if ($years[j] == result[i]['year']) {
                $yearOption = $yearOption + $years[j]
                $bookYear = $years[j]
            }
        }
            

        $yearOption += "</div></td>";

        $delete_option = "DELETE";

        // $url1 = "/Book_store/delete_from_table_by_id/book/" + result[i]['id_book'];

        $edit_option = "PUT";

        // $url2 = "/Book_store/update_book/" + result[i]['id_book']

        $idBookImage = 'bookInputImage' + result[i]['id_book']

        oldOneImage = result[i]['book_image']

        $_rows +=   
                    $_publishing_house + 
                    $_authors + 
                    $yearOption +
                    "<td style='text-align: center' class='d-none d-lg-block-table-cell d-xl-block-table-cell sm-table-coolumns'>" +
                        "<div>" +
                            result[i]['pages'] + 
                        "</div>" +
                    "</td>" +
                    $_category +
                    "<td>" + 
                        
                        "<div class='w-100 d-flex justify-content-center'>" + 
                            "<button class='btn btn-success me-2' data-bs-toggle='modal' data-bs-target='#staticBackdrop" + result[i]['id_book'] + "Edit'><i class='bi bi-pencil'></i></button>" + 
                            "<button class='btn btn-danger me-2' data-bs-toggle='modal' data-bs-target='#bookDeleteModal" + result[i]['id_book'] +"'><i class='bi bi-trash'></i></button>" + 
                            "<button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#staticBackdrop" + result[i]['id_book'] + "'><i class='bi bi-eye'></i></button>" +
                        "</div>" +
                        BookModal(  result[i], 
                                    $authorName, 
                                    $publishingHouseName, 
                                    $bookCategory, 
                                    $bookYear, 
                                    1,
                                    ph,
                                    author,
                                    category,
                                    $years
                                    ) +

                        BookModal(  result[i], 
                                    $authorName, 
                                    $publishingHouseName, 
                                    $bookCategory, 
                                    $bookYear, 
                                    0
                                    ) +

                        ModalHtmlDeleteBook(result[i]['id_book'], result[i]['title']) +

                    "</td></tr>";
    }

    document.getElementById('book_table').innerHTML =   '<table id="book_table" class="table align-middle">' + 
                                                        '<tr>' + 
                                                        '<th>Title</th>' + 
                                                        '<th class="d-none d-lg-block-table-cell d-xl-block-table-cell p-table-column">Publishing house</th>' +
                                                        '<th class="d-none d-lg-block-table-cell d-xl-block-table-cell a-table-column">Author</th>' +
                                                        '<th class="d-none d-lg-block-table-cell d-xl-block-table-cell sm-table-coolumns">Year</th>' +
                                                        '<th style="text-align: center" class="d-none d-lg-block-table-cell d-xl-block-table-cell sm-table-coolumns">Pages</th>' +
                                                        '<th style="text-align: center" class="d-none d-lg-block-table-cell d-xl-block-table-cell sm-table-coolumns">Category</th>' +
                                                        '<th style="text-align: center" class="actions">Actions</th>' +
                                                        '</tr>' +
                                                        '</table>'
    $("#book_table").append($_rows);

    pageCount = Math.ceil(bookCount / 6);
    let rowLi =     "<li class='page-item " + (currentPage == 1 ? "disabled" : "") + "'>" +
                    "<a class='page-link' href='#' aria-label='Previous' onclick='giveActivePage(1)'>" +
                    "<span aria-hidden='true'>&laquo;</span>" +
                    "</a>" +
                    "</li>";
    for (let i = 0; i < pageCount; i++) {

        if (i == (offset / 6)) {
            rowLi += "<li class='page-item active'><a class='page-link' href='#' onclick='pagination(" + (i + 1) + ")'>" + (i + 1) + "</a></li>";
        } else {
            rowLi += "<li class='page-item'><a class='page-link' href='#' onclick='pagination(" + (i + 1) + ")'>" + (i + 1) + "</a></li>";
        }
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
    currentPage = document.getElementsByClassName('page-item active')
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

    if ($title != '' && $title.charAt(0) != ' ' && $title.length >= 2) {

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
    } else {

        insertDataIntoTable(0)
    }
}

$(document).ready(function() {

    console.log("TOKEN: " + localStorage.getItem('token'));

    $("#searchBookByTitle").on("input", function(e) {
        seacrhForABook(0)
    })

    insertDataIntoTable(0)
});

function updatedToast() {
    return "<div class='position-fixed top-0 end-0 p-3 bg-success' style='z-index: 11' id='ftoast'>" +
                "<div id='liveToast' class='toast' role='alert' aria-live='assertive' aria-atomic='true'>" +
                "<div class='toast-body'>" +
                    "<div class='alert alert-success' role='alert'>" +
                        "The record was updated successfully" +
                    "</div>" +
                "</div>" +
                "</div>" +
            "</div>";
}

function BookModal($book, $authorName, $publishingHouseName, $bookCategory, $bookYear, $option, 
    ph = -1,
    author = -1,
    category = -1,
    $years = -1) {

    $modalTitle = ''
    $idModal = -1

    if ($option == 1) {

        $html = "<form id='form" + $book['id_book'] + "' action='/update_book' method='post' enctype='multipart/form-data'>" + 
                    "<div class='row'>" + 

                        "<div class='mb-3 w-100'>" +
                            "<input type='hidden' name='id' id='bookId" + $book['id_book'] + "' value='" + $book['id_book'] + "'>" + 
                        "</div>" + 

                        "<div class='mb-3 w-100'>" +
                            "<label for='title_book_" + $book['id_book'] + "' class='form-label'>Title book</label>" + 
                            "<input type='text' class='form-control w-100' name='title_book' id='title_book_" + $book['id_book'] + "' value='" + $book['title'] + "'>" + 
                        "</div>" + 

                        "<div class='mb-3 w-100'>" +
                            "<label for='publish_house_" + $book['id_book'] + "' class='form-label'>Publishing house</label>" + 
                            "<select class='form-select w-100' name='publish_house' id='publish_house_" + $book['id_book'] + "'>";

        for (let j = 0; j < ph.length; j++) {

            if (ph[j]['Id_publishing_house'] == $book['publishing_house']) {
                $html = $html + "<option value='" + ph[j]['Id_publishing_house'] + "' selected>" + ph[j]['Name'] + "</option>";
            } else {
                $html = $html + "<option value='" + ph[j]['Id_publishing_house'] + "'>" + ph[j]['Name'] + "</option>";
            }
        }
        
        $html = $html +     "</select>" + 
                        "</div>" +

                        "<div class='mb-3 w-100'>" +
                            "<label for='author_" + $book['id_book'] + "' class='form-label'>Author</label>" + 
                            "<select class='form-select w-100' name='author' id='authors_" + $book['id_book'] + "'>";

        for (let j = 0; j < author.length; j++) {

            if (author[j]['Id_author'] == $book['author']) {
                $html = $html + "<option value='" + author[j]['Id_author'] +"' selected>" + author[j]['Name']  + "</option>";
            } else {
                $html = $html + "<option value='" + author[j]['Id_author'] +"'>" + author[j]['Name']  + "</option>";
            }
        }

        $html = $html +     "</select>" + 
                        "</div>" +

                        "<div class='mb-3 w-100'>" +
                            "<label for='category_" + $book['id_book'] + "' class='form-label'>Category</label>" + 
                            "<select class='form-select w-100' name='category' id='category_" + $book['id_book'] + "'>";

        for (let j = 0; j < category.length; j++) {

            if (category[j]['Id_category'] == $book['category']) {
                $html = $html + "<option value='" + category[j]['Id_category'] +"' selected>" + category[j]['Name_category']  + "</option>";
            } else {
                $html = $html + "<option value='" + category[j]['Id_category'] +"'>" + category[j]['Name_category']  + "</option>";
            }
        }   

        $html = $html +     "</select>" + 
                        "</div>" +

                        "<div class='mb-3 w-100'>" +
                            "<label for='year_" + $book['id_book'] + "' class='form-label'>Year</label>" + 
                            "<select class='form-select w-100' name='year' id='year_" + $book['id_book'] + "'>";

        for (let j = 0; j < $years.length; j++) {

            if ($years[j] == $book['year']) {
                $html = $html + "<option value='" + $years[j] + "' selected>" + $years[j] + "</option>";
            } else {
                $html = $html + "<option value='" + $years[j] + "'>" + $years[j] + "</option>";
            }
        }

        $idBookImage = 'bookInputImage' + $book['id_book']

        bookEditImagePath = $book['book_image']

        imageID = "bookImage" + $book['id_book']

        labelImageId = "labelImage" + $book['id_book']

        $html =     $html + "</select>" + 
                        "</div>" +

                        "<div class='mb-3 w-100'>" +
                            "<label for='page_nr_" + $book['id_book'] + "' class='form-label'>Pages</label>" + 
                            "<input class='form-control' type='number' name='pages' value='" + $book['pages'] + "' id='page_nr_" + $book['id_book'] + "'>" +
                        "</div>" +

                        "<div class='mb-3 w-100'>" +
                            "<label for='price_" + $book['id_book'] + "' class='form-label'>Price</label>" + 
                            "<input class='form-control' type='number' name='price' value='" + $book['price'] + "' id='price_" + $book['id_book'] + "'>" +
                        "</div>" +

                        "<div class='mb-3 w-100'>" +
                            "<label for='description_" + $book['id_book'] + "' class='form-label'>Description</label>" + 
                            "<input class='form-control' type='text' name='description' value='" + $book['description'] + "' id='description_" + $book['id_book'] + "'>" +
                        "</div>" +

                        "<div class='mb-3 w-100'>" +

                            "<label for='labelImage" + $book['id_book'] + "' class='form-label w-100'>Book image1<br>(click on image to chose another one)</label>" + 

                            "<label id='labelImage" + $book['id_book'] + "' class='custom-file-upload'>" + 
                                "<input class='form-control' type='file' name='image' value='" + $book['book_image'] + "' id='bookInputImage" + $book['id_book'] + "' onchange='fileName(\"" + $idBookImage + "\", \"" + imageID + "\")' style='display: none'>" +
                                "<img src='../" + bookEditImagePath + "' id='" + imageID + "' height='200'>" + 
                            "</label>" +

                        "</div>" +

                    "</div>" +
                "</form>"

        $modalTitle = 'Book edit'
        $idModal = $book['id_book'] + 'Edit'

    } else {

        $html = "<div class='row'>" + 
                                    
                    "<div class='col-md-7 col-lg-7'>" + 
                        "<div class='pb-1 text-custom'>Tilte: " + $book['title'] + "</div>" +
                        "<div class='pb-1 text-custom'>Author: " + $authorName + "</div>" +
                        "<div class='pb-1 text-custom'>Publishing house: " + $publishingHouseName + "</div>" +
                        "<div class='pb-1 text-custom'>Category: " + $bookCategory + " years old</div>" +
                        "<div class='pb-1 text-custom'>Year: " + $bookYear + "</div>" +
                        "<div class='pb-1 text-custom'>Pages: " + $book['pages'] + "</div>" +
                        "<div class='pb-1 text-custom'>Price: " + $book['price'] + "</div>" +
                    "</div>" +

                    "<div class='col-md-5 col-lg-5'>" + 
                        "<img src='../" + $book['book_image'] + "' height='250' style='height: 250px!important; width: auto!important; border-radius: 0!important'>" +
                    "</div>" +

                "</div>" +

                "<div class='pb-2'>Description: <br>" + $book['description'] + "</div>"

        $modalTitle = 'Book view'
        $idModal = $book['id_book']
    }

    return ModalHtml($book['id_book'], $idModal, $modalTitle, $html, imageID, bookEditImagePath, $book, $option);
}

function closeModal($idImg, $firstImg) {

    if ($firstImg) {

        document.getElementById($idImg).src = '../' + $firstImg

        URL.revokeObjectURL(imgObject)
    }
}

function ModalHtmlDeleteBook($idBook, $bookName) {

    return "<div class='modal fade' id='bookDeleteModal" + $idBook + "' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>" +
                "<div class='modal-dialog'>" +
                    "<div class='modal-content' style='background-color: white!important; border-radius: 8px!important'>" +
                        
                        "<div class='modal-header' style='border-bottom: 1px solid #dee2e6!important'>" + 
                            "<h5 class='modal-title' id='staticBackdropLabel' style='font-size: 1.25rem!important; color: black!important; font-weight: 400!important'>Delete book</h5>" +
                            "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>" +
                        "</div>" +

                        "<div class='modal-body'>" +
                            "<div class='container-fluid'>" +
                                
                                "<div class='alert alert-danger' role='alert'>" +
                                    "Do you want to delete this book: " + $bookName + "?" +
                                "</div>" +

                            "</div>" +
                            "<div class='modal-footer d-flex justify-content-between'>" +
                                "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>" +
                                "<button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='deleteBook(\"" + $idBook + "\")'>Delete</button>" +
                            "</div>" +
                        "</div>" +

                    "</div>" +
                "</div>" +
            "</div>";
}

function ModalHtml($idBook, $idModal, $title, $html, $imageID, $imagePath, $book, $option) {

    let $operation

    if ($option == 1) {

        $edit_option = "PUT";

        // $url2 = "/Book_store/update_book/" + $idBook

        $operation = "<button type='button' class='btn btn-success w-100' data-bs-dismiss='modal' onclick='editItem(\"" + $idBook + "\")'>Update</button>"
    } else {
        $operation = "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>"
    }
    
    return "<div class='modal fade' id='staticBackdrop" + $idModal + "' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>" +
                "<div class='modal-dialog'>" +
                    "<div class='modal-content' style='background-color: white!important; border-radius: 8px!important'>" +
                        
                        "<div class='modal-header' style='border-bottom: 1px solid #dee2e6!important'>" + 
                            "<h5 class='modal-title' id='staticBackdropLabel' style='font-size: 1.25rem!important; color: black!important; font-weight: 400!important'>" + $title + "</h5>" +
                            "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' onclick='closeModal(\"" + $imageID + "\", \"" + $imagePath + "\")'></button>" +
                        "</div>" +

                        "<div class='modal-body'>" +
                            "<div class='container-fluid'>" +
                                
                                $html +

                            "</div>" +
                            "<div class='modal-footer'>" +
                                $operation +
                            "</div>" +
                        "</div>" +

                    "</div>" +
                "</div>" +
            "</div>";
}