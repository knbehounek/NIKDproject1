//This will bethe information on the home screen that will display current upcoming movies
var moviesBox = [];
var queryURLMovies = "https://api.themoviedb.org/3/movie/now_playing?api_key=1c5427c7604f1f024cf4b0d1a135c28e&language=en-US&page=1"
var queryURLConcerts = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=tucson&apikey=b8OAoL9Cio2JXSXZxlJ0ZAeGr2k0iwVL"

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

    $.ajax({
        type:"GET",
        url: queryURLConcerts,
        async:true,
        dataType: "json",
        success: function(response) {
                    console.log(response);
                    // Parse the response.

                    // Do other things.
                    var concertInfo = response._embedded.events;
                    console.log("CONCERT",concertInfo);
            
                    for (var i = 0; i < concertInfo.length; i++) {
            
                        var concertDiv = $('<div></div>');
                        concertDiv.addClass('eachConcert');
            
                        var concertName = concertInfo[i].name;
                        var titleForConcert = $('<p>').text(concertName);
                        console.log("Concert Name",concertName);
            
                       
                        // $('.concertResults').append(concertDiv);
                        // var imgDiv = $('<div style="height: 200px; width: 175px;"></div>');
                        // var concertImage = $('<img style="width: 100%;">');
                        // concertImage.addClass('displayPosters');
                        // imgDiv.append(concertImage);

                        
                        
                        concertDiv.append(titleForConcert);
            
                        

                        // for (var j = 0; j< concertInfo[i].images.length; j++){
                            // concertImage.attr({src: concertInfo[i].images[j].url});
                            // console.log("concert Images",concertInfo[i].images[j].url);
                            // console.log('j',j)
                            var concertImage = $(`<div style="height: 200px; width: 175px;"><img src="${concertInfo[i].images[0].url}" style="width: 100%;"></div>`);
                            concertDiv.append(concertImage);

                        // }
                        $('.concertResults').append(concertDiv);
                 }
        // error: function(xhr, status, err) {
        //             // This time, we do not end up here!
        //          }
      }
    })})
