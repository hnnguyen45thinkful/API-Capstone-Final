$(document).ready(function(){
	var allergyChosen;
	$('#searchButton').on('click', function (event) {	
	    event.preventDefault();
	    var keyword = $('#ingredient').val();
	    var cuisine = $('#cuisine-name').val();
	    $("input[type='checkbox']:checked").each(function(i,allergy){
	    	allergyChosen += "&allowedAllergy[]=" + $(allergy).val();	    
	    });
	    recipeValidation(keyword,cuisine,allergyChosen);
	});
});



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
		url: "https://api.yummly.com/v1/api/recipes?_app_id=6d9e22ab&_app_key=e4270a20949b90bf9cca1017d935f12b&q=" + keyword + "&allowedCuisine[]=cuisine^cuisine-" + cuisine + "&requirePictures=true" + allergy + "&maxResult=100",
		dataType: "jsonp",
		type: "GET"
		})
	.done(function(result){
		$('.recipe-details').html('');
		$.each(result.matches, function(i, matches) {
			var recipe = '<li><div class="recipe-image"><img src="' +
							matches.imageUrlsBySize[90] + '" alt="Recipe image" width="170"></div><div class="recipe-description"><p>' +
							matches.sourceDisplayName + '</p><p><a target="_blank" href=https://www.yummly.com/recipe/' +
							matches.id + ' >' + matches.recipeName + '</a></p><p>Cooking time: ' + 
							matches.totalTimeInSeconds/60 + ' minutes</p><p>Rating: ' + 
							matches.rating + " out of 5" + '</p></div></li>';
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



