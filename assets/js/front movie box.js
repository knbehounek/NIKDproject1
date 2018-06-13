//This will bethe information on the home screen that will display current upcoming movies
var moviesBox = [];
var queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=1c5427c7604f1f024cf4b0d1a135c28e&language=en-US&page=1"

$(document).ready(function(){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var movieDiv = $('<div></div>');

        var movieTitle = response.results[0].title;
        console.log(movieTitle);

        var title1 = $('.movieResults').text(movieTitle);

        movieDiv.append(movieTitle);

        var moviePoster = response.results[0].poster_path;
        console.log(moviePoster);

        $('.movieResults').html(movieDiv);

        var movieImage = $('<img>');
        movieImage.attr('src', "http://image.tmdb.org/t/p/w185/" + response.results[0].poster_path);
        movieDiv.append(movieImage);

    })
})
