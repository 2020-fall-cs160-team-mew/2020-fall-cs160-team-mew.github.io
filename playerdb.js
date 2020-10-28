console.log(all_Teams)

var blank_star = "./images/blank_star.png";
var gold_star = "./images/gold_star.png";
$(document).ready(function(){
    for (var i = 0; i < all_Teams.length; i++){
        nba_team = all_Teams[i].City+ ' ' + all_Teams[i].Name
        $(".set-favorite").append('<div id="'+i+'" class="favorite-team"><img class="team-star" src="'+blank_star+'"> \
        <img class="favorite-logo" src="'+all_Teams[i].WikipediaLogoUrl+'"><a value=#'+all_Teams[i].PrimaryColor+'>'+nba_team+'</a> \
        <i class="fa fa-chevron-down" aria-hidden="true"></i>\
        <div class="favorite-player disable"></div></div>');
        var key = all_Teams[i].Key;
        for (var player in all_Players_Consolidated){
            if(all_Players_Consolidated[player].Team === key){
                var player_name = all_Players_Consolidated[player].Name
                $("#"+i).find(".favorite-player").append('<div class="single-player"><img class="player-star" src="'+blank_star+'"> \
                <img class="player-picture" src="'+all_Players_Consolidated[player].Photo+'"><p class="favorite-playerName">'+player_name+'</p><br></div>');
            }
        }
        $("#"+i).on("click", function() {
            $(this).find(".favorite-player").toggleClass("disable")
            $(this).find(".fa").toggleClass("active")
        });
    }

    $( ".favorite-team a" ).each(function(index) {
        $(this).hover(function() {
            $(this).css("color",$(this.attributes)[0].value);
        },function(){
            $(this).css("color","black");
        });
    });
});