// get markdown content  
var url = $('#article').attr('md');

function getText(myUrl) {
    var result = null;
    $.ajax({
        url: myUrl,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function (data) { result = data; }
    }
    );
    FileReady = true;
    return result;
}

//prase markdown
$("#article").append(marked(getText(url)));