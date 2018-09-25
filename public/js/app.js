// Render To Do List //

const render = function () {
    runToDoList();
};

const renderToDoList = function (outputPlace, dataList) {
    for (let i = 0; i < dataList.length; i++) {
        const output = $(outputPlace);
        const temp = $(`<div class='todo-item'>`);
        const tempButton = $(`<span class='format'>`);
        tempButton.append($("<button type='submit' class='delItem'>").text("Delete"));
        const tempSpan = $("<span class='todo-itemText'>").text(`${dataList[i].newInput}`);
        temp.append(
            $("<input type='checkbox' class='inputBox'>"),
            tempSpan,
            tempButton
        );
        output.append(temp);
    }
};

const runToDoList = function () {
    $.ajax({ url: "/api/list", method: "GET" }).then(
        function (e) {
            renderToDoList('#displayList', e);
        }
    );
}

render();

// Submit To Do Item //

const submitItem = function () {
    const newItem = {
        newInput: $('#newInput').val().trim()
    };
    for (let key in newItem) {
        if (newItem[key] === '') {
            alert('Please Enter A To Do');
            return;
        }
    }
    $.ajax({ url: '/api/list', method: 'POST', data: newItem }).then(
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

$(document).on('click', '#submitButton', submitItem);

// Delete Item //

const deleteItem = function () {

    let parent = $(this).parent().parent().text();
    const selItem = {
        newInput: parent.substring(0, parent.length - 6)
    };

    $.ajax({ url: '/api/list', method: 'DELETE', data: selItem }).then(
        function (data) {
            if (data.success) {
                alert('Item Deleted');

            } else {
                alert("Invalid Request");
            }
        }
    );

};

$(document).on('click', '.delItem', deleteItem);
