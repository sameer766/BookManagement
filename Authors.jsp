<jsp:include page='/MasterPageTopSection.jsp' />
<script src='/${contextName}/tm-js-1/tm-js-1.js'></script>
<script src='/${contextName}/js/common.js'></script>
<script src='/${contextName}/js/Authors.js'></script>
<h2>Authors</h2>
<table class='listContainer'>
<tr>
<td>
<div class='authorsListToolBar'>
<div class='authorSearchComponent'>
Search
<input id='authorToSearch' class='authorSearchComponentInput' type='text' maxlength='35' size='36'
onkeyup='searchAuthor(this.value)'>
</div>
<div class='authorsListToolBarButtons'>
<img src='/${contextName}/images/add_icon.png'
onclick='showModal("authorAddFormContainer","400px","200px","Add author","")'></img>
</div>
</div>
</td>
</tr>
<tr>
<td>
<table id='authorsList' class='authorsListView'>
<thead>
<tr>
<th>S.No.</th>
<th>Author</th>
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
<div id='authorAddFormContainer' class='forModal'>
<span id='authorAddFormErrorSection' class='error'>&nbsp;</span>
<form id='authorAddForm'>
<table border='0'>
<tr>
<td>Name of author</td>
<td>
<input type='text' name='name' id='name' maxlength='35' size='31'>
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='authorAddFormNameErrorSection' class='error'>&nbsp;</span>
</td>
</tr>
<tr>
<td colspan='2' align='center'>
<button type='button' onclick='addAuthor()'>Add</button>
</td>
</tr>
</table>
</form>
</div>
<div id='authorUpdateFormContainer' class='forModal'>
<span id='authorUpdateFormErrorSection' class='error'>&nbsp;</span>
<form id='authorUpdateForm'>
<table border='0'>
<tr>
<td>Name of author</td>
<td>
<input type='hidden' id='code' name='code'>
<input type='hidden' id='oldName' name='oldName'>
<input type='text' name='name' id='name' maxlength='35' size='31'>
</td>
</tr>
<tr>
<td colspan='2' align='right'>
<span id='authorUpdateFormNameErrorSection' class='error'>&nbsp;</span>
</td>
</tr>
<tr>
<td colspan='2' align='center'>
<button type='button' onclick='updateAuthor()'>Update</button>
</td>
</tr>
</table>
</form>
</div>
<div id='authorDeleteFormContainer' class='forModal'>
<center>
<span id='authorDeleteFormErrorSection' class='error'>&nbsp;</span>
<br>
<form id='authorDeleteForm'>
<input type='hidden' id='code' name='code'>
<input type='hidden' id='name' name='name'>
Delete Author : <span id='authorDeleteFormNameSection'></span> ?
<br>
<br>
<button type='button' onclick='deleteAuthor()'>Yes</button>
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