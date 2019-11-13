function hasClass(element,className)
{ if(element.classList)
return element.classList.contains(className);
else
return !!element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}
function addClass(element,className)
{ if(element.classList)
element.classList.add(className)
else if(!hasClass(element, className))element.className+=(" "+className);
}
function removeClass(element,className)
{ if(element.classList)
element.classList.remove(className);
else if(hasClass(element,className))
{
var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');
element.className=el.className.replace(reg,' ');
}}
function isElementInViewport(parent, element)
{
var elementRect = element.getBoundingClientRect();
var parentRect = parent.getBoundingClientRect();
return elementRect.top>=parentRect.top && elementRect.left>=parentRect.left &&
elementRect.bottom<=parentRect.bottom && elementRect.right<=parentRect.right;
}
function selectOption(element,value)
{
var i;
for(i=0;i<element.options.length;i++)
{ element.options[i].removeAttribute("selected");
}
for(i=0;i<element.options.length;i++)
{ if(element.options[i].value==value)
{ element.options[i].setAttribute("selected","");
break;
}}}