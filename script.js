$(document).ready(function () {
    $("#choose-button").on("click", function () {
        event.preventDefault()
        getVideo();
        getExcercisecategories();
        var workoutWindow = $("#workoutChooser");
        workoutWindow.addClass("hide");
        

    })

    function getVideo() {
        var youtubeForm = ""
        $.ajax({
            type: "GET",
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=music%20" + youtubeForm + "&key=AIzaSyAJ1ag4z7gAcPM3dQ14tX7COYqKiYeK6B4",
            dataType: "json",
            success: function (response) {

                var videoId = response.etag;
                var youtubeForm = $("#musicForm").val();
                var youtubeEmbed = ("https://www.youtube.com/embed/" + videoID + "?autoplay=1")
                $("#youtube").attr("src", youtubeEmbed);


            }
        }
        )
    }

    //Categories are "arms", "legs", "abs", "chest", "back", "shoulders", "calves".
    function getExcercisecategories() {

        $.ajax({
            type: "Get",
            url: "https://wger.de/api/v2/exercisecategory/?format=json",
            dataType: "json",
            headers: {
                Authorization: "Token 16a85a599865174319c1a5f12bced324e58d7507"
            },
            success: function (response) {
                console.log(response)
                var results = response.results;
                for (var i = 0; i < results.length; i++) {
                    //displays results by "id"
                    getExercises(results[i].id);
                    //console.log(results[i]);
                }
            }
        })
    }
    //function will display filtered results based on the intial getExercise category function.
    function getExercisesuccess(response, filteredresults) {
        var results = response.results;

        for (var i = 0; i < results.length; i++) {
            //filtering results by if exercise has "name" only.  Also filtering results that do not contain license author=test.
            if (results[i].name && results[i].license_author !== "admintest123") {
                filteredresults.push(results[i])
            }
            //console.log(results[i]);
        }
        //console.log(filteredresults);
        //Loop will go through results again and filter out the next 20 exercises with "names".  Not all exercises in the api are named properly.
        if (filteredresults.length === 0) {
            $.ajax({
                type: "Get",
                url: response.next,
                dataType: "json",
                headers: {
                    Authorization: "Token 16a85a599865174319c1a5f12bced324e58d7507"
                },
                //recursive function, will keep calling until filter results.length is > 0. Instead of stoping at the alloted "20" results.
                success: function (results) {
                    getExercisesuccess(results, filteredresults)

                }
            })
        }

    }
    //exercises on api are listed by id.
    function getExercises(id) {
        var filteredresults = [];
        $.ajax({
            type: "Get",
            //filter by language by adding language query to url. English is (2) in url link.
            //category includes description.
            url: "https://wger.de/api/v2/exercise/?format=json&language=2&category=" + id,
            dataType: "json",
            headers: {
                Authorization: "Token 16a85a599865174319c1a5f12bced324e58d7507"
            },
            success: function (resultscategory) {
                getExercisesuccess(resultscategory, filteredresults)
                $.ajax({
                    type: "Get",
                    url: "https://wger.de/api/v2/exerciseimage/" + id + "/thumbnails/?language=2",
                    dataType: "json",
                    headers: {
                        Authorization: "Token 16a85a599865174319c1a5f12bced324e58d7507"
                    },
                    success: function (resultsimgs) {
                        console.log("exercisenumber" + id)
                        console.log(resultscategory)
                        console.log(resultsimgs)
                    
                        

                    }

                })
            }


        })

    }



})
        //console.log(filteredresults)