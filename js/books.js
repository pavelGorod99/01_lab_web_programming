var bookCount = 0;

var pageCount = 0;

var currentPage = 1

var offset = 0;

var fd = null;

function filterBooks() {

    $form = document.getElementById("filter_form")
    fd = new FormData($form);

    fd.append('offset', offset)

    $.ajax({
        url: "/Book_store/rest/get_books_by_filter",
        type: "POST",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        data:  fd,
        success: function (result) {
            
            console.log(result);
            bookCount = result.length
            insertData(result)
        },
        error: function (err) {
            console.log(err);
            // UserService.logout();    
        },
        processData: false,
        contentType: false
    });
}
 
function fillFilter() {

    fillSelect("#authors", 'author', 'Id_author', 'Name')

    fillSelect("#publishingHouse", 'publishing_house', 'Id_publishing_house', 'Name')

    fillSelect("#category", 'category', 'Id_category', 'Name_category')

    fillYears()

    getPriceRange()
}

function getPriceRange() {
    $("#priceRange").on("input", function(e) {
        console.log(e.target.value);
        $("#price").html(e.target.value)
    })
}

function fillYears() {

    $years = ''

    for (let j = 0, i = new Date().getFullYear(); i >= 1950; i--, j++) {
        $years += "<option value=" + i + ">" + i + "</option>"
    }

    $("#year").append($years)
}

function fillSelect($element, $table, $idRow, $nameRow) {
    getItems($table, -1).then(function (data) {
        $data = ''
        for (let i = 0; i < data.length; i++) {
            $data += "<option value='" + data[i][$idRow] + "'>" + data[i][$nameRow] + "</option>";
        }

        $($element).append($data)
    })
}

function refreshFilter() {
    $('#authors').val('Filter by author')
    $('#publishingHouse').val('Filter by publishing house')
    $('#year').val('Filter by year')
    $('#category').val('Filter by category')
    $('#priceRange').val(100)
    getAllBooks(0);
}

function getAllBooks($offset) {
    getTableRowCount('book').then(function (book_count) {
        getItems('book', $offset).then(function (result) {
            bookCount = book_count[0]['COUNT']
            insertData(result)
        })
    })
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

function pagination($page) {

    currentPage = $page
    offset = ($page - 1) * 6

    if (fd != null && fd.has('offset')) {
        filterBooks()
    } else {
        getAllBooks(offset);
    }
}

function insertData(data) {

    $("#book-list").html('');
    
    $books = "";

    for (let i = 0; i < data.length; i++) {

        $books += '<div class="col-sm-6 col-md-4 ">' + 
                    '<div class="box " style="background-color: #f5f6f9!important">' +
                    '<img src="../' + data[i]['book_image'] + '" class="card-img-top img-custom" alt="..." style="width: auto!important;">' +
                    '<div class="detail-box mt-2">' +
                    '<h5>' +
                        data[i]['title'] +
                    '</h5>' + 
                    '<p>' +
                    '<p class="card-text ps-1 pe-1">fact that a reader will be distracted by the readable content of a page when looking at its layout.' +
                        'The' +
                        'point of using</p>' +
                    '<a href="./order_book.html" class="book_info">More info</a>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                   '</div>'
    }

    $("#book-list").append($books);

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

$(document).ready(function() {
   getAllBooks(0)

   fillFilter()
});