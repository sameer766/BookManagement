var selectedRow=null;
var searchText=null;
function selectRow(row)
{
var editIcon,deleteIcon;
if(selectedRow)
{
selectedRow.classList.remove('selectedRow');
editIcon=selectedRow.cells[2].getElementsByTagName("img")[0];
editIcon.src="images/edit_icon.png"
deleteIcon=selectedRow.cells[3].getElementsByTagName("img")[0];
deleteIcon.src="images/delete_icon.png"
}s
electedRow=row;
selectedRow.classList.add('selectedRow');
editIcon=selectedRow.cells[2].getElementsByTagName("img")[0];
editIcon.src="images/selected_row_edit_icon.png"
deleteIcon=selectedRow.cells[3].getElementsByTagName("img")[0];
deleteIcon.src="images/selected_row_delete_icon.png"
}
function clearAuthors()
{
var authorsListBody=document.getElementById("authorsList").getElementsByTagName('tbody')[0];
while(authorsListBody.rows.length>0)
{ authorsListBody.deleteRow(0);
}
var row=authorsListBody.insertRow(authorsListBody.length);
var cell1=row.insertCell(0);
cell1.innerHTML="&nbsp";
var cell2=row.insertCell(1);
cell2.innerHTML="&nbsp";
var cell3=row.insertCell(2);
cell3.innerHTML="&nbsp";
var cell4=row.insertCell(3);
cell4.innerHTML="&nbsp";
}
function loadAuthors()
{s
howProgressModal();
clearAuthors();
$.ajax({
type: 'GET',
url: 'getAuthors',
data: {
now: new Date(),
},
success: function(data) {
var spl=data.split(",")
var authorsListBody=document.getElementById("authorsList").getElementsByTagName('tbody')[0];
while(authorsListBody.rows.length>0) authorsListBody.deleteRow(0);
if(spl[0]=='false')
{
hideProgressModal();
return;
}
var i=0;
var serialNumber=0;
while(i<spl.length)
{
serialNumber++;
var row=authorsListBody.insertRow(authorsListBody.rows.length);
row.setAttribute("onclick","selectRow(this)");
var cell1=row.insertCell(0);
var cellText=document.createTextNode(serialNumber+".");
cell1.appendChild(cellText);
var cell2=row.insertCell(1);
cellText=document.createTextNode(spl[i+1]);
cell2.appendChild(cellText);
var cell3=row.insertCell(2);
var editIcon=document.createElement("img");
editIcon.src="images/edit_icon.png"
editIcon.setAttribute("onclick","editAuthor("+spl[i]+",'"+spl[i+1]+"')");
cell3.appendChild(editIcon);
var cell4=row.insertCell(3);
var deleteIcon=document.createElement("img");
deleteIcon.src="images/delete_icon.png"
deleteIcon.setAttribute("onclick","confirmAuthorDeletion("+spl[i]+",'"+spl[i+1]+"')");
cell4.appendChild(deleteIcon);
i+=2;
}
hideProgressModal();
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
}
function addAuthor()
{
var authorAddForm=document.getElementById("authorAddForm");
var name=authorAddForm.name.value.trim();
var nameErrorSection=document.getElementById("authorAddFormNameErrorSection");
nameErrorSection.innerHTML="&nbsp;";
if(name.length==0)
{
nameErrorSection.innerHTML="Required";
authorAddForm.name.focus();
return;
}
var validCharacters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .";
var e=0;
while(e<name.length)
{ if(validCharacters.indexOf(name.charAt(e))==-1)
{
nameErrorSection.innerHTML="Invalid characters in name of author";
authorAddForm.name.focus();
return;
} e++;
}s
howProgressModal();
$.ajax({
type: 'POST',
url: 'addAuthor',
data: {
name : name
},
success: function(data) {
var spl=data.split(",");
if(spl[0]==="true")
{
hideProgressModal();
disposeModal();
var authorsListBody=document.getElementById("authorsList").getElementsByTagName('tbody')[0];
var e;
var authorOnRow;
e=0;
while(e<authorsListBody.rows.length)
{
authorOnRow=authorsListBody.rows[e].cells[1].innerHTML;
if(authorOnRow.localeCompare(name)>0) break;
e++;
}
var row=authorsListBody.insertRow(e);
row.setAttribute("onclick","selectRow(this)");
var cell1=row.insertCell(0);
cell1.innerHTML=(e+1)+".";
var cell2=row.insertCell(1);
cell2.innerHTML=name;
var cell3=row.insertCell(2);
var editIcon=document.createElement("img");
editIcon.src="images/edit_icon.png"
editIcon.setAttribute("onclick","editAuthor("+spl[2]+",'"+name+"')");
cell3.appendChild(editIcon);
var cell4=row.insertCell(3);
var deleteIcon=document.createElement("img");
deleteIcon.src="images/delete_icon.png"
deleteIcon.setAttribute("onclick","confirmAuthorDeletion("+spl[2]+",'"+name+"')");
cell4.appendChild(deleteIcon);
e++;
while(e<authorsListBody.rows.length)
{
authorsListBody.rows[e].cells[0].innerHTML=(e+1)+".";
e++;
}
selectRow(row);
if(!isElementInViewport(authorsListBody,row))
{
row.scrollIntoView(true);
document.body.scrollTop=document.documentElement.scrollTop=0;
}
clearAuthorSearchComponent();
}
else
{
hideProgressModal();
var formErrorSection=document.getElementById("authorAddFormErrorSection");
formErrorSection.innerHTML=spl[1];
}
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
}
function editAuthor(code,name)
{
var authorUpdateForm=document.getElementById("authorUpdateForm");
authorUpdateForm.code.value=code;
authorUpdateForm.name.value=name;
authorUpdateForm.oldName.value=name;
showModal("authorUpdateFormContainer","400px","200px","Update author","")
}
function updateAuthor()
{
var authorUpdateForm=document.getElementById("authorUpdateForm");
var code=authorUpdateForm.code.value;
var name=authorUpdateForm.name.value.trim();
var oldName=authorUpdateForm.oldName.value;
var nameErrorSection=document.getElementById("authorUpdateFormNameErrorSection");
nameErrorSection.innerHTML="&nbsp;";
if(name.length==0)
{
nameErrorSection.innerHTML="Required";
authorUpdateForm.name.focus();
return;
}
var validCharacters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .";
var e=0;
while(e<name.length)
{ if(validCharacters.indexOf(name.charAt(e))==-1)
{
nameErrorSection.innerHTML="Invalid characters in name of author";
authorUpdateForm.name.focus();
return;
} e++;
}s
howProgressModal();
$.ajax({
type: 'POST',
url: 'updateAuthor',
data: {
code: code,
name : name
},
success: function(data) {
var spl=data.split(",");
if(spl[0]==="true")
{
hideProgressModal();
disposeModal();
var authorsListBody=document.getElementById("authorsList").getElementsByTagName('tbody')[0];
var e;
var authorOnRow;
e=0;
while(e<authorsListBody.rows.length)
{
authorOnRow=authorsListBody.rows[e].cells[1].innerHTML;
if(authorOnRow==oldName)
{
authorsListBody.deleteRow(e);
break;
}
e++;
}
while(e<authorsListBody.rows.length)
{
authorsListBody.rows[e].cells[0].innerHTML=(e+1)+".";
e++;
}
e=0;
while(e<authorsListBody.rows.length)
{
authorOnRow=authorsListBody.rows[e].cells[1].innerHTML;
if(authorOnRow.localeCompare(name)>0) break;
e++;
}
var row=authorsListBody.insertRow(e);
row.setAttribute("onclick","selectRow(this)");
var cell1=row.insertCell(0);
cell1.innerHTML=(e+1)+".";
var cell2=row.insertCell(1);
cell2.innerHTML=name;
var cell3=row.insertCell(2);
var editIcon=document.createElement("img");
editIcon.src="images/edit_icon.png"
editIcon.setAttribute("onclick","editAuthor("+code+",'"+name+"')");
cell3.appendChild(editIcon);
var cell4=row.insertCell(3);
var deleteIcon=document.createElement("img");
deleteIcon.src="images/delete_icon.png"
deleteIcon.setAttribute("onclick","confirmAuthorDeletion("+code+",'"+name+"')");
cell4.appendChild(deleteIcon);
e++;
while(e<authorsListBody.rows.length)
{
authorsListBody.rows[e].cells[0].innerHTML=(e+1)+".";
e++;
}
selectRow(row);
if(!isElementInViewport(authorsListBody,row))
{
row.scrollIntoView(true);
document.body.scrollTop=document.documentElement.scrollTop=0;
}
clearAuthorSearchComponent();
}
else
{
if(spl.length>2 && spl[2]=='delete')
{
var authorsListBody=document.getElementById("authorsList").getElementsByTagName('tbody')[0];
var e=0;
var authorOnRow;
while(e<authorsListBody.rows.length)
{
authorOnRow=authorsListBody.rows[e].cells[1].innerHTML;
if(authorOnRow==oldName)
{
authorsListBody.deleteRow(e);
break;
}
e++;
}
selectedRow=null;
hideProgressModal();
disposeModal();
document.getElementById("messageDialogMessageSection").innerHTML=spl[1];
showModal("messageDialogContainer","900px","250px","Update author","")
return;
}
hideProgressModal();
var formErrorSection=document.getElementById("authorUpdateFormErrorSection");
formErrorSection.innerHTML=spl[1];
}
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
}
function confirmAuthorDeletion(code,name)
{
var authorDeleteForm=document.getElementById("authorDeleteForm");
authorDeleteForm.code.value=code;
authorDeleteForm.name.value=name;
document.getElementById("authorDeleteFormNameSection").innerHTML=name;
showModal("authorDeleteFormContainer","400px","200px","Delete author","")
}
function deleteAuthor()
{
var authorDeleteForm=document.getElementById("authorDeleteForm");
var code=authorDeleteForm.code.value;
var name=authorDeleteForm.name.value;
showProgressModal();
$.ajax({
type: 'POST',
url: 'deleteAuthor',
data: {
code : code
},
success: function(data) {
var spl=data.split(",");
if(spl[0]==="true")
{
hideProgressModal();
disposeModal();
var authorsListBody=document.getElementById("authorsList").getElementsByTagName('tbody')[0];
var e;
var authorOnRow;
e=0;
while(e<authorsListBody.rows.length)
{
authorOnRow=authorsListBody.rows[e].cells[1].innerHTML;
if(authorOnRow==name)
{
authorsListBody.deleteRow(e);
break;
}
e++;
}
selectedRow=null;
document.getElementById("messageDialogMessageSection").innerHTML="Author : "+name+"
deleted.";
showModal("messageDialogContainer","450px","200px","Delete author","")
clearAuthorSearchComponent();
}
else
{
hideProgressModal();
var formErrorSection=document.getElementById("authorDeleteFormErrorSection");
formErrorSection.innerHTML=spl[1];
}
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
}
function clearAuthorSearchComponent()
{
var authorToSearch=document.getElementById("authorToSearch");
authorToSearch.value="";
searchText="";
if(hasClass(authorToSearch,"authorSearchComponentInputError"))
{
removeClass(authorToSearch,"authorSearchComponentInputError");
addClass(authorToSearch,"authorSearchComponentInput");
}}
function searchAuthor(textToSearch)
{
var authorToSearch=document.getElementById("authorToSearch");
if(textToSearch.trim().length==0)
{ if(hasClass(authorToSearch,"authorSearchComponentInputError"))
{
removeClass(authorToSearch,"authorSearchComponentInputError");
addClass(authorToSearch,"authorSearchComponentInput");
}s
earchText="";
return;
} textToSearch=textToSearch.toLowerCase();
if(searchText==textToSearch) return;
searchText=textToSearch;
var authorsListBody=document.getElementById("authorsList").getElementsByTagName('tbody')[0];
var authorOnRow;
var e;
for(e=0;e<authorsListBody.rows.length;e++)
{ authorOnRow=authorsListBody.rows[e].cells[1].innerHTML.toLowerCase();
if(authorOnRow.startsWith(searchText)) break;
} if(e==authorsListBody.rows.length)
{
removeClass(authorToSearch,"authorSearchComponentInput");
addClass(authorToSearch,"authorSearchComponentInputError");
return;
} if(hasClass(authorToSearch,"authorSearchComponentInputError"))
{
removeClass(authorToSearch,"authorSearchComponentInputError");
addClass(authorToSearch,"authorSearchComponentInput");
}
var row=authorsListBody.rows[e];
selectRow(row);
if(!isElementInViewport(authorsListBody,row))
{
row.scrollIntoView(true);
document.body.scrollTop=document.documentElement.scrollTop=0;
}}
window.addEventListener('load',loadAuthors);
