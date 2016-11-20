

$(document).ready(function () {	
	//Hide both login and sign up forms and logout
	$("#signup_area").hide();
	$('#signin_area').hide();
	$('#logout').hide();

	//---------------------------------

	//To change UI as user is already logged in 
	function logoutnav() {
		console.log("yes logout nav is called");
		$('#login').hide();
		$('#sign_up').hide();
		$('#logout').show();
		$('#logout').click(function(){
			var req = new XMLHttpRequest();
		    req.onreadystatechange = function(){
				if (req.readyState === XMLHttpRequest.DONE){
					//take action 
					if (req.status === 200) {
						//alert(req.responseText);
						alert("You have logged out");
						window.location.href = '/window.location';
						

					}
					else {
						alert("Please log in");
					}
				}

			}

			req.open('GET','/logout',true);
			req.send(null);		
		});
	}

	//To check if user is alreasy logged in or not
		function checklogin(){
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if (req.readyState === XMLHttpRequest.DONE){
				//take action 
				if (req.status === 200) {
					if(req.responseText == "Account_User") {
					logoutnav();
					//alert(req.responseText);
					//Change navigation links as the user is already logged in 

					}
					else if(req.responseText = 'Guest'){
						console.log("Guest rights allowed");
						//alert(req.responseText);

					}
				}
			}

		}
		req.open('GET','/check-login',true);
		req.send(null);
	}

		checklogin();

	//Login form
	var login_form = `<h3 class="login_pg">Login Page</h3>
                    <br>
                    Username<input type="text" id="Username"><br>
                    Password<input type="password" id="Password"><br>
                    <input type="submit" id="sin_submit_btn" value="Sign in">`;


      //Sign Up Form
     var signup_form = `<h3 class="signup_pg">Sign Up Page</h3>
                    <br>
                    Username<input type="text" id="New_Username"><br>
                    Password<input type="password" id="New_Password"><br>
                    <input type="submit" id="sup_submit_btn" value="Sign Up"></input>`;
	
	// For Fetching artilces from database dynamically

	var preq = new XMLHttpRequest();

	//catch the response and store it 
	preq.onreadystatechange = function(){
		if(preq.readyState === XMLHttpRequest.DONE){
			//Take action
				if (preq.status === 200) {
					console.log("getting response from db endpoint")
				var blog_con = preq.responseText;
				var con = document.getElementById('post_container');
				//$("#").html(blog_con);
				con.innerHTML = blog_con;
			}
		}
			//Not done
	};

	//Making a Request
	preq.open('GET','/fetch_blog_posts',true);
	preq.send(null);

	//------------------------------------------------		

	
	//For signup page 
	$('#sup_submit_btn').on('click',function(){
	 var username = document.getElementById('New_Username').value;
	 var password = document.getElementById('New_Password').value;
	 console.log(username);
	 console.log(password);
	 //Create a new response object
	 var req = new XMLHttpRequest();

	 //Catch the response and store it in a variable
		req.onreadystatechange = function(){
			if(req.readyState === XMLHttpRequest.DONE){
				//Take action
					if (req.status === 200) {
					//
					console.log('user created!');
					//alert('Success!');
				}
				else if(req.status == 403){
					alert('Username/password is incorrect');
				}
				else if(req.status == 500){
					alert('something went wrong on serever');	
				}
			}
				//Not done
		};

			//Making a Request
			
			
			req.open('POST','/create_user',true);
			req.setRequestHeader('Content-Type', 'application/json');
			req.send(JSON.stringify({username: username, password: password}));

			//TODO: Redirect after signing in the new user and change UI
		});

	//-----------------------------------------------
	
	//For Login page 
	//var but = //document.getElementById('submit_btn');
	$('#sin_submit_btn').on('click',function(){
	 var username = document.getElementById('Username').value;
	 var password = document.getElementById('Password').value;
	 console.log(username);
	 console.log(password);
	 //Create a new response object
	 var req = new XMLHttpRequest();

	 //Catch the response and store it in a variable
		req.onreadystatechange = function(){
			if(req.readyState === XMLHttpRequest.DONE){
				//Take action
					if (req.status === 200) {
					//
					console.log('user logged in!');
					//alert('Success!');
					window.location.href = '/'; //Here's my redirect - the router is listening for this route and will render accordingly
				}
				else if(req.status == 403){
					alert('Username/password is incorrect');
				}
				else if(req.status == 500){
					alert('something went wrong on serever');	
				}
			}
				//Not done
		};

			//Making a Request
			
			
			req.open('POST','/login',true);
			req.setRequestHeader('Content-Type', 'application/json');
			req.send(JSON.stringify({username: username, password: password}));

			//TODO: Redirect after signing in the new user and change the UI
		});

	//-------------------------------------------------------


	//For adding Login and signup in container on clicking the link from main header 
	
	$('#login').on('click',function(){

		$('#signup_area:visible').hide();
		$('#signin_area').show();
		$('#Username').focus();

		
	});	

	$('#sign_up').on('click',function(){
		$('#signin_area:visible').hide();
		$('#signup_area').show();
		$('#New_Username').focus();

	});

	$('#about_btn').click(function(){
		window.location.href = '/about';
	});

	//--------------------------------------------------------
});


