//var blog_container = document.getElementById('blog_pos_con');

$(document).ready(function () {
	$("#bg_date").click(function(){
		$(this).hide();
		console.log("WOOOOOHOOOOO!!!!!")
	});

	var con = `<div class="post" > 
                        <h3 class="post_heading">Article one</h3>
                        <span class="post_date" id="bg_date">10-10-2016</span><span class="post_comments"># Comments</span>
                        <p class="post_conent">This is my first blog post article. And yes i know it took me a long time to develop this layout bt yeah it was worth it.
                        And the said part is,this is only the ui part without any jquery or stuff i still have to add the backend logic and connecting this to my database and changing the server js and main js files. </p>
                        <a href="#">Comment</a>
                        <hr>
                    </div>`

	$("#bg_date").click(function(){
		console.log("Executed")
		$("#blog_pos_con").append(con);
	});

});
