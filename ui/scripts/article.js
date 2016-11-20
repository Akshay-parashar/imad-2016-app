var currentArticleTitle = window.location.pathname.split('/')[2];
//console.log("article.js included");
//console.log(currentArticleTitle);

function loadcommentform() {
	//Add a comment box HTML 
	var commentFormHtml = `<hr>
		<h3>Submit a comment</h3>
        <textarea id="comment_text" rows="5" class="containerr" placeholder="Enter your comment here..." ></textarea>
        <br/>
        <input type="submit" id="submitt" value="Submit" />
        <br/>`;

        document.getElementById('comment_form').innerHTML = commentFormHtml;
        
}


function loadlogin() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		  if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
            	console.log(request.responseText);
                if (request.responseText == "Account_User") {
                	loadcommentform();
                }
                else {
                	var comment = '';
                	var hookcomm = document.getElementById('comment_form');
                	comment = comment + '<p><b>Please login to leave a comment</b></p>';
                	hookcomm.innerHTML = comment;
                }
                
            }
        }
	};

	request.open('GET','/check-login',true);
	request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
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
                    //Taking care to prevent from XSS attacks
                    content += `<hr>
                    		<div class="indi_comment ">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            Posted By: <b>${commentsData[i].username}</b> On: <b>${time.toLocaleDateString()}</b> At: <b>${time.toLocaleTimeString()}</b> 
                        </div>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML ='Oops! Could not load comments!';
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

//Check if user is logged in and loding comments on articles
loadlogin();
loadcomments();

//For submitting Comments
	
    var submit = document.getElementById('submitt');
    submit.onclick = function () {
        // Create a request object
        var prequest = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        prequest.onreadystatechange = function () {
          if (prequest.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (prequest.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadcomments();
                    //alert("Will Shortly LoadComments");  
                } else {
                    alert('Error! Could not submit comment');
                    console.log(prequest.responseText);
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        prequest.open('POST', '/submit-comment/' + currentArticleTitle, true);
        console.log(currentArticleTitle);
        prequest.setRequestHeader('Content-Type', 'application/json');
        prequest.send(JSON.stringify({comment: comment})); 
        submit.value = 'Submitting...';
        
    };




