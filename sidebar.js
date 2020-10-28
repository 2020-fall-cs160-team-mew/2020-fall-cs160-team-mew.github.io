console.log(all_Players)
$(document).ready(function(){
    for (var i = 0; i < all_Teams.length; i++){
        nba_team = all_Teams[i].City+ ' ' + all_Teams[i].Name
        $(".sidenav").append('<div id="'+i+'" class="team"><i class="fa fa-chevron-right" aria-hidden="true"></i> \
        <img class="logo" src="'+all_Teams[i].WikipediaLogoUrl+'"><a value=#'+all_Teams[i].PrimaryColor+'>'+nba_team+'</a> \
        <div class="player disable"></div></div>');
        for (var player in all_Players_Consolidated){
            if(all_Players_Consolidated[player].Team === all_Teams[i].Key){
                var player_name = all_Players_Consolidated[player].Name
                $("#"+i).find(".player").append('<span class="playerName">'+player_name+'<span>');
            }
        }
        $("#"+i).on("click", function() {
            $(this).find(".player").toggleClass("disable")
            $(this).find(".fa").toggleClass("active")
        });
    }
    $( ".team a" ).each(function(index) {
        $(this).hover(function() {
            $(this).css("color",$(this.attributes)[0].value);
        },function(){
            $(this).css("color","black");
        });
    });
});