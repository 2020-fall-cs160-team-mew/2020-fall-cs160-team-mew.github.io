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



$(document).ready(function(){
    var all_Teams=$.parseJSON($.ajax({
        url:  'https://api.sportsdata.io/v3/nba/scores/json/teams?key=f42659ac160444bf8017635bc7a299c5',
        type: 'GET',
        headers: {  'Access-Control-Allow-Origin': 'https://api.sportsdata.io'},
        dataType: "json",
        async: false
    }).responseText);
    $("#headFrame").append(header);
    for (var i = 0; i < all_Teams.length; i++){
        $(".sidenav").append('<i class="fa fa-chevron-right" aria-hidden="true"></i><div class="team"><img class="logo" src="'+all_Teams[i].WikipediaLogoUrl+'"> <a value=#'+all_Teams[i].PrimaryColor+'>'+all_Teams[i].City+ ' ' + all_Teams[i].Name+'</a>');
    }
    $( ".team a" ).each(function(index) {
        $(this).hover(function() {
            console.log($(this.attributes))
            $(this).css("color",$(this.attributes)[0].value);
        },function(){
            $(this).css("color","black");
        });
    });
    var docurl= document.URL;

    $("#headFrame a").each(function( index ) {

    if(docurl.includes($(this).attr('name'))){
        //console.log($(this).attr('name'));
        $("#headFrame a").removeClass("active");
        $(this).addClass("active");
    }
});

var all_Players=$.parseJSON($.ajax({
    url:  'https://api.sportsdata.io/v3/nba/scores/json/Players?key=f42659ac160444bf8017635bc7a299c5',
    type: 'GET',
    headers: {  'Access-Control-Allow-Origin': 'https://api.sportsdata.io' },
    dataType: "json",
    async: false
}).responseText);
    
console.log(all_Teams);
console.log(all_Players);

var all_Players_Consolidated = []
for (var key in all_Players){
    all_Players_Consolidated.push({"Name": all_Players[key].FirstName + " " + all_Players[key].LastName, 
                                    "Team": all_Players[key].Team,
                                    "Position": all_Players[key].Position}) 
}

console.log(all_Players_Consolidated)

document.getElementById('TeamData').innerHTML='<h1>TeamData</h1>'+all_Teams;
document.getElementById('PlayerData').innerHTML='<h1>PlayerData</h1>'+all_Players;

});
