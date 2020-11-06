    let params = new URLSearchParams(document.location.search.substring(1));
    let token = params.get("access_token");
    console.log(token);

    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/me/top/tracks?time_range=long_term",
        headers: {"Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        },
        success: function(tracks) {
        	let tracklist = getTracks(tracks.items);
        	// console.log(tracklist);
            
            let  mostPopularSong = findMostPopularSong(tracklist);
            
            
            // console.log(mostPopularSong);   
            document.getElementById("mps").innerHTML = mostPopularSong.name; 
            document.getElementById("songPopularity").innerHTML ="Popularity level: " + mostPopularSong.popularity; 
            document.getElementById("calculateAverage").onclick = function(){
                let averagePopularity = findAveragePopularity(tracklist);
                if(averagePopularity>90 && averagePopularity<100){
                document.getElementById("averageResult").innerHTML = "The average popularity of your favourite songs is : " + averagePopularity + " &#128081;&#128081;&#128081;";
                }
                else if(averagePopularity>75 && averagePopularity<=90){
                document.getElementById("averageResult").innerHTML = "The average popularity of your favourite songs is : " + averagePopularity + " &#128293;&#128293;&#128293;";
                }
                else if(averagePopularity>50 && averagePopularity<=75){
                document.getElementById("averageResult").innerHTML = "The average popularity of your favourite songs is : " + averagePopularity + " &#128293;";
                }
                else if(averagePopularity>30 && averagePopularity<=50){
                document.getElementById("averageResult").innerHTML = "The average popularity of your favourite songs is : " + averagePopularity + " &#128533;&#128533;&#128533;";
                }
                else if(averagePopularity<=30){
                document.getElementById("averageResult").innerHTML = "The average popularity of your favourite songs is : " + averagePopularity + " &#128465;&#128465;&#128465;";
                }
            }
            let leastPopularSong = findLeastPopularSong(tracklist);
            document.getElementById("lps").innerHTML = leastPopularSong.name;
            document.getElementById("lpsP").innerHTML ="Popularity level: " + leastPopularSong.popularity;
            let favouriteSong = findFavouriteSong(tracklist); 
            document.getElementById("fsp").innerHTML =favouriteSong.name;
            document.getElementById("favSongPopularity").innerHTML = "Popularity level: " + favouriteSong.popularity;
            

     }});
    
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/me/top/artists?time_range=medium_term",
        headers: {"Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        },
        success: function(artists) {
            let artistslist = getArtists(artists.items);
            
            
            let  mostPopularArtist = findMostPopularArtist(artistslist);
            document.getElementById("mpa").innerHTML = mostPopularArtist.name;
            document.getElementById("artistPopularity").innerHTML ="Popularity level: " +  mostPopularArtist.popularity;



            let mostFollowedArtist =findMostFollowedArtist(artistslist);
            document.getElementById("mfa").innerHTML = mostFollowedArtist.name; 
            document.getElementById("artistFollowers").innerHTML = "Followers: " + mostFollowedArtist.followers;

            let favouriteArtist = findFavouriteArtist(artistslist);
            document.getElementById("fap").innerHTML = favouriteArtist.name;
            document.getElementById("fapF").innerHTML = "Followers: " +  favouriteArtist.followers;
             
        }});

    function getTracks(tracks){
    	let tracklist = new Array(tracks.length);
        for( i =0 ; i<tracks.length;i++){
    	 let id = tracks[i].id;
        let name = tracks[i].name;
        let artists = tracks[i].artists;
        let popularity = tracks[i].popularity;
        let track = new Track(id,name,artists,popularity);
        tracklist[i] = track;
    }
       
          
        return tracklist;
    }

    function findMostPopularSong(tracklist){
        let mostPopularSong = tracklist[0];
        for(let i=1;i<tracklist.length;i++){
            if(tracklist[i].popularity>mostPopularSong.popularity){
                mostPopularSong=tracklist[i];
            }
            
        }
        return mostPopularSong;
    }

    function getArtists(artists){
        let artistslist = new Array(artists.length);
        for( i =0 ; i<artists.length;i++){
         let id = artists[i].id;
        let name = artists[i].name;
        let popularity = artists[i].popularity;
        let followers = artists[i].followers.total;
        let artist = new Artist(id,name,popularity,followers);
        artistslist[i] = artist;
        }
        return artistslist;
    }

    function findMostPopularSong(tracklist){
        let mostPopularSong = tracklist[0];
        for(let i=1;i<tracklist.length;i++){
            if(tracklist[i].popularity>mostPopularSong.popularity){
                mostPopularSong=tracklist[i];
            }
            
        }
        return mostPopularSong;
    }

    function findMostPopularArtist(artistslist){
        let mostPopularArtist = artistslist[0];
        for(let i=1;i<artistslist.length;i++){
            if(artistslist[i].popularity>mostPopularArtist.popularity){
                mostPopularArtist=artistslist[i];
            }
            
        }
        return mostPopularArtist;
    }

    function findMostFollowedArtist(artistslist){
        let mostFollowedArtist = artistslist[0];
        for(let i=1;i<artistslist.length;i++){
            if(artistslist[i].followers>mostFollowedArtist.followers){
                mostFollowedArtist=artistslist[i];
            }
            
        }
        return mostFollowedArtist;
    }

    function findAveragePopularity(tracklist)
    {
        let totalPopularity=0;
        let averagePopularity = 0;
        for(let i=0; i<tracklist.length;i++){
            totalPopularity+=tracklist[i].popularity;
        }
        averagePopularity = Math.floor(totalPopularity/(tracklist.length));
        return averagePopularity;
       
    }
    function findFavouriteSong(tracklist) {
        return tracklist[0];
    }

    function findFavouriteArtist(artistslist){
        return artistslist[0];
    }

    function findLeastPopularSong(tracklist) {
         let leastPopularSong = tracklist[0];
        for(let i=1;i<tracklist.length;i++){
            if(tracklist[i].popularity<leastPopularSong.popularity){
                leastPopularSong=tracklist[i];
            }
            
        }
        return leastPopularSong;
    }


