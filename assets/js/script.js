/*
gitmbed: A safe img -> embed for GitHub

Copyright Finn Lncaster 2021

MIT License
*/

// listen for form submit
document.getElementById("code_gitmbed_auto").addEventListener('submit', function(e) {
    var url = document.getElementById('link').value;
    var width = document.getElementById('link_width').value;
    var height = document.getElementById('link_height').value;

    document.getElementById('output').value = `<a href="#gitmbed=`+url+`,`+width+`,`+height+`"><img width="100%" src="https://flancast90.github.io/gitmBed/button_gitmbed.png"/></a>               
    `;

    e.preventDefault();
});
