var callback;
var httpRequest = new XMLHttpRequest();
httpRequest.onload = function() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
      callback && callback(JSON.parse(httpRequest.responseText));
      callback = undefined;
    } else {
      console.log(httpRequest.statusText);
    }
  }
}
httpRequest.onerror = function() {
  console.log(httpRequest.statusText);
}

// TODO: Change to an AJAX request to demonstrate knowledge
var xhr = function(mode, uri, cb, data) {
  console.log(cb);
  httpRequest.open(mode, uri);

  var data = data ? JSON.stringify(data) : null;

  data && httpRequest.setRequestHeader("Content-Type", "application/json");
  
  httpRequest.send(data);

  callback = cb;
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
  }, 250);
  
}

function checkThenAddTodo() {
  var data =  constructTodoData($('#todo-input').val());

  xhr('POST', url + apiKey, addTodo, data);

}

function setCompleted(id, cb, completed=false) {
  var query = `/${id}`;

  callback = cb;
  xhr('PUT', `${url}${query}${(completed ? '/mark_complete/' : '/mark_active/')}${apiKey}`, cb)

}