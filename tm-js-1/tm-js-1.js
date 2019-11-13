function getXMLHttpObject()
{
var xmlHttpObject=null;
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
xmlHttpObject=new XMLHttpRequest();
}
else
{// code for IE6, IE5
xmlHttpObject=new ActiveXObject("Microsoft.XMLHTTP");
}
return xmlHttpObject;
}
function jsonToQueryString(json)
{
return '?' +
Object.keys(json).map(function(key) {
return encodeURIComponent(key) + '=' +
encodeURIComponent(json[key]);
}).join('&');
}
function AjaxHandler()
{
var xmlHttpObject; // a private property
this.ajax=function(object)
{ if(xmlHttpObject==null) xmlHttpObject=getXMLHttpObject();
xmlHttpObject.onreadystatechange=function(){
if (xmlHttpObject.readyState==4 )
{ if(xmlHttpObject.status==200)
{
object.success(xmlHttpObject.responseText);
} else
{ if(object.error) object.error();
}}}
;
if(!object.type) object.type=object.type.toUpperCase();
if(!object.type) object.type='GET';
if(!object.url) return;
if(object.data && object.type=='GET')
{
var qs=jsonToQueryString(object.data);
xmlHttpObject.open(object.type,object.url+qs,true);
xmlHttpObject.send();
}else if(!object.data && object.type=='GET')
{
xmlHttpObject.open(object.type,object.url,true);
xmlHttpObject.send();
} else if(!object.data && object.type=='POST')
{
xmlHttpObject.open(object.type,object.url, true);
xmlHttpObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlHttpObject.send();
}else if(object.data && object.type=='POST')
{
xmlHttpObject.open(object.type,object.url, true);
xmlHttpObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlHttpObject.send(jsonToQueryString(object.data).substring(1));
}}
;
}
function showProgressModal()
{
var pmm=document.getElementsByClassName("progressModalMask")[0];
pmm.style.visibility="visible";
pmm.style.display="inline";
}
function hideProgressModal()
{
var pmm=document.getElementsByClassName("progressModalMask")[0];
pmm.style.visibility="hidden";
pmm.style.display="none";
}
function showModal(divisionToBeFixedInModal,width,height,title,footer)
{
document.body.scrollTop=document.documentElement.scrollTop=0;
var modalWrapperMask=document.getElementById('modalWrapperMask');
var modalWrapper=document.getElementById("modalWrapper");
modalWrapper.style.width=width;
modalWrapper.style.height=height;
var widthValue=parseInt(modalWrapper.style.width);
var widthUOM=modalWrapper.style.width.substring(modalWrapper.style.width.length-2);
modalWrapper.style.marginLeft=((widthValue/2)*(-1))+"px";
var heightValue=parseInt(modalWrapper.style.height);
var heightUOM=modalWrapper.style.height.substring(modalWrapper.style.height.length-2);
var modalWrapperContainer=document.getElementById("modalWrapperContainer");
modalWrapperContainer.style.height=(heightValue-18-18-38)+heightUOM; // 18 header, 18 footer, 38
shadow
var modalWrapperCloseIcon=document.getElementById("modalWrapperCloseIcon");
if(title)
{
var modalWrapperTitle=document.getElementById("modalWrapperTitle");
modalWrapperTitle.innerHTML=title;
} if(footer)
{
var modalWrapperFooter=document.getElementById("modalWrapperFooter");
modalWrapperFooter.innerHTML=footer;
}
var divToFix=document.getElementById(divisionToBeFixedInModal);
divToFix.remove();
var clone=divToFix.cloneNode(true);
clone.style.visibility="visible";
clone.style.display="inline";
modalWrapperContainer.append(clone);
modalWrapperContainer.fixedComponent=divToFix;
modalWrapperContainer.clonedComponent=clone;
modalWrapperMask.style.visibility="visible";
modalWrapperMask.style.display="inline";
}
function disposeModal()
{
var modalWrapperMask=document.getElementById('modalWrapperMask');
var modalWrapperContainer=document.getElementById("modalWrapperContainer");
var divToUnfix=modalWrapperContainer.clonedComponent;
divToUnfix.remove();
modalWrapperMask.style.visibility="hidden";
modalWrapperMask.style.display="none";
document.body.appendChild(modalWrapperContainer.fixedComponent);
}
function setupModals()
{
var progressModalWrapperMask=document.createElement("div");
progressModalWrapperMask.className="progressModalMask";
var img=document.createElement("img");
img.className='progressIndicator';
img.src="tm-js-1/loading.gif"
progressModalWrapperMask.appendChild(img);
document.getElementsByTagName('body')[0].appendChild(progressModalWrapperMask);
progressModalWrapperMask.style.zIndex = "2000"
// Following is what we created and appended it to body of the page
/*<div id='progressModalWrapperMask' class='progressModalMask'>
<img src='images/loading.gif' class='progressIndicator'></img>
</div>*/
var modalWrapperMask=document.createElement("div");
modalWrapperMask.className="modalMask";
modalWrapperMask.id="modalWrapperMask";
var modalWrapper=document.createElement("div");
modalWrapper.id="modalWrapper";
modalWrapper.className="modal";
modalWrapperMask.appendChild(modalWrapper);
var modalWrapperHeader=document.createElement("div");
modalWrapperHeader.className="modalHeader";
modalWrapperHeader.id="modalWrapperHeader";
modalWrapper.appendChild(modalWrapperHeader);
var modalWrapperTitle=document.createElement("div");
modalWrapperTitle.className="modalTitle";
modalWrapperTitle.id="modalWrapperTitle";
modalWrapperHeader.appendChild(modalWrapperTitle);
var modalWrapperCloseIcon=document.createElement("div");
modalWrapperCloseIcon.className="modalClose";
modalWrapperCloseIcon.id="modalWrapperCloseIcon";
modalWrapperCloseIcon.onclick=disposeModal;
var closeIconImage=document.createElement("img");
closeIconImage.src='tm-js-1/close_modal_icon.png';
modalWrapperCloseIcon.appendChild(closeIconImage);
modalWrapperHeader.appendChild(modalWrapperCloseIcon);
var modalWrapperContainer=document.createElement("div");
modalWrapperContainer.className="modalContainer";
modalWrapperContainer.id="modalWrapperContainer";
modalWrapper.appendChild(modalWrapperContainer);
var modalWrapperFooter=document.createElement("div");
modalWrapperFooter.className="modalFooter";
modalWrapperFooter.id="modalWrapperFooter";
modalWrapper.appendChild(modalWrapperFooter);
document.getElementsByTagName('body')[0].appendChild(modalWrapperMask);
modalWrapperMask.style.zIndex = "1000"
// Following is what we created and appended it to body of the page
/*
<div id='modalWrapperMask' class='modalMask'>
<div id='modalWrapper' class='modal'>
<div id='modalWrapperHeader' class='modalHeader'>
<div id='modalWrapperTitle' class='modalTitle'></div>
<div id='modalWrapperCloseIcon' class='modalClose' onClick='disposeModal()'>
<img src='tm-js-1/close_modal_icon.png'></img>
</div>
</div>
<div id='modalWrapperContainer' class='modalContainer'>
</div>
<div id='modalWrapperFooter' class='modalFooter'>
</div>
</div>
</div>*/
}
// following will setup the function to be called on window load event
window.onload=setupModals;
// following is the declaration of a global varable named as dollar ($)
// The name dollar ($) is just to give you an insight of how JQuery must have done things
// Note : My code is nowhere near to what JQuery creators have done, it is just an introduction
var $=new AjaxHandler();