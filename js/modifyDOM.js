var templateString = `<div id="message-$ID" class="row">
    <h5 class="col-xs-8"> <input id="input-$ID" value="$TODO"></input></h5>
    <button class="btn btn-info remove-button">UPDATE</button>
    <button class="btn btn-danger remove-button">REMOVE</button>
</div>`

var createList = function(data) {
    if (!data) return;
    data.tasks.map(el => {
        addTodo(el);
    });
}

var addTodo = function(todo) {
    console.log(todo);
    var html = templateString.replace(/\$ID/g, todo.id).replace(/\$TODO/, todo.content);

    $('#todo-list').append(html);
}