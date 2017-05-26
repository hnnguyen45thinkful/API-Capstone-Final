$(document).ready(function(){     var allergyChosen;

	$('.allergy').on('click',function(){
		$(this).toggleClass('highlight');
	});
	$('#searchButton').on('click', function (event) {	
	    event.preventDefault();
	    var keyword = $('#ingredient').val();
	    var cuisine = $('#cuisine-name').val();
	    $(".allergy.highlight").each(function(i,allergy){
	    	allergyChosen += "&allowedAllergy[]=" + $(allergy).attr('id');	    
	    });
	    recipeValidation(keyword,cuisine,allergyChosen);
	});
});
//$('.filter').click(function(){ $(this).toggleClass('highlight'); });


var recipeValidation = function(keyword,cuisine,allergy) {
	if ((keyword == '') && (cuisine == null) && (allergy == null)) {
	   	alert('Please enter in the text box and try again!');
	    $('.recipe-details').html('');
	    return false;
	} else {
		getRecipe(keyword,cuisine,allergy);
	}
}

var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
}

var getRecipe = function(keyword,cuisine,allergy) {
	
	var result = $.ajax({
		url: "https://api.yummly.com/v1/api/recipes?_app_id=a44abcc4&_app_key=ee62307e710ad4b6681a03aae74974bb&q=" + keyword + "&allowedCuisine[]=cuisine^cuisine-" + cuisine + "&requirePictures=true" + allergy + "&maxResult=100",
		dataType: "jsonp",
		type: "GET"
		})
	.done(function(result){
		console.log(result.matches[0]);
		$('.recipe-details').html('');
		$.each(result.matches, function(i, matches) {
			var recipe = (
    `<li style="background-image: url(${matches.imageUrlsBySize[90].replace("s90-c","s200-c")})"> 
<div class="recipe-description">
    <div class="recipeName">
                <h2 id="recipeName">  
        <a target="_blank" href="https://www.yummly.com/recipe/" + ${matches.id}>
        ${matches.recipeName}
        </a>
        </h2>
        <div class="author">By: ${matches.sourceDisplayName} </div>
        <p class="rate">Rating: ${matches.rating}/5 </p>
       <div class="time">
         <img src="http://i.imgur.com/00aeNTk.png" height = "25" width = "25"><span id=cookTime>Time: ${matches.totalTimeInSeconds/60} minutes</span>
        </div>
    </div>
</li>`
);

            $('.recipe-details').append(recipe);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
}

//1 - Create the Allergy Dropdown in the HTML 
//2 - match the option tags to what the API Docs lists as the possibly allowedAlergen[]'s
//3 - create the JS variable that grabs the .val() from the dropdown
//4 - pass that variable as a parameter to your other functions
//5 - adjust the functions to accept that parameter
//6 - add the allowedAllergy[] portion to the API url and concatenate your variable in



//Create a div classes only, applyi margin top and bottom