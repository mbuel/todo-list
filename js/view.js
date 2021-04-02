var templateString = `<div id="message-$ID" class="task row pb-3">
    <div class="col-1">
        <input class="check" type="checkbox" id="complete-$ID" name="completed" value="">
    </div>
    <div class="col-9"> 
        <input id="input-$ID" value="$TODO"></input>
    </div>
    <div class="col-1">
        <button id="update-$ID" class="btn btn-info update-button"><i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
    </div>
    <div class="col-1">
        <button id="remove-$ID" class="btn btn-danger remove-button"><i class="fa fa-remove " ></i></button>  
    </div>
</div>`

var createList = function(data) {
    if (!data) return;
    data.tasks.map(el => {
        addTodo(el);
    });
}

var addTodo = function(todo) {
    todo = todo.content != undefined ? todo : todo.task;
    var html = templateString.replace(/\$ID/g, todo.id).replace(/\$TODO/, todo.content);

    $('#todo-list').append(html);
    $('#todo-input').val('');
    // $(`#update-${todo.id}`).hide();
    hideElement(`#update-${todo.id}`, 0);

    setCompletedCheckBox(todo);

}

var setCompletedCheckBox = function(todo) {
    
    todo = todo.content != undefined ? todo : todo.task;
    
    if (todo.completed) {
        $(`#input-${todo.id}`).addClass('completed');
    } else {
        $(`#input-${todo.id}`).removeClass('completed');
    }
    
    $(`#complete-${todo.id}`).prop('checked', todo.completed);
}

var displayElement = function(dom, delay = 500) {
    $(dom).show(delay);
}
var hideElement = function(dom, delay = 500) {
    $(dom).hide(delay);
}

var removeListItem = function(id) {
    $(`#message-${id}`).toggle(500)
    setTimeout(function() {
      $(`#message-${id}`).remove();
    }, 500)
}

var filterList = function(filter) {
    console.log(filter);
    switch (filter) {
        case 'all':
          // change filter to all
          $('.task').map(function(i, el) {
            console.log($(this).find('div.col-9>input')[0].classList.contains('completed'));
            displayElement(el);
            });
          break;
        case 'active':
          // change filter to active
          $('.task').map(function(i, el) {
            console.log($(this).find('div.col-9>input')[0].classList.contains('completed'));
            if (!$(this).find('div.col-9>input')[0].classList.contains('completed')) {
                displayElement(el);

            } else {
                hideElement(el);
            }
            });
          break;
        case 'completed':
          // change filter to show completed
            $('.task').map(function(i, el) {
                console.log($(this).find('div.col-9>input')[0].classList.contains('completed'));
                // displayElement(el);

                if ($(this).find('div.col-9>input')[0].classList.contains('completed')) {
                    displayElement(el);
                } else {
                    hideElement(el);
                }
            });
            break;
    }
}