var header='<img style="padding:5px;position:absolute;width:60px;height:60px;margin-left:60px"src="nba_loop_logo.png"></img>';
header+='<div class="topnav">';
header+='<a name="index" class="firstNav" href="index.html"> NBA LOOP </a>';
header+='<a name="playerdb" href="playerdb.html">PlayerDB</a>';
header+='<a name="favorites" href="favorites.html">Favorites</a>';
header+='<a name="newsmedia" href="newsmedia.html">News/Media</a>';
header+='<a name="games" href="games.html">Games</a>';
header+='<a name="merchandise" href="merchandise.html">Merchandise</a>';
header+='<a><i class="fa fa-search searchShift" aria-hidden="true"></i></a>';
header+='</div>';
   
function compareStrings(a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

var all_Teams=$.parseJSON($.ajax({
    url:  'https://api.sportsdata.io/v3/nba/scores/json/teams?key=09f51163388c40de839d29de4b280842',
    type: 'GET',
    headers: {  'Access-Control-Allow-Origin': 'https://api.sportsdata.io'},
    dataType: "json",
    async: false
}).responseText);
all_Teams.sort(function(a, b) {
    return compareStrings(a.Key, b.Key);
})

var all_Players=$.parseJSON($.ajax({
    url:  'https://api.sportsdata.io/v3/nba/scores/json/Players?key=09f51163388c40de839d29de4b280842',
    type: 'GET',
    headers: {  'Access-Control-Allow-Origin': 'https://api.sportsdata.io' },
    dataType: "json",
    async: false
}).responseText);

var all_Players_Consolidated = []
for (var key in all_Players){
    all_Players_Consolidated.push({"Name": all_Players[key].FirstName + " " + all_Players[key].LastName, 
                                    "Team": all_Players[key].Team,
                                    "Position": all_Players[key].Position,
                                    "Photo": all_Players[key].PhotoUrl}) 
}

$(document).ready(function(){
    $("#headFrame").append(header);
    

    

    var docurl= document.URL;

    $("#headFrame a").each(function( index ) {

    if(docurl.includes($(this).attr('name'))){
        //console.log($(this).attr('name'));
        $("#headFrame a").removeClass("active");
        $(this).addClass("active");
    }
});

document.getElementById('TeamData').innerHTML='<h1>TeamData</h1>'+all_Teams;
document.getElementById('PlayerData').innerHTML='<h1>PlayerData</h1>'+all_Players;

});
