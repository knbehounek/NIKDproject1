//This will bethe information on the home screen that will display current upcoming movies
var moviesBox = [];
var queryURLMovies = "https://api.themoviedb.org/3/movie/now_playing?api_key=1c5427c7604f1f024cf4b0d1a135c28e&language=en-US&page=1"
var queryURLConcerts = "https://app.ticketmaster.com/discovery/v2/events.json?size=20&city=tucson&apikey=b8OAoL9Cio2JXSXZxlJ0ZAeGr2k0iwVL"

$(document).ready(function () {
  movieCall();
  concertCall();

  function removeDups(arrOfObj) {
    arrOfObj.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    // delete all duplicates from the array
    for (var i = 0; i < arrOfObj.length - 1; i++) {
      if (arrOfObj[i].name == arrOfObj[i + 1].name) {
        delete arrOfObj[i];
      }
    }

    // remove the "undefined entries"
    arrOfObj = arrOfObj.filter(function (el) { return (typeof el !== "undefined"); });
    return arrOfObj
  }

  //Appends Movie Posters with click events to index
  //searchbox for in the concerts box on index.html
  $('#concertSearch').on('click', function (event) {
    event.preventDefault();
    var cityInput = $('#cityInput').val();
    $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?size=20&city=" + cityInput + "&apikey=b8OAoL9Cio2JXSXZxlJ0ZAeGr2k0iwVL",
      async: true,
      dataType: "json",
      success: function (response) {
        console.log(response);
        $('.concertResults').empty();

        // Do other things.
        var concertInfo = response._embedded.events;
        console.log("CONCERT", concertInfo);
        var filteredConcertInfo = removeDups(concertInfo);
        console.log("FILTERED INFO", filteredConcertInfo);

        for (var i = 0; i < filteredConcertInfo.length; i++) {


          var concertDiv = $('<div></div>');
          concertDiv.addClass('eachConcert');
          // var unionNames = _.union(concertInfo[i].name);
          // console.log(concertInfo[i].name);

          var concertName = filteredConcertInfo[i].name;
          var concertDate = filteredConcertInfo[i].dates.start.localDate;
          console.log(concertDate);
          var dateForConcert = $('<p>').text(concertDate);
          var titleForConcert = $('<p>').text(concertName);
          console.log("Concert Name", concertName);



          $('.concertResults').append(concertDiv);
          var imgDiv = $('<div></div>');
          var concertImage = $('<img>');
          var urlTarget = "";
          var imageLink = $('<a>').attr('href', filteredConcertInfo[i].url);
          imageLink.attr('target', "_blank");


          concertImage.addClass('concertDisplayPosters');
          concertImage.attr('concertId', filteredConcertInfo[i]);
          console.log("ATTRACTIONS", filteredConcertInfo[i]);
          imageLink.html(concertImage);

          imgDiv.append(imageLink);
          concertDiv.append(titleForConcert);
          concertDiv.append(dateForConcert);

          for (var j = 0; j < filteredConcertInfo[i].images.length; j++) {
            var picWidth = filteredConcertInfo[i].images[j].width;
            var picHeight = filteredConcertInfo[i].images[j].height;

            if (picWidth === 205 && picHeight === 115) {
              console.log("concert Images", filteredConcertInfo[i].images[j].url);
              concertImage.attr({ src: filteredConcertInfo[i].images[j].url });
              concertDiv.append(imageLink);
            }
          }

          // concertImage.attr({src: filteredConcertInfo[i].images[j].ratio});
          // console.log('j',j)
          // var concertImage = $(`<div style="height: 200px; width: 175px;"><img src="${filteredConcertInfo[i].images[0].url}" style="width: 100%;"></div>`);

          // }
          $('.concertResults').append(concertDiv);
        }
        // error: function(xhr, status, err) {
        //             // This time, we do not end up here!
        //          }

      }
    })


    console.log(cityInput);
  })

  //concert searchbox on concert.html
  $('#concertSearchHTML').on('click', function (event) {
    event.preventDefault();
    var cityInput = $('#cityInputConcert').val();
    $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?size=20&city=" + cityInput + "&apikey=b8OAoL9Cio2JXSXZxlJ0ZAeGr2k0iwVL",
      async: true,
      dataType: "json",
      success: function (response) {

        $('.concertHTML').empty();

        var concertInfo = response._embedded.events;
        console.log("CONCERT", concertInfo);
        var filteredConcertInfo = removeDups(concertInfo);
        console.log("FILTERED INFO", filteredConcertInfo);

        for (var i = 0; i < filteredConcertInfo.length; i++) {


          var concertDiv = $('<div></div>');
          concertDiv.addClass('eachConcert');
          // var unionNames = _.union(concertInfo[i].name);
          // console.log(concertInfo[i].name);

          var concertName = filteredConcertInfo[i].name;
          var concertDate = filteredConcertInfo[i].dates.start.localDate;
          console.log(concertDate);
          var dateForConcert = $('<p>').text(concertDate);
          var titleForConcert = $('<p>').text(concertName);
          console.log("Concert Name", concertName);

          $('.concertHTML').append(concertDiv);
          var imgDiv = $('<div></div>');
          var concertImage = $('<img>');
          var urlTarget = "";
          var imageLink = $('<a>').attr('href', filteredConcertInfo[i].url);
          imageLink.attr('target', "_blank");

          concertImage.addClass('concertDisplayPosters');
          concertImage.attr('concertId', filteredConcertInfo[i]);
          console.log("ATTRACTIONS", filteredConcertInfo[i]);
          imageLink.html(concertImage);

          var concertbutton = $('<input type="button" value="Add to Concert List" />');
          concertbutton.appendTo($(concertDiv));

          imgDiv.append(imageLink);
          concertDiv.append(titleForConcert);
          concertDiv.append(dateForConcert);

          for (var j = 0; j < filteredConcertInfo[i].images.length; j++) {
            var picWidth = filteredConcertInfo[i].images[j].width;
            var picHeight = filteredConcertInfo[i].images[j].height;

            if (picWidth === 205 && picHeight === 115) {
              console.log("concert Images", filteredConcertInfo[i].images[j].url);
              concertImage.attr({ src: filteredConcertInfo[i].images[j].url });
              concertDiv.append(imageLink);
            }
          }

          // concertImage.attr({src: filteredConcertInfo[i].images[j].ratio});
          // console.log('j',j)
          // var concertImage = $(`<div style="height: 200px; width: 175px;"><img src="${filteredConcertInfo[i].images[0].url}" style="width: 100%;"></div>`);

          // }
          $('.concertHTML').append(concertDiv);
        }
        // error: function(xhr, status, err) {
        //             // This time, we do not end up here!
        //          }
      }
    })
  })

  function movieCall() {
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
        var titleForMovie = $('<p>').text('Peer Rating ot of 10: ' + voteAverage);
        console.log(voteAverage);


        $('movieResults').append(movieDiv);

        var movieImage = $('<img>');

        movieImage.addClass('displayPosters');
        movieImage.attr({ src: "http://image.tmdb.org/t/p/w185/" + movieInfo[i].poster_path });
        movieImage.attr("movieId", movieInfo[i].id);
        console.log("Movie Id" + movieInfo[i].id);

        movieDiv.append(movieImage);
        movieDiv.append(titleForMovie);

        $('.movieResults').append(movieDiv);
      }
    })
  }


  $(this).on('click', '.displayPosters', function () {

    console.log(this);
    $.ajax({
      url: "https://api.themoviedb.org/3/movie/" + $(this).attr('movieId') + "/videos?api_key=1c5427c7604f1f024cf4b0d1a135c28e&language=en-US"
      ,
      method: "GET"
    }).then(function (response) {
      console.log("Youtube ", response);

      var movieVideo = response.results;
      console.log("Movie Video", movieVideo[0].key);
      var youTubeUrl = 'https://www.youtube.com/watch?v=' + movieVideo[0].key;
      var win = window.open(youTubeUrl, '_blank');
      win.focus();
    })

  })

  //Appends the Concerts to the Index html
  function concertCall() {
    $.ajax({
      type: "GET",
      url: queryURLConcerts,
      async: true,
      dataType: "json",
      success: function (response) {
        console.log(response);
        // Parse the response.

        // Do other things.
        var concertInfo = response._embedded.events;
        console.log("CONCERT", concertInfo);
        var filteredConcertInfo = removeDups(concertInfo);
        console.log("FILTERED INFO", filteredConcertInfo);

        for (var i = 0; i < filteredConcertInfo.length; i++) {


          var concertDiv = $('<div></div>');
          concertDiv.addClass('eachConcert');
          // var unionNames = _.union(concertInfo[i].name);
          // console.log(concertInfo[i].name);

          var concertName = filteredConcertInfo[i].name;
          var concertDate = filteredConcertInfo[i].dates.start.localDate;
          console.log(concertDate);
          var dateForConcert = $('<p>').text(concertDate);
          var titleForConcert = $('<p>').text(concertName);
          console.log("Concert Name", concertName);



          $('.concertResults').append(concertDiv);
          var imgDiv = $('<div></div>');
          var concertImage = $('<img>');
          var urlTarget = "";
          var imageLink = $('<a>').attr('href', filteredConcertInfo[i].url);
          imageLink.attr('target', "_blank");


          concertImage.addClass('concertDisplayPosters');
          concertImage.attr('concertId', filteredConcertInfo[i]);
          console.log("ATTRACTIONS", filteredConcertInfo[i]);
          imageLink.html(concertImage);

          imgDiv.append(imageLink);
          concertDiv.append(titleForConcert);
          concertDiv.append(dateForConcert);

          for (var j = 0; j < filteredConcertInfo[i].images.length; j++) {
            var picWidth = filteredConcertInfo[i].images[j].width;
            var picHeight = filteredConcertInfo[i].images[j].height;

            if (picWidth === 205 && picHeight === 115) {
              console.log("concert Images", filteredConcertInfo[i].images[j].url);
              concertImage.attr({ src: filteredConcertInfo[i].images[j].url });
              concertDiv.append(imageLink);
            }
          }

          // concertImage.attr({src: filteredConcertInfo[i].images[j].ratio});
          // console.log('j',j)
          // var concertImage = $(`<div style="height: 200px; width: 175px;"><img src="${filteredConcertInfo[i].images[0].url}" style="width: 100%;"></div>`);

          // }
          $('.concertResults').append(concertDiv);
        }
        // error: function(xhr, status, err) {
        //             // This time, we do not end up here!
        //          }
      }
    })
  }

  //Movies html
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


      $('movieHTML').append(movieDiv);

      var movieImage = $('<img>');

      movieImage.addClass('displayPosters');
      movieImage.attr({ src: "http://image.tmdb.org/t/p/w185/" + movieInfo[i].poster_path });
      movieImage.attr("movieId", movieInfo[i].id);
      console.log("Movie Id" + movieInfo[i].id);

      var moviebutton = $('<input type="button" value="Add to Movie List" />');
      moviebutton.appendTo($(movieDiv));

      movieDiv.append(movieImage);
      movieDiv.append(titleForMovie);
      $('.movieHTML').append(movieDiv);
    }
  })
  //Concert html
  $.ajax({
    type: "GET",
    url: queryURLConcerts,
    async: true,
    dataType: "json",
    success: function (response) {
      console.log(response);
      // Parse the response.

      // Do other things.
      var concertInfo = response._embedded.events;
      console.log("CONCERT", concertInfo);
      var filteredConcertInfo = removeDups(concertInfo);
      console.log("FILTERED INFO", filteredConcertInfo);

      for (var i = 0; i < filteredConcertInfo.length; i++) {


        var concertDiv = $('<div></div>');
        concertDiv.addClass('eachConcert');
        // var unionNames = _.union(concertInfo[i].name);
        // console.log(concertInfo[i].name);

        var concertName = filteredConcertInfo[i].name;
        var concertDate = filteredConcertInfo[i].dates.start.localDate;
        console.log(concertDate);
        var dateForConcert = $('<p>').text(concertDate);
        var titleForConcert = $('<p>').text(concertName);
        console.log("Concert Name", concertName);

        $('.concertHTML').append(concertDiv);
        var imgDiv = $('<div></div>');
        var concertImage = $('<img>');
        var urlTarget = "";
        var imageLink = $('<a>').attr('href', filteredConcertInfo[i].url);
        imageLink.attr('target', "_blank");

        concertImage.addClass('concertDisplayPosters');
        concertImage.attr('concertId', filteredConcertInfo[i]);
        console.log("ATTRACTIONS", filteredConcertInfo[i]);
        imageLink.html(concertImage);

        var concertbutton = $('<input type="button" value="Add to Concert List" />');
        concertbutton.appendTo($(concertDiv));

        imgDiv.append(imageLink);
        concertDiv.append(titleForConcert);
        concertDiv.append(dateForConcert);

        for (var j = 0; j < filteredConcertInfo[i].images.length; j++) {
          var picWidth = filteredConcertInfo[i].images[j].width;
          var picHeight = filteredConcertInfo[i].images[j].height;

          if (picWidth === 205 && picHeight === 115) {
            console.log("concert Images", filteredConcertInfo[i].images[j].url);
            concertImage.attr({ src: filteredConcertInfo[i].images[j].url });
            concertDiv.append(imageLink);
          }
        }

        // concertImage.attr({src: filteredConcertInfo[i].images[j].ratio});
        // console.log('j',j)
        // var concertImage = $(`<div style="height: 200px; width: 175px;"><img src="${filteredConcertInfo[i].images[0].url}" style="width: 100%;"></div>`);

        // }
        $('.concertHTML').append(concertDiv);
      }
      // error: function(xhr, status, err) {
      //             // This time, we do not end up here!
      //          }
    }
  })
})
