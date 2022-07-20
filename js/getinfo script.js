//getinfoscript

//Variables externas desde sitio web
var mail = document.getElementById("mail").value; 
var usrid = document.getElementById("IDusr").value;
var dept = document.getElementById("dep").value;
var seg = document.getElementById("seg").value;

//Obtiene info de sitio web
$( document ).ready(function(){

	alert(mail, usrid, dept, seg);  
});
