//mininal lib
function $(target, query){
	if(typeof target.querySelector !== "function") {return $(document, target)}
	return target.querySelector(query);
}
function $all(target, query){
	if(typeof target.querySelectorAll !== "function") {return $all(document, target)}
	return Array.prototype.slice.call(target.querySelectorAll(query));
}
function $create(tagname, text){
	var newTag = document.createElement(tagname);
	if (text){
		newTag.appendChild(document.createTextNode(text));
	}
	return newTag;
}
if (!('remove' in Element.prototype)) {
	Element.prototype.remove = function() {
		this.parentElement.removeChild(this);
	};
}
if (!('on' in HTMLElement.prototype)) {
	HTMLElement.prototype.on = function() {
		this.addEventListener.apply(this, arguments);
	}
}
//common module
var wikinote = {};
wikinote.common = (function(){
	function noop(){}

	var keymap = {
		ctrl : {
			"E" : goEditPage,
			"M" : goMovePage,
			"L" : goViewPage
		},
		alt : {
			"P" : goPresentation
		}
	}

	document.body.on("keydown", function(e) {
		var keyCode = String.fromCharCode(e.keyCode);
		if(navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey){
			if(keymap.ctrl[keyCode]) {
				keymap.ctrl[keyCode]();
				e.preventDefault();
			}
		} else if(e.altKey) {
			if(keymap.alt[keyCode]){
				keymap.alt[keyCode]();
				e.preventDefault();
			}
		}
	}, false)

	function goViewPage(){
		location.href = getUrl();
	}
	function goEditPage(){
		location.href = getUrl() + "?edit";
	}
	function goMovePage(){
		location.href = getUrl() + "?move";
	}
	function goPresentation(){
		location.href = getUrl() + "?presentation";
	}
	function getUrl(){
		return location.pathname;
	}

	function createMsgElement(str){
		var $msg = $create("p", str);
		$msg.classList.add("msg-dynamic");
		$msg.innerHTML = str;

		$msg.on("animationend", function(){
			$msg.remove();
		}, false);

		return $msg;
	}
	function showInfo(msg){
		var $msg = createMsgElement(msg);
		var $alert = $("#alert");

		$alert.appendChild($msg);
	}
	function showWarning(msg){
		var $msg = createMsgElement(msg);
		$msg.classList.add("warn");
		var $alert = $("#alert");

		$alert.appendChild($msg);
	}

	return {
		alert : {
			warn: showWarning,
			info : showInfo
		}
	}
})();
