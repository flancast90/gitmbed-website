        /*
         * gitmbed website (script.js)
         *
         * all code copyright Finn Lancaster 2021
         *
         * open-source under MIT License
        */
        window.addEventListener('load', function() {
            if (window.location.href.includes('#')) {
                // single page html to function like multi-page
                document.addEventListener('click', function(e) {
                    // when an <a> attribute is refreshed, we will reload the entire page
                    // so that the JS has time to check, since it won't run except on page
                    // load.
                    if (e.target.tagName == 'A') {
                        if (e.target.href !== 'undefined') {
                           window.location.href = e.target.href
                           location.reload();
                        }
                    }
                });

                document.getElementById('mobileSearch').addEventListener('keyup', search_handler_mobile);
               document.getElementById('searchMain').addEventListener('keyup', search_handler); 

                //listen for user to click enter to submit search
                function search_handler(e) {
                    if (e.which == "13") {
                        // 'hack' the usage of <a>'s in JS because we know it auto-refreshes
                        // so we'll add a new <a> with the href of the search term, which
                        // the js is pre-programmed to handle.
                        var searchControl = document.createElement('a');
                        searchControl.setAttribute('href', "#search/"+document.getElementById('searchMain').value);
                        searchControl.setAttribute('id', 'searchControl');
                        document.body.appendChild(searchControl);
                        document.getElementById('searchControl').click();
                        document.getElementById('searchControl').remove();
                    }
                }

                // I gave up trying to combine the search functions
                //listen for user to click enter to submit search
                function search_handler_mobile(e) {
                    if (e.which == "13") {
                        // 'hack' the usage of <a>'s in JS because we know it auto-refreshes
                        // so we'll add a new <a> with the href of the search term, which
                        // the js is pre-programmed to handle.
                        var searchControl = document.createElement('a');
                        searchControl.setAttribute('href', "#search/"+document.getElementById('mobileSearch').value);
                        searchControl.setAttribute('id', 'searchControl');
                        document.body.appendChild(searchControl);
                        document.getElementById('searchControl').click();
                        document.getElementById('searchControl').remove();
                    }
                }

                // listen for form submit
                document.getElementById("code_gitmbed_auto").addEventListener('submit', function(e) {
                    // local function variables
                    var url = document.getElementById('link').value;
                    var width = document.getElementById('link_width').value;
                    var height = document.getElementById('link_height').value;

                    // we will check to see what we need to output to the user, 
                    // since the usage is different depending on their selection
                    if (document.getElementById('GitHub').checked) {
                        document.getElementById('output').style.display = 'block';
                        document.getElementById('insta-instructions').style.display = 'none';
                        document.getElementById('output').value = `<a href="https://chrome.google.com/webstore/detail/gitmbed/cbfjhpckapddemlmidlmgoepochhfpfi"><img width="100%" src="https://flancast90.github.io/gitmBed/button_gitmbed.png" alt="gitmbed=`+url+`,`+width+`,`+height+`"/></a>`;
                        
                        // scroll to page bottom, since the user could miss the changes
                        // that are added with certain screen sizes without this.
                        window.scrollTo(0,document.body.scrollHeight);  
                    } else {
                        document.getElementById('output').style.display = 'none';
                        document.getElementById('insta-instructions').style.display = 'block';
                        document.getElementById('code_gitmbed_auto').style.display = 'none';
                        document.getElementById('insta_code').value = "gitmbed="+url+","+width+","+height;
                    }

    // don't refresh the form when submitted, because we don't have a server to handle it.
    e.preventDefault();
});
                if (window.location.href.includes('#search/')) {
                    var links = [];
                    //handle searches
                    var searchText = window.location.href.split('#search/')[1];

                    // make a crawler to add all site links to array to iterate in for search text.
                    for (var i = 0; i < document.getElementsByClassName('SideNav-item').length; i++) {
                        if (document.getElementsByClassName('SideNav-item')[i].href !== 'undefined') {
                            if (document.getElementsByClassName('SideNav-item')[i].href.includes('=')) {
                                links.push(document.getElementsByClassName('SideNav-item')[i].href.split('#')[1].split('=')[0]);
                            }else {
                                links.push(document.getElementsByClassName('SideNav-item')[i].href.split('#')[1]);
                            }
                        }
                    }

                    for (var i = 0; i < links.length; i++) {
                        // check each item in array links, which are also conveniently the
                        // ids of our main content. So we know that if the links.innerText
                        // includes the correct search text, we can grab that id to output.
                        if (document.getElementById(links[i]).innerText.includes(searchText)) {
                            document.getElementById('search').style.display = 'block';
                            document.getElementById('search-results').innerHTML += `
                            <a href="`+document.getElementsByClassName('SideNav-item')[i].href+`"><div width="100%" class="search-result">
                            <b>`+searchText+`</b> in `+document.getElementsByClassName('SideNav-item')[i].innerHTML+`</a>
                            </div>
                            `;

                        }
                    }
    
                }

                // check if the url is a sublink of a section, so we can display
                // more elements by id.
                if (window.location.href.split('#')[1].includes("=")) {
                    document.getElementById(window.location.href.split("#")[1].split("=")[0]).style.display = "block";
                    document.getElementById(window.location.href.split("#")[1].split("=")[1]).style.display = "block";

                    // because it is single file, we have to hack the aria-current attribute
                    // to make sure the user sees what tab they are on correctly.
                    for (var i = 0; i < document.getElementsByClassName('tabnav-tab').length; i++) {
                        var href = (window.location.href);
                        if (document.getElementsByClassName('tabnav-tab')[i].href == href) {
                            document.getElementsByClassName('tabnav-tab')[i].ariaCurrent = "page";
                        }else {
                            // here we will remove the old active tab
                            document.getElementsByClassName('tabnav-tab')[i].removeAttribute("aria-current", "page");
                        }
                    }

                }else {
                    // if url is valid, the id of the correct page is the same, so we can
                    // display this
                    document.getElementById(window.location.href.split("#")[1]).style.display = "block";
                }
            }else {
                // if user doesn't go to a page section, just send them to the install page
                window.location.href = (window.location.href + "#install=chrome");
                location.reload();
            }
        });
