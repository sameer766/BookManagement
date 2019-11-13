function Model()
{ this.authors=null;
this.books=null;
this.selectedRow=null;
this.searchText=null;
this.authorCode=0;
}
var dataModel=null;
function selectRow(row)
{
var editIcon,deleteIcon;
if(dataModel.selectedRow)
{
dataModel.selectedRow.classList.remove('selectedRow');
editIcon=dataModel.selectedRow.cells[5].getElementsByTagName("img")[0];
editIcon.src="images/edit_icon.png"
deleteIcon=dataModel.selectedRow.cells[6].getElementsByTagName("img")[0];
deleteIcon.src="images/delete_icon.png"
}
dataModel.selectedRow=row;
dataModel.selectedRow.classList.add('selectedRow');
editIcon=dataModel.selectedRow.cells[5].getElementsByTagName("img")[0];
editIcon.src="images/selected_row_edit_icon.png"
deleteIcon=dataModel.selectedRow.cells[6].getElementsByTagName("img")[0];
deleteIcon.src="images/selected_row_delete_icon.png"
}
function clearBooksView()
{
var booksListBody=document.getElementById("booksList").getElementsByTagName('tbody')[0];
while(booksListBody.rows.length>0)
{
booksListBody.deleteRow(0);
}}
function clearFilter()
{
var filterByAuthorCode=document.getElementById("filterByAuthorCode");
filterByAuthorCode.selectedIndex=0;
authorSelectionChanged(0);
}
function authorSelectionChanged(code)
{
var bookAddForm=document.getElementById("bookAddForm");
var bookAddFormClearFilterSpan=document.getElementById("bookAddFormClearFilterSpan");
if(code==0)
{
populateBooksView(0);
selectOption(bookAddForm.authorCode,0);
bookAddForm.authorCode.disabled=false;
bookAddFormClearFilterSpan.style.visibility="hidden";
return;
}
populateBooksView(code);
selectOption(bookAddForm.authorCode,code);
bookAddForm.authorCode.disabled=true;
bookAddFormClearFilterSpan.style.visibility="visible";
}
function initializeDataModel(onInitialized)
{
$.ajax({
type: 'GET',
url: 'getAuthors',
data: {
now: new Date(),
},
success: function(data) {
var authors=new Array();
var spl=data.split(",")
var i;
if(spl[0]!='false')
{
i=0;
while(i<spl.length)
{
authors.push(new Author(parseInt(spl[i]),spl[i+1]));
i+=2;
}
}
dataModel=new Model();
dataModel.authors=authors;
// code to getBooks starts here
$.ajax({
type: 'GET',
url: 'getBooks',
data: {
now: new Date(),
},
success: function(data) {
var books=new Array();
var spl=data.split(",")
var i;
if(spl[0]!='false')
{
i=0;
var f;
var author;
var book;
while(i<spl.length)
{
author=null;
for(f=0;f<dataModel.authors.length;f++)
{
if(dataModel.authors[f].code==parseInt(spl[i+2]))
{
author=dataModel.authors[f];
break;
}
}
book=new Book(parseInt(spl[i]),spl[i+1],author,spl[i+3],parseInt(spl[i+4]));
books.push(book);
i+=5;
}
}
dataModel.books=books;
// authors and books are ready with data in the dataModel
onInitialized();
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
// code to getBooks ends here
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
}
function populateAuthorsList()
{
var filterByAuthorCode=document.getElementById("filterByAuthorCode");
var e;
var option;
var author;
for(e=0;e<dataModel.authors.length;e++)
{ author=dataModel.authors[e];
option=document.createElement("option");
option.text=author.name;
option.value=author.code;
filterByAuthorCode.options.add(option);
}
var bookAddFormAuthorCode=document.getElementById("bookAddForm").authorCode;
for(e=0;e<dataModel.authors.length;e++)
{ author=dataModel.authors[e];
option=document.createElement("option");
option.text=author.name;
option.value=author.code;
bookAddFormAuthorCode.options.add(option);
}
var bookUpdateFormAuthorCode=document.getElementById("bookUpdateForm").authorCode;
for(e=0;e<dataModel.authors.length;e++)
{ author=dataModel.authors[e];
option=document.createElement("option");
option.text=author.name;
option.value=author.code;
bookUpdateFormAuthorCode.options.add(option);
}
}
function populateBooksView(authorCode)
{
dataModel.authorCode=authorCode;
clearBooksView();
var booksListBody=document.getElementById("booksList").getElementsByTagName('tbody')[0];
while(booksListBody.rows.length>0) booksListBody.deleteRow(0);
var i=0;
var serialNumber=0;
var book=null;
while(i<dataModel.books.length)
{
book=dataModel.books[i];
if(authorCode!=0 && book.author.code!=authorCode)
{
i++;
continue;
}
serialNumber++;
var row=booksListBody.insertRow(booksListBody.rows.length);
row.setAttribute("onclick","selectRow(this)");
var cell1=row.insertCell(0);
var cellText=document.createTextNode(serialNumber+".");
cell1.appendChild(cellText);
var cell2=row.insertCell(1);
cellText=document.createTextNode(book.title);
cell2.appendChild(cellText);
var cell3=row.insertCell(2);
cellText=document.createTextNode(book.category);
cell3.appendChild(cellText);
var cell4=row.insertCell(3);
cellText=document.createTextNode(book.author.name);
cell4.appendChild(cellText);
var cell5=row.insertCell(4);
cellText=document.createTextNode(book.price);
cell5.appendChild(cellText);
var cell6=row.insertCell(5);
var editIcon=document.createElement("img");
editIcon.src="images/edit_icon.png"
editIcon.setAttribute("onclick","editBook("+i+")");
cell6.appendChild(editIcon);
var cell7=row.insertCell(6);
var deleteIcon=document.createElement("img");
deleteIcon.src="images/delete_icon.png"
deleteIcon.setAttribute("onclick","confirmBookDeletion("+i+")");
cell7.appendChild(deleteIcon);
i++;
}
}
function initializeView()
{
showProgressModal();
initializeDataModel(function(){
populateBooksView(0);
populateAuthorsList();
hideProgressModal();
});
}
function addBook()
{
var errorComponent=null;
var bookAddForm=document.getElementById("bookAddForm");
var title=bookAddForm.title.value.trim();
var titleErrorSection=document.getElementById("bookAddFormTitleErrorSection");
titleErrorSection.innerHTML="&nbsp;";
var valid=true;
if(title.length==0)
{ titleErrorSection.innerHTML="Required";
errorComponent=bookAddForm.title;
valid=false;
} if(valid)
{
var validCharacters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .
0123456789";
var e=0;
while(e<title.length)
{ if(validCharacters.indexOf(title.charAt(e))==-1)
{ titleErrorSection.innerHTML="Invalid characters in title of author";
bookAddForm.title.focus();
valid=false;
errorComponent=bookAddForm.title;
break;
} e++;
}}
var category=bookAddForm.category.value;
var categoryErrorSection=document.getElementById("bookAddFormCategoryErrorSection");
categoryErrorSection.innerHTML="&nbsp;";
if(category=='none')
{ if(errorComponent==null) errorComponent=bookAddForm.category;
valid=false;
categoryErrorSection.innerHTML="Required";
}
var authorCode=bookAddForm.authorCode.value;
var authorCodeErrorSection=document.getElementById("bookAddFormAuthorCodeErrorSection");
authorCodeErrorSection.innerHTML="&nbsp;";
if(authorCode==0)
{ if(errorComponent==null) errorComponent=bookAddForm.authorCode;
valid=false;
authorCodeErrorSection.innerHTML="Required";
}
var price=bookAddForm.price.value;
var priceErrorSection=document.getElementById("bookAddFormPriceErrorSection");
priceErrorSection.innerHTML="&nbsp;";
if(!price)
{
if(errorComponent==null) errorComponent=bookAddForm.price;
valid=false;
priceErrorSection.innerHTML="Required";
} if(price && parseInt(price)<=0)
{ if(errorComponent==null) errorComponent=bookAddForm.price;
valid=false;
priceErrorSection.innerHTML="Invalid price";
} if(!valid)
{ errorComponent.focus();
return;
}s
howProgressModal();
$.ajax({
type: 'POST',
url: 'addBook',
data: {
title : title,
category : category,
authorCode : authorCode,
price : price
},
success: function(data) {
var spl=data.split(",");
if(spl[0]==="true")
{
var code=parseInt(spl[2]);
var author=null;
var f;
for(f=0;f<dataModel.authors.length;f++)
{
if(dataModel.authors[f].code==authorCode)
{
author=dataModel.authors[f];
break;
}
}
var book=new Book(code,title,author,category,price);
for(f=0;f<dataModel.books.length;f++)
{
if(dataModel.books[f].title.toUpperCase().localeCompare(title.toUpperCase())>0)
{
break;
}
}
dataModel.books.splice(f,0,book);
hideProgressModal();
disposeModal();
populateBooksView(dataModel.authorCode);
var booksListBody=document.getElementById("booksList").getElementsByTagName('tbody')[0];
var row=booksListBody.rows[f];
selectRow(row);
if(!isElementInViewport(booksListBody,row))
{
row.scrollIntoView(true);
document.body.scrollTop=document.documentElement.scrollTop=0;
}
clearBookSearchComponent();
}
else
{
hideProgressModal();
var formErrorSection=document.getElementById("bookAddFormErrorSection");
formErrorSection.innerHTML=spl[1];
}
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
}
function editBook(index)
{
var bookUpdateForm=document.getElementById("bookUpdateForm");
bookUpdateForm.index.value=index;
var book=dataModel.books[index];
bookUpdateForm.title.value=book.title;
selectOption(bookUpdateForm.authorCode,book.author.code);
selectOption(bookUpdateForm.category,book.category);
bookUpdateForm.price.value=book.price;
showModal("bookUpdateFormContainer","400px","340px","Update book","");
}
function updateBook()
{
var errorComponent=null;
var bookUpdateForm=document.getElementById("bookUpdateForm");
var index=bookUpdateForm.index.value;
var code=dataModel.books[index].code;
var title=bookUpdateForm.title.value.trim();
var titleErrorSection=document.getElementById("bookUpdateFormTitleErrorSection");
titleErrorSection.innerHTML="&nbsp;";
var valid=true;
if(title.length==0)
{ titleErrorSection.innerHTML="Required";
errorComponent=bookUpdateForm.title;
valid=false;
} if(valid)
{
var validCharacters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .
0123456789";
var e=0;
while(e<title.length)
{ if(validCharacters.indexOf(title.charAt(e))==-1)
{ titleErrorSection.innerHTML="Invalid characters in title of author";
bookUpdateForm.title.focus();
valid=false;
errorComponent=bookUpdateForm.title;
break;
} e++;
}}
var category=bookUpdateForm.category.value;
var categoryErrorSection=document.getElementById("bookUpdateFormCategoryErrorSection");
categoryErrorSection.innerHTML="&nbsp;";
if(category=='none')
{ if(errorComponent==null) errorComponent=bookUpdateForm.category;
valid=false;
categoryErrorSection.innerHTML="Required";
}
var authorCode=bookUpdateForm.authorCode.value;
var authorCodeErrorSection=document.getElementById("bookUpdateFormAuthorCodeErrorSection");
authorCodeErrorSection.innerHTML="&nbsp;";
if(authorCode==0)
{ if(errorComponent==null) errorComponent=bookUpdateForm.authorCode;
valid=false;
authorCodeErrorSection.innerHTML="Required";
}
var price=bookUpdateForm.price.value;
var priceErrorSection=document.getElementById("bookUpdateFormPriceErrorSection");
priceErrorSection.innerHTML="&nbsp;";
if(!price)
{ if(errorComponent==null) errorComponent=bookUpdateForm.price;
valid=false;
priceErrorSection.innerHTML="Required";
} if(price && parseInt(price)<=0)
{ if(errorComponent==null) errorComponent=bookUpdateForm.price;
valid=false;
priceErrorSection.innerHTML="Invalid price";
} if(!valid)
{ errorComponent.focus();
return;
}s
howProgressModal();
$.ajax({
type: 'POST',
url: 'updateBook',
data: {
code : code,
title : title,
category : category,
authorCode : authorCode,
price : price
},
success: function(data) {
var spl=data.split(",");
if(spl[0]==="true")
{
dataModel.books.splice(index,1);
var author=null;
var f;
for(f=0;f<dataModel.authors.length;f++)
{
if(dataModel.authors[f].code==authorCode)
{
author=dataModel.authors[f];
break;
}
}
var book=new Book(code,title,author,category,price);
for(f=0;f<dataModel.books.length;f++)
{
if(dataModel.books[f].title.toUpperCase().localeCompare(title.toUpperCase())>0)
{
break;
}
}
dataModel.books.splice(f,0,book);
hideProgressModal();
disposeModal();
populateBooksView(dataModel.authorCode);
var booksListBody=document.getElementById("booksList").getElementsByTagName('tbody')[0];
var row=booksListBody.rows[f];
selectRow(row);
if(!isElementInViewport(booksListBody,row))
{
row.scrollIntoView(true);
document.body.scrollTop=document.documentElement.scrollTop=0;
}
clearBookSearchComponent();
}
else
{
if(spl.length>2 && spl[2]=='delete')
{
dataModel.books.splice(index,1);
populateBooksView(dataModel.authorCode);
dataModel.selectedRow=null;
hideProgressModal();
disposeModal();
document.getElementById("messageDialogMessageSection").innerHTML=spl[1];
showModal("messageDialogContainer","900px","250px","Update book","")
return;
}
hideProgressModal();
var formErrorSection=document.getElementById("bookUpdateFormErrorSection");
formErrorSection.innerHTML=spl[1];
}
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
}
function confirmBookDeletion(index)
{
var bookDeleteForm=document.getElementById("bookDeleteForm");
bookDeleteForm.index.value=index;
var bookDeleteFormTitleSection=document.getElementById("bookDeleteFormTitleSection");
bookDeleteFormTitleSection.innerHTML=dataModel.books[index].title;
showModal("bookDeleteFormContainer","400px","200px","Delete book","")
}
function deleteBook()
{
var bookDeleteForm=document.getElementById("bookDeleteForm");
var index=bookDeleteForm.index.value;
var book=dataModel.books[index];
showProgressModal();
$.ajax({
type: 'POST',
url: 'deleteBook',
data: {
code : book.code
},
success: function(data) {
var spl=data.split(",");
if(spl[0]==="true")
{
hideProgressModal();
disposeModal();
populateBooksView(dataModel.authorCode);
dataModel.selectedRow=null;
document.getElementById("messageDialogMessageSection").innerHTML="Book : "+book.title+"
deleted.";
dataModel.books.splice(index,1);
populateBooksView(dataModel.authorCode);
showModal("messageDialogContainer","450px","200px","Delete book","")
clearBookSearchComponent();
}
else
{
hideProgressModal();
var formErrorSection=document.getElementById("bookDeleteFormErrorSection");
formErrorSection.innerHTML=spl[1];
}
},
error: function() {
hideProgressModal();
alert('Unable to send request, server not ready......');
}
});
}
function clearBookSearchComponent()
{
var bookToSearch=document.getElementById("bookToSearch");
bookToSearch.value="";
dataModel.searchText="";
if(hasClass(bookToSearch,"bookSearchComponentInputError"))
{
removeClass(bookToSearch,"bookSearchComponentInputError");
addClass(bookToSearch,"bookSearchComponentInput");
}}
function searchBook(textToSearch)
{
var bookToSearch=document.getElementById("bookToSearch");
if(textToSearch.trim().length==0)
{ if(hasClass(bookToSearch,"bookSearchComponentInputError"))
{
removeClass(bookToSearch,"bookSearchComponentInputError");
addClass(bookToSearch,"bookSearchComponentInput");
}
dataModel.searchText="";
return;
} textToSearch=textToSearch.toLowerCase();
if(dataModel.searchText==textToSearch) return;
// done done
var book;
var e;
for(e=0;e<dataModel.books.length;e++)
{
book=dataModel.books[e];
if(book.title.toLowerCase().startsWith(textToSearch)) break;
} if(e==dataModel.books.length)
{
removeClass(bookToSearch,"bookSearchComponentInput");
addClass(bookToSearch,"bookSearchComponentInputError");
return;
} if(hasClass(bookToSearch,"bookSearchComponentInputError"))
{
removeClass(bookToSearch,"bookSearchComponentInputError");
addClass(bookToSearch,"bookSearchComponentInput");
}
var booksListBody=document.getElementById("booksList").getElementsByTagName('tbody')[0];
var row=booksListBody.rows[e];
selectRow(row);
if(!isElementInViewport(booksListBody,row))
{
row.scrollIntoView(true);
document.body.scrollTop=document.documentElement.scrollTop=0;
}}
window.addEventListener('load',initializeView);