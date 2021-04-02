var callback;

var xhr = function(mode, uri, cb, data) {
  $.ajax({
    type: mode,
    url: uri,
    dataType: 'json',
    data: JSON.stringify(data),
    success: function (response, textStatus) {
      cb && typeof cb === 'function' && cb(response);
    },
    error: function (request, textStatus, errorMessage) {
  
      console.log(errorMessage);
  
    }
  
  });

}

var constructTodoData = function(content, id) {
  return data =  {
    task: {
      "id": id? id : undefined,
      "content": content
    }
  };
}

var updateTodo = function(id, cb) {
  var query = `/${id}`;
  var data = constructTodoData($(`#input-${id}`).val(), id);
  
  setCompleted(id, undefined, false);
  setTimeout(function() {
    xhr('PUT', url + query + apiKey, cb, data);
    hideElement(`#update-${id}`, 500);
  }, 250);
  
}

function checkThenAddTodo() {
  var data =  constructTodoData($('#todo-input').val());

  xhr('POST', url + apiKey, addTodo, data);

}

function setCompleted(id, cb, completed=false) {
  var query = `/${id}`;

  callback = cb;
  xhr('PUT', `${url}${query}${(completed ? '/mark_complete/' : '/mark_active/')}${apiKey}`, cb);

}

var deleteTodo = function(id, cb) {

  xhr('DELETE', `${url}${id}${apiKey}`, cb);

  removeListItem(id);
}