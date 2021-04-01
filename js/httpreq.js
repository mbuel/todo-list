var callback;
var httpRequest = new XMLHttpRequest();
httpRequest.onload = function() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
      callback(JSON.parse(httpRequest.responseText));
    } else {
      console.log(httpRequest.statusText);
    }
  }
}
httpRequest.onerror = function() {
  console.log(httpRequest.statusText);
}

var xhr = function(mode, uri, cb, data) {
  var data = data ? JSON.stringify(data) : null;
  
  httpRequest.open(mode, uri);
  
  httpRequest.send(data);

  callback = cb;
}