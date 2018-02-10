
//------------------------------------------------------------------------------

/*
define( 'IS_MSIE',		(isset($_SERVER['HTTP_USER_AGENT'])&&(strpos($_SERVER['HTTP_USER_AGENT'],'MSIE')!==false)) );
if(!defined('DOCUMENT_ROOT'))
define( 'DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT'] );
define( 'STR_PROTOCOL',	'http'.(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']=='on'?'s':'').'://' );
define( 'SERVER_NAME',	$_SERVER['SERVER_NAME'] );
define( 'STR_PORT',		($_SERVER['SERVER_PORT']!=(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']=='on'?'443':'80')?':'.$_SERVER['SERVER_PORT']:'') );
define( 'SCRIPT_NAME',	$_SERVER['SCRIPT_NAME'] );
define( 'SCRIPT_PATH',	substr(SCRIPT_NAME,0,strlen(SCRIPT_NAME)-strlen(basename(SCRIPT_NAME))) );
define( 'SCRIPT_FILE',	basename(SCRIPT_NAME) );
define( 'SCRIPT_ONLY',	basename(SCRIPT_NAME,'.php') );
define( 'SCRIPT_FILE1',	(SCRIPT_FILE=='index.php'?'':SCRIPT_FILE) );
define( 'PATH_INFO',	(isset($_SERVER['PATH_INFO'])?$_SERVER['PATH_INFO']:'') );
define( 'QUERY_STRING',	$_SERVER['QUERY_STRING'] );
define( 'SEARCH_LINE',	(strlen($_SERVER['QUERY_STRING'])>0?'?':'').$_SERVER['QUERY_STRING'] );
define( 'SCRIPT_HOME',	STR_PROTOCOL.SERVER_NAME.STR_PORT.SCRIPT_PATH.SCRIPT_FILE1 );
//define( 'SCRIPT_HREF',	STR_PROTOCOL.SERVER_NAME.STR_PORT.SCRIPT_PATH.(SCRIPT_FILE=='index.php'?'':SCRIPT_FILE).PATH_INFO.SEARCH_LINE );
define( 'SCRIPT_HREF',	SCRIPT_HOME.PATH_INFO.SEARCH_LINE );
//define( 'SCRIPT_HREF1',	SCRIPT_FILE1.PATH_INFO.SEARCH_LINE );
define( 'HTTP_REFERER',	(isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:'') );
//define( 'LOCALE_DATE',	'd.m.Y H:i:s' ); //see below
// http://php.net/manual/en/dir.constants.php
//define( 'OS_DIRSEP',	(PHP_OS=='WINNT'?'\\':'/') );
//define( 'OS_PATHSEP',	(PHP_OS=='WINNT'?';':':') );
define( 'OS_DIRSEP',	DIRECTORY_SEPARATOR );
define( 'OS_PATHSEP',	PATH_SEPARATOR );
*/

//------------------------------------------------------------------------------

function dirname(path) {
	return path.slice(0,path.lastIndexOf('/')+1);
}

function basename(path, suffix='') {
	return path.slice(path.lastIndexOf('/')+1,path.length-suffix.length);
}
function htmlspecialchars( text ) { // PHP string htmlspecialchars ( string $string [, int $flags = ENT_COMPAT | ENT_HTML401 [, string $encoding = 'UTF-8' [, bool $double_encode = true ]]] )
	return (
		text
		.toString()
		.replace( /\&/g, '&amp;' )
		.replace( /\"/g, '"' )
		.replace( /\</g, '&lt;' )
		.replace( /\>/g, '&gt;' )
	);
}

//------------------------------------------------------------------------------

function __e() {
	for(var i in arguments) {
		var argument = arguments[i];
		if(argument.substr(0,1)=='<' && argument.substr(-1)=='>')
			document.write(argument);
		else
			document.write(htmlspecialchars(argument));
	}
}

//------------------------------------------------------------------------------

// https://www.w3schools.com/jsref/obj_location.asp

const SCRIPT_HREF = window.location.href;
const SERVER_NAME = window.location.hostname;
const SCRIPT_NAME = window.location.pathname;
const SCRIPT_PATH = dirname(SCRIPT_NAME);
const SCRIPT_FILE = basename(SCRIPT_NAME);
const SCRIPT_BASE = basename(SCRIPT_NAME,'.html');
const SEARCH_LINE = window.location.search;
const SCRIPT_HASH = window.location.hash;

//------------------------------------------------------------------------------

const _dico = {
	'' : "Home",
	'fr': "FR",
	'workshop' : "Atelier",
	'workshops' : "Ateliers"
};

//------------------------------------------------------------------------------

function __(word, dico) {
	if(dico[word]) return dico[word]; else return word;
}

//------------------------------------------------------------------------------

function __e_url_chain() {
	var dirnames = (SCRIPT_NAME.length ? SCRIPT_NAME.split('/') : []);
	var terms = [];
//	terms = terms.concat(['<p>']);
	for(var i=0; i<dirnames.length-(dirnames[dirnames.length-1].length==0?1:0); i++)
		terms = terms.concat(
			[
				' > ',
				'<a href="'+'/'+dirnames.slice(1,i+1).join('/')+(i>0 && i<dirnames.length-1 ? '/' : '')+'">',
				__(decodeURI(dirnames[i]),_dico),
				'</a>'
			]
		);
//	terms = terms.concat(['</p>',"\n"]);
	__e.apply(this, terms);
}

//------------------------------------------------------------------------------

const title = document.title;

//------------------------------------------------------------------------------

