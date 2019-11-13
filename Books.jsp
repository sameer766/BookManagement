<jsp:include page='/MasterPageTopSection.jsp' />
<script src='/${contextName}/tm-js-1/tm-js-1.js'></script>
<script src='/${contextName}/js/common.js'></script>
<script src='/${contextName}/js/entities.js'></script>
<script src='/${contextName}/js/Books.js'></script>
<h2>Books</h2>
<table class='listContainer'>
<tr>
<td>
<div class='booksListToolBar'>
<div class='bookSearchComponent'>
Search
<input id='bookToSearch' class='bookSearchComponentInput' type='text' maxlength='35' size='36'
onkeyup='searchBook(this.value)'>
</div>
<div class='booksListToolBarButtons'>
<img src='/${contextName}/images/add_icon.png'
onclick='showModal("bookAddFormContainer","400px","340px","Add book","")'></img>
</div>
<div class='bookFilterComponent'>
Filter by author :
<select id='filterByAuthorCode' name='filterByAuthorCode'
onchange='authorSelectionChanged(this.value)'>
<option value='0'>&lt;All&gt;</select>
</select>
</div>
</div>
</td>
</tr>
<tr>
<td>
<table id='booksList' class='booksListView'>
<thead>
<tr>
<th>S.No.</th>
<th>Book</th>
<th>Category</th>
<th>Author</th>
<th>Price</th>
<th>Edit</th>
<th>Delete</th>
</tr>
</thead>
<tbody>
</tbody>
</table>
</td>
</tr>
</table>
<br>
<br>
<br>
<!-- Module Container For Modal Window Start -->
<div id='bookAddFormContainer' class='forModal'>
<span id='bookAddFormErrorSection' class='error'>&nbsp;</span>
<form id='bookAddForm' >
<table>
<tr>
<td colspan='2'>
<table>
<tr>
<td>Title</td>
<td>
<input type='text' name='title' id='title' maxlength='35' size='31'
onkeyup="document.getElementById('bookAddFormTitleErrorSection').innerHTML='&nbsp;'">
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='bookAddFormTitleErrorSection' class='error'>&nbsp;</span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan='2'>
<table>
<tr>
<td>Category</td>
<td>
<select id='category' name='category'
onchange="document.getElementById('bookAddFormCategoryErrorSection').innerHTML='&nbsp;'">
<option value='none'>&lt;Select&gt;</option>
<option value='Science fiction'>Science fiction</option>
<option value='Satire'>Satire</option>
<option value='Drama'>Drama</option>
<option value='Action and Adventure'>Action and Adventure</option>
<option value='Mystery'>Mystery</option>
<option value='Horror'>Horror</option>
</select>
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='bookAddFormCategoryErrorSection' class='error'>&nbsp;</span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan='2'>
<table>
<tr>
<td>Author</td>
<td>
<select name='authorCode' id='authorCode'
onchange="document.getElementById('bookAddFormAuthorCodeErrorSection').innerHTML='&nbsp;'
">
<option value='0'>&lt;Select&gt;</option>
</select>
</td>
<td>
<span id='bookAddFormClearFilterSpan' class='clearFilter'><a href='javascript:clearFilter()'>Clear
filter</a></span>
&nbsp;
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='bookAddFormAuthorCodeErrorSection' class='error'>&nbsp;</span>
</td>
<td>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan='2'>
<table>
<tr>
<td>Price</td>
<td>
<input type='number' min='0' name='price' id='price'
onkeyup="document.getElementById('bookAddFormPriceErrorSection').innerHTML='&nbsp;'">
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='bookAddFormPriceErrorSection' class='error'>&nbsp;</span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan='2' align='center'>
<button type='button' onclick='addBook()'>Add</button>
</td>
</tr>
</table>
</form>
</div>
<div id='bookUpdateFormContainer' class='forModal'>
<span id='bookUpdateFormErrorSection' class='error'>&nbsp;</span>
<form id='bookUpdateForm'>
<table>
<tr>
<td colspan='2'>
<table>
<tr>
<td>Title</td>
<td>
<input type='hidden' id='index' name='index'>
<input type='text' name='title' id='title' maxlength='35' size='31'
onkeyup="document.getElementById('bookUpdateFormTitleErrorSection').innerHTML='&nbsp;'">
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='bookUpdateFormTitleErrorSection' class='error'>&nbsp;</span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan='2'>
<table>
<tr>
<td>Category</td>
<td>
<select id='category' name='category'
onchange="document.getElementById('bookUpdateFormCategoryErrorSection').innerHTML='&nbsp;'
">
<option value='none'>&lt;Select&gt;</option>
<option value='Science fiction'}>Science fiction</option>
<option value='Satire'>Satire</option>
<option value='Drama'>Drama</option>
<option value='Action and Adventure'>Action and Adventure</option>
<option value='Mystery'>Mystery</option>
<option value='Horror'>Horror</option>
</select>
</td>
<td>
<span id='bookUpdateFormClearFilterSpan' class='clearFilter'><a href='javascript:clearFilter()'>Clear
filter</a></span>
&nbsp;
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='bookUpdateFormCategoryErrorSection' class='error'>&nbsp;</span>
</td>
<td></td>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan='2'>
<table>
<tr>
<td>Author</td>
<td>
<select name='authorCode' id='authorCode'
onchange="document.getElementById('bookUpdateFormAuthorCodeErrorSection').innerHTML='&nb
sp;'">
<option value='0'>&lt;Select&gt;</option>
</select>
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='bookUpdateFormAuthorCodeErrorSection' class='error'>&nbsp;</span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan='2'>
<table>
<tr>
<td>Price</td>
<td>
<input type='number' min='0' name='price' id='price'
onkeyup="document.getElementById('bookUpdateFormPriceErrorSection').innerHTML='&nbsp;'">
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='bookUpdateFormPriceErrorSection' class='error'>&nbsp;</span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan='2' align='center'>
<button type='button' onclick='updateBook()'>Update</button>
</td>
</tr>
</table>
</form>
</div>
<div id='bookDeleteFormContainer' class='forModal'>
<center>
<span id='bookDeleteFormErrorSection' class='error'>&nbsp;</span>
<br>
<form id='bookDeleteForm'>
<input type='hidden' id='index' name='name'>
Delete Book : <span id='bookDeleteFormTitleSection'></span> ?
<br>
<br>
<button type='button' onclick='deleteBook()'>Yes</button>
<button type='button' onclick='disposeModal()'>No</button>
</form>
</center>
</div>
<div id='messageDialogContainer' class='forModal'>
<center>
<br>
<h2><span id='messageDialogMessageSection'></span></h2>
<button type='button' onclick='disposeModal()'>Ok</button>
</center>
</div>
<jsp:include page='/MasterPageBottomSection.jsp' />