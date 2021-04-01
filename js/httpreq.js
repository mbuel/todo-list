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

var xhr = function(mode, uri, cb, data) {
  httpRequest.open(mode, uri);

  var data = data ? JSON.stringify(data) : null;

  data && httpRequest.setRequestHeader("Content-Type", "application/json");
  
  httpRequest.send(data);

  callback = cb;
}



var constructTodoData = function(id, content, done = false) {
  return data =  {
    task: {
      "id": id,
      "content": content,
      "completed": done,
      "due":null
    }
  };
}

var updateTodo = function(id, completed = false) {
  var query = `/${id}`;
  console.log(id, completed);
  var data = constructTodoData(id, $(`#input-${id}`).val(), completed);
  console.log(data);
  xhr('PUT', url + query + apiKey, undefined, data);
  
}

function checkThenAddTodo() {
  var data =  constructTodoData($('#todo-input').val());

  xhr('POST', url + apiKey, addTodo, data);

}