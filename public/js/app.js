// Render //

const render = function () {
    runListQuery();
};

const renderList = function (outputPlace, dataList) {
    for (let i = 0; i < dataList.length; i++) {
        const output = $(outputPlace);
        const temp = $(`<div class='entry'>`);
        const tempButton = $('<span class=left>');
        tempButton.append($("<button type='submit' class='delEntry'>").text("Delete"));
        const tempSpan = $("<span class='entryText'>").text(`${dataList[i].newInput}`);
        temp.append(
            $("<input type='checkbox' class='inputBox'>"),
            tempSpan,
            tempButton
        );
        output.append(temp);
    }
};

const runListQuery = function () {
    $.ajax({ url: "/api/list", method: "GET" }).then(
        function (e) {
            renderList('#displayList', e);
        }
    );
}

render();

// Submit //

const submitFunc = function () {
    const newEntry = {
        newInput: $('#newInput').val().trim()
    };
    for (let key in newEntry) {
        if (newEntry[key] === '') {
            alert('Please Enter A To Do');
            return;
        }
    }
    $.ajax({ url: '/api/list', method: 'POST', data: newEntry }).then(
        function (data) {
            if (data.success) {
                alert('To Do Added');
                $('#newInput').val('');
            } else {
                alert('Invalid Entry');
            }
        }
    );
};

$(document).on('click', '#submitButton', submitFunc);

// Delete //

const deleteFunc = function () {

    let parent = $(this).parent().parent().text();
    const selEntry = {
        newInput: parent.substring(0, parent.length - 6)
    };

    $.ajax({ url: '/api/list', method: 'DELETE', data: selEntry }).then(
        function (data) {
            if (data.success) {
                alert('Entry Deleted');

            } else {
                alert("Invalid Entry");
            }
        }
    );

};

$(document).on('click', '.delEntry', deleteFunc);
