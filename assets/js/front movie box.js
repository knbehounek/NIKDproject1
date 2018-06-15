//This will bethe information on the home screen that will display current upcoming movies
var moviesBox = [];
var queryURLMovies = "https://api.themoviedb.org/3/movie/now_playing?api_key=1c5427c7604f1f024cf4b0d1a135c28e&language=en-US&page=1"
var queryURLConcerts = 

$(document).ready(function () {
    $.ajax({
        url: queryURLMovies,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var movieInfo = response.results;
        console.log(movieInfo);

        for (var i = 0; i < movieInfo.length; i++) {

            var movieDiv = $('<div></div>');
            movieDiv.addClass('eachMovie');

            var voteAverage = movieInfo[i].vote_average;
            var titleForMovie = $('<p>').text('Vote_Average: ' + voteAverage);
            console.log(voteAverage);

           
            $('movieResults').append(movieDiv);

            var movieImage = $('<img>');
            movieImage.addClass('displayPosters');
            movieImage.attr({src: "http://image.tmdb.org/t/p/w185/" + response.results[i].poster_path});
            movieDiv.append(movieImage);
            movieDiv.append(titleForMovie);

            $('.movieResults').append(movieDiv);
        }      
    })

    $('.displayPosters').on('click', function(){


    })
})
