var currentArticleTitle = window.location.pathname.split('/')[2];
//console.log("article.js included");
//console.log(currentArticleTitle);

function loadcommentform() {
	//Add a comment box HTML 
	var commentFormHtml = `<hr>
		<h3>Submit a comment</h3>
        <textarea id="comment_text" rows="5" class="containerr" placeholder="Enter your comment here..." ></textarea>
        <br/>
        <input type="submit" id="submit" value="Submit" />
        <br/>`;

        document.getElementById('comment_form').innerHTML = commentFormHtml;
        return;


	//Making logic for submitting Comments
}


function loadlogin() {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function () {
		  if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadcommentform(this.responseText);
            }
        }
	};

	req.open('GET','/check-login',true);
	req.send(null);
}

function loadcomments(){
	    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

//Check if user is logged in and loding comments on articles
//loadlogin();
//loadcomments();
loadcommentform();




