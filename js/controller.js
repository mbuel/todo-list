var url = 'https://altcademy-to-do-list-api.herokuapp.com/tasks';
// var query = '?';
var apiKey = '?api_key=13'

xhr('GET', url + apiKey, createList);

// TODO: change to jQUERY call for document ready

// TODO: bonus better define MVC functions on appropriate fornm

$(document).ready(function () {


    $('#todo-list').on('click', 'div.col-1>input', function(event) {
      var id = event.currentTarget.parentNode.parentNode.id.split('-')[1];
      var completed = event.currentTarget.checked;

      setCompleted(id, setCompletedCheckBox, completed);

    });

    $('#todo-list').on('click', 'div.col-9>input', function(event) {
      event.preventDefault();

      var id = event.currentTarget.parentNode.parentNode.id.split('-')[1];

      displayElement(`#update-${id}`);
    });

    // deal with button click per row
    $('#todo-list').on('click', 'button', function(event) {
      event.preventDefault();
      var type = event.currentTarget.classList[event.currentTarget.classList.length - 1].split('-')[0];
      var id = event.currentTarget.parentNode.parentNode.id.split('-')[1];
      switch(type) {
        case 'update':
          // send update to server
          updateTodo(id, setCompletedCheckBox);
          break;
        case 'remove':
          deleteTodo(id);

          break;
      }
    })
    
    $('.btn-group').on('click', function() {
      setTimeout(function() {
        var filter = $('.btn-group').find('.active')[0].children[0].id;
        console.log(filter);
        filterList(filter);

      },50);
    });

    // This handler will execute when the addButton is clicked.
    $('div#input-form > div.row > div').on('click', '.btn', checkThenAddTodo);
    $('document').on('keyup', function (event) {
        if (event.key === "Enter") {
          checkThenAddTodo();
        }
    });
});