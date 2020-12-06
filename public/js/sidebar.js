console.log(all_Players)
$(document).ready(function(){
    var favorites;
    for (var i = 0; i < all_Teams.length; i++){
        nba_team = all_Teams[i].City+ ' ' + all_Teams[i].Name
        $(".sidenav").append('<div id="'+i+'" class="team"><i class="fas fa fa-chevron-right" aria-hidden="true"></i> \
        <img class="logo" src="'+all_Teams[i].WikipediaLogoUrl+'"><a value=#'+all_Teams[i].PrimaryColor+'>'+nba_team+'</a> \
        <i class="fa fa-star favTeam" aria-hidden="true"></i> <div class="player disable"></div></div>');
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

    for (var i = 0; i < all_Teams.length; i++){
        var string = '<div class="row">'
        for(var k = i; k < i + 6 && k < all_Teams.length;k++){
            string+='<div class="col-sm-2"><div class="card"> <img style="width:100px;height:100px" src="'+all_Teams[k].WikipediaLogoUrl+'"><h6 style="font-size:20px;color:black;">'+all_Teams[k].Name+'</h6></div></div>';
        }
        i=k;
        string += '</div>';
        $("#allTeams").append(string);

    }

    for (var i = 0; i < all_Players.length; i++){
        var string = '<div class="row">'
        for(var k = i; k < i + 6 && k < all_Players.length;k++){
            string+='<div class="col-sm-2"><div class="card"> <img src="'+all_Players[k].PhotoUrl+'"><h6 style="font-size:20px;color:black;">'+all_Players[k].YahooName+'</h6></div></div>';
        }
        i=k;
        string += '</div>';
        $("#allPlayers").append(string);

    }
    favorties ={};
    $(".fa-star").click(function() {
        if(!$(this).hasClass("yellow")){
            $('#favTeams').empty();
            favorties[$(this).parent().find('a').text()] = 1;
            $('#favTeams').append("<h1>"+JSON.stringify(favorties)+"</h1>");
        }
        else{
            favorties[$(this).parent().find('a').text()] = 0;
            $('#favTeams').empty();
            $('#favTeams').append("<h1>"+JSON.stringify(favorties)+"</h1>");

        }
        $(this).toggleClass("yellow")

       
    });
   
    
      
});