if (document.title == "sermon") {
    var form = document.getElementById('uploadFile');
    form.addEventListener('submit', sendUploadRequest, false);
} else {
    var contentForm = document.getElementById('textForm');
    contentForm.addEventListener('submit', saveContentRequest, false);
}

function deleteRow(row) {
    var userChoice = confirm("You are about to delete this sermon, this action cannot be undone. Are you sure you want to delete this sermon?");
    if( userChoice == true ){
        var index = row.parentNode.parentNode.rowIndex;
        document.getElementById("sermonTable").deleteRow(index);
        var sermonName = row.parentNode.previousSibling.previousSibling.firstChild.nextSibling.textContent;
        console.log(sermonName);
        Ajax.sendRequest('/delRoute',handleDeleteRow,sermonName);
        } else {
        return false;
    }

}

function handleDeleteRow() {
    //doesn't return any data
}


var response = document.getElementById('tableBody');

var timeForm = document.getElementById('timeForm');
timeForm.addEventListener('submit',saveTimesRequest, false);


function saveContentRequest(e){
    e.preventDefault();
    tinyMCE.triggerSave();
    var pageTitle = document.title;
    var tinyText = document.getElementById('mytextarea').value;
    var ajaxContent = {title:pageTitle,text:tinyText};
    var newData = JSON.stringify(ajaxContent);
    Ajax.sendRequest('/ajax2',handleSaveContent,newData);
    document.getElementById('saving').className = "save";
    document.getElementById('saving').innerHTML='Content is being saved...'
}

function handleSaveContent(req){
    document.getElementById('saving').className = "hide";
    document.getElementById('saved').className = "save";
    document.getElementById('saved').innerHTML='Content has been successfully saved...';
    setTimeout(function(){ document.getElementById('saved').className = "hide"; }, 1500);
    console.log("Text saved");
    console.log(req);
}

function saveTimesRequest(e){
    e.preventDefault();
    var firstTime = document.getElementById('firstTime').value;
    var secondTime = document.getElementById('secondTime').value;
    var ajaxTimes = {name:"times",first: firstTime, second:secondTime};
    var newTimes = JSON.stringify(ajaxTimes);
    Ajax.sendRequest('/timeRoute',handleSaveTimes,newTimes);
    document.getElementById('saving').className = "save";
    document.getElementById('saving').innerHTML='Time is being saved...'
}

function handleSaveTimes(req){
    document.getElementById('saving').className = "hide";
    document.getElementById('saved').className = "save";
    document.getElementById('saved').innerHTML='Time changes have been successfully saved...';
    setTimeout(function(){ document.getElementById('saved').className = "hide"; }, 1500);
    console.log("Times saved");
    console.log(req);
}

function sendUploadRequest(e){
    e.preventDefault();
    var sermonTitle = document.getElementById('fileName');
    var filePath = document.getElementById('file');
    if (filePath.value != "" && sermonTitle != "") {

        var file = document.getElementById('file');
        var fileName = document.getElementById('fileName').value;

        var formData = new FormData();
        console.log(file.files[0]);
        formData.append('file', file.files[0]);
        formData.append('data', fileName);

        //clear the values
        document.getElementById('uploadFile').reset();


        Ajax.sendRequest('/ajax5',handleRequest,formData,true);
        document.getElementById('saving').className = "save";
        document.getElementById('saving').innerHTML='Sermon is being saved...';
    } else {
        document.getElementById('saved').className = "save";
        document.getElementById('saved').innerHTML='Please enter a sermon title and select a file...';
        setTimeout(function(){ document.getElementById('saved').className = "hide"; }, 1500);
        return false;
    }
}

function handleRequest(req){
    document.getElementById('saving').className = "hide";
    document.getElementById('saved').className = "save";
    document.getElementById('saved').innerHTML='Sermon has been saved';
    setTimeout(function(){ document.getElementById('saved').className = "hide"; }, 1500);
    //response.innerHTML = req.responseText;
    var responseChild = document.createElement('tr');
    responseChild.innerHTML = req.responseText;
    response.insertBefore(responseChild,response.firstChild);
}



