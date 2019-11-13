function initializeBody()
{
var history_api = typeof history.pushState !== 'undefined';
if(location.hash!=='#library') location.hash='#library';
if ( location.hash === '#library' ) {
if ( history_api )
history.pushState(null, '', '#librarian');
else
location.hash = '#librarian';
window.onhashchange = function() {
if ( location.hash === '#library' ) {
if ( history_api )
history.pushState(null, '', '#librarian');
else
location.hash = '#librarian';
}
};
}
}
window.addEventListener("load",initializeBody);