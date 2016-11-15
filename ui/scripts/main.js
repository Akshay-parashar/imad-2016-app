
$(document).ready(function () {
	localStorage.removeItem("tot_art_count");
	var tot_art = '';
	curr_show_art = localStorage.getItem("tot_art_count");
	//curr_show_art = 0;
	console.log(curr_show_art + " after initial load/referesh");
	if(curr_show_art == null){
		curr_show_art = 0;
	}
	//Login form
	var login_form = `<h3 class="login_pg">Login Page</h3>
                    <br>
                    Username<input type="text" id="Username"><br>
                    Password<input type="password" id="Password"><br>
                    <input type="submit" id="submit_btn" value="Sign in"></input>`;


      //Sign Up Form
     var signup_form = `<h3 class="signup_pg">Sign Up Page</h3>
                    <br>
                    Username<input type="text" id="New_Username"><br>
                    Password<input type="password" id="New_Password"><br>
                    <input type="submit" id="sup_submit_btn" value="Sign Up"></input>`;
	
	// For Fetching artilces from database dynamically

	//Fetch articles only if current articles are less than that in the database
	var chk_pos = new XMLHttpRequest();

	chk_pos.onreadystatechange = function(){
		if(chk_pos.readyState === XMLHttpRequest.DONE){
						//Take action
							if (chk_pos.status === 200) {
								//console.log("getting response from db endpoint")
								 tot_art = chk_pos.responseText;
								 console.log("value of tot_art is : " + tot_art);
								 console.log("value of curr_art before if cond is : " + curr_show_art);
								if(curr_show_art < parseInt(tot_art)){
									//If current showing articles are less than that in db only then fetch articles
									localStorage.setItem("tot_art_count",tot_art);
									curr_show_art = localStorage.getItem("tot_art_count");
									console.log(curr_show_art + " Stored value from db endpoint, this is old");
									var preq = new XMLHttpRequest();

									//catch the response and store it 
									preq.onreadystatechange = function(){
													if(preq.readyState === XMLHttpRequest.DONE){
														//Take action
															if (preq.status === 200) {
																console.log("getting response from db endpoint")
															var blog_con = preq.responseText;
															var con = document.getElementById('posts');
															//$("#").html(blog_con);
															con.innerHTML = blog_con;
														}
													}
														//Not done
												};

											//Making a Request
											preq.open('GET','http://localhost:8080/fetch_blog_posts',true);
											preq.send(null);
								}
								else if (curr_show_art >= parseInt(tot_art)) {
									// Do Nothing
									console.log("atleast render the old content");
								}
						}
					}
						//Not done
	};

	chk_pos.open('GET','http://localhost:8080/tot_blog_pos',true);
	chk_pos.send(null);




	//------------------------------------------------		

	
	//For Login page 
	var but = $('#submit_btn');
	but.click(function(){
	var username = document.getElementById('Username').value;
	var password = document.getElementById('Password').value;;
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


	$('#login').click(function(){
		$('#log_reg').append(login_form);
		$('#Username').focus();
	});	

	$('#sign_up').click(function(){
		$('#log_reg').append(signup_form);
		$('#New_Username').focus();
	});
});


