$(document).ready(function () {
	alert("pageload event fired!");
	// For Fetching artilces from database dynamically 
	var preq = new XMLHttpRequest();

	//catch the response and store it 
	preq.onreadystatechange = function(){
					if(preq.readyState === XMLHttpRequest.DONE){
						//Take action
							if (preq.status === 200) {
								console.log("getting response from db endpoint")
							var blog_con = preq.responseText;
							$("#blog_pos_con").append(blog_con);
						}
					}
						//Not done
				};

			//Making a Request
			preq.open('GET','http://localhost:8080/fetch_blog_posts',true);
			preq.send(null);

	
	var counter = 0;
	var span = $("#count")

	//For counter logic
	var button = $("#counter");
		button.click(function(){
			//Create a request
				var req = new XMLHttpRequest();


			//Catch the response and store it in a variable
				req.onreadystatechange = function(){
					if(req.readyState === XMLHttpRequest.DONE){
						//Take action
							if (req.status === 200) {
							var counter = req.responseText;
							span.html(counter.toString());
						}
					}
						//Not done
				};

				//Making a Request
				req.open('GET','http://localhost:8080/counter',true);
				req.send(null);
			
	});
	
});


