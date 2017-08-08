/* ready function */
(function(){
	console.log('script read');
})();

function toggleAllCheckbox(this) {
	for each (var chkbox in document.querySelectorAll('j-sel-quo')) {
	  chkbox.checked = this.checked;
	}
}