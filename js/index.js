

$(document).ready(function () {
    $('#btn-shuffle').click(function(){
        GetPlaylistSongs($('#playlist').val());
       // Shuffle();
    });
});

function GetPlaylistSongs(playlistId){
    var token = $('#token').val();
    return $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/playlists/"+playlistId+"/tracks?fields=items(track.uri)",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token   
        },
        success: function (logs) {
            console.log('GetPlaylistSongs success')

            Shuffle(logs.items);
           
        },
        error: function (jqXHR, textStatus, ex) {
            console.log('error');
        }
    });
}
function Shuffle(items){


    var reorderedItems = [];
    var qtyElements = items.length;
    var freeValues = [];
    var aux;

    for (var i = 0; i < qtyElements; i++) {
        freeValues.push(i);
    }
    for (var i = 0; i < qtyElements; i++) {
        randomIndex = Math.floor(Math.random() * freeValues.length);
        aux = freeValues[randomIndex];
        freeValues.splice(randomIndex, 1);
        reorderedItems.push(items[aux]);
    }
    console.log(items);
    console.log(reorderedItems);

    var token = $('#token2').val();


    var data = {
        "range_start": 0,
        "insert_before": 0,
        "range_length": qtyElements
      }

      var uris ='';

      reorderedItems.forEach(function(item){  

        uris += item.track.uri.replaceAll(':','%3A') + '%2C';
      });

      uris =uris.substring(0, uris.length - 3);
      console.log(uris)
      url = 'https://api.spotify.com/v1/playlists/'+$('#playlist').val()+'/tracks?uris='+uris;
      console.log(url) 
      console.log(data)
      $.ajax({
          type: "PUT",
          url: url,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: JSON.stringify(data),
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization":"Bearer " + token
          },
          success: function (logs) {
              console.log('success')
              console.log(logs);


          },
          error: function (jqXHR, textStatus, ex) {
              console.log('error');
          }
      });
}
function Authorize(){
    scope = 'playlist-modify-public';
    window.location.href="https://accounts.spotify.com/authorize?response_type=code&client_id=3208d40130004901867b1e8c9f4bb5de&scope="+scope+"&redirect_uri=http://127.0.0.1:5500/index.html&state="+ generateRandomString()
}


function generateRandomString(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 16; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}