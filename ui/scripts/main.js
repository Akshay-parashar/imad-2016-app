
$(document).ready(function () {	
	//To check if user is alreasy logged in or not
		function checklogin(){
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if (req.readyState === XMLHttpRequest.DONE){
				//take action 
				if (req.status === 200) {
					alert("You are already logged in,Welcome");
				}
				else {
					alert("Please log in");
				}
			}

		}
		req.open('GET','/check-login',true);
		req.send(null);
	}

	//To load screen for already logged in user 
	function loadloggedinuser() {

	}

	//To hide sign in area
	function hidesignin() {

	}

	//To hide signup area
	function hidesignup() {

	}

	//To register new user 
	function reguser() {

	}


	//Login form
	var login_form = `<form><h3 class="login_pg">Login Page</h3>
                    <br>
                    Username<input type="text" id="Username"><br>
                    Password<input type="password" id="Password"><br>
                    <input type="submit" id="sin_submit_btn" value="Sign in"><form>`;


      //Sign Up Form
     var signup_form = `<form><h3 class="signup_pg">Sign Up Page</h3>
                    <br>
                    Username<input type="text" id="New_Username"><br>
                    Password<input type="password" id="New_Password"><br>
                    <input type="submit" id="sup_submit_btn" value="Sign Up"></input><form>`;
	
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

	
	//for signup page 
	$('#sup_submit_btn').submit(function(){
		alert("this button is working");

	})
	
	//For Login page 
	//var but = //document.getElementById('submit_btn');
	$('#sin_submit_btn').submit(function(){
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
					alert('Success!');
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
			
			
			req.open('POST','http://localhost:8080/login',true);
			req.setRequestHeader('Content-Type', 'application/json');
			req.send(JSON.stringify({username: username, password: password}));
		});

	//-------------------------------------------------------


	//For adding Login and signup in container on clicking the link from main header 
	
	$('#login').on('click',function(){
		var cont = document.getElementById('log_reg');
		//$('#log_reg').append(login_form);
		cont.innerHTML = login_form;
		$('#Username').focus();
		console.log('added the login form');
	});	

	$('#sign_up').on('click',function(){
		var cont = document.getElementById('log_reg');
		//$('#log_reg').append(signup_form);
		cont.innerHTML = signup_form;
		$('#New_Username').focus();
	});

	//--------------------------------------------------------
});


