var url = 'https://altcademy-to-do-list-api.herokuapp.com/tasks';
// var query = '?';
var apiKey = '?api_key=13'

xhr('GET', url + apiKey, createList);

// TODO: change to jQUERY call for document ready

//TODO: bonus better define MVC functions on appropriate fornm

document.addEventListener('DOMContentLoaded', function() {


    // Retrieve list
    // var todoList = 

    // Returns the first element with the 'todo-input' id
    document.getElementById('todo-input');

    $('#todo-list').on('click', 'div.col-1>input', function(event) {
      // event.preventDefault();
      console.log(event);
      var id = event.currentTarget.parentNode.parentNode.id.split('-')[1];
      var completed = event.currentTarget.checked;
      console.log(completed);
      console.log(id);
      $(`#input-${id}`).toggleClass('completed');
      if (completed) {
        httpRequest.open('PUT', `${url}/${id}/mark_complete/${apiKey}`);
      }
      httpRequest.send();
      // updateTodo(id, completed);
      // $(`#update-${id}`).show(500);
    });

    $('#todo-list').on('click', 'div.col-9>input', function(event) {
      event.preventDefault();
      console.log(event);
      var id = event.currentTarget.parentNode.parentNode.id.split('-')[1];
      console.log(id);
      $(`#update-${id}`).show(500);
    });

    // deal with button click per row
    $('#todo-list').on('click', 'button', function(event) {
      event.preventDefault();
      var type = event.currentTarget.classList[event.currentTarget.classList.length - 1].split('-')[0];
      var id = event.currentTarget.parentNode.parentNode.id.split('-')[1];
      switch(type) {
        case 'update':
          console.log('update');
          console.log(id);
          // send update to server
          updateTodo(id);
          break;
        case 'remove':
          console.log('remove');
          // send removal to server, and remove from front-end
          httpRequest.open('DELETE', `${url}/${id}${apiKey}`);
          httpRequest.send();
          $(`#message-${id}`).toggle(500)
          setTimeout(function() {
            $(`#message-${id}`).remove();
          }, 500)
          break;
      }
    })

    // This handler will execute when the addButton is clicked.
    $('div#input-form > div.row > div').on('click', '.btn', checkThenAddTodo);
    $('document').on('keyup', function (event) {
        if (event.key === "Enter") {
          checkThenAddTodo();
        }
    });
});