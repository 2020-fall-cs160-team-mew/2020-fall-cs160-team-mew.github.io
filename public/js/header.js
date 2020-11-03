
var header='<img style="padding:5px;position:absolute;width:60px;height:60px;margin-left:60px"src="/images/nba_loop_logo.png"></img>';
header+='<div class="topnav">';
header+='<a name="index" class="firstNav" href="index.html"> NBA LOOP </a>';
header+='<a name="playerdb" href="/playerdb.html">PlayerDB</a>';
header+='<a name="favorites" href="favorites.html">Favorites</a>';
header+='<a name="newsmedia" href="/newsmedia.html">News/Media</a>';
header+='<a name="games" href="/games.html">Games</a>';
//header+='<a name="merchandise" href="/merchandise.html">Merchandise</a>';
header+='<a><i class="fa fa-search " aria-hidden="true"></i></a>';
header+='<div class="divider"><button class = "buttonHead"><a id="signup" >Sign Up</a></button>';
header+='<button class ="buttonHead"><a id="login" >Log In</a></button>';
header+='</div></div>';


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
var images=all_Teams;
var nextimage=0;
doSlideshow();

function doSlideshow(){
    if(nextimage>=images.length){
        nextimage=0;
    }
    $('#home').css('background-image','url("'+images[nextimage++].WikipediaLogoUrl+'")').fadeIn(10,function(){
        setTimeout(doSlideshow,3000);
    });
}

$("#signup").click(function() {
    $("#signupModal").css("display","block");

});
$("#login").click(function() {
    $("#loginModal").css("display","block");

});
$(".close").click(function() {
    $("#loginModal").css("display","none");
    $("#signupModal").css("display","none");


});




  $("#formsignup").click(function(event) {
    var em = $("#emailsign").val();
    var pass = $("#passwordsign").val();

      $.ajax({
        type:"get",
        url:"http://localhost:3000/createinstance/",
        data:{email: em, password:pass,favorites:'{}' },
        success: function(msg){
            console.log("success");
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
          }
     });
     $("#signupModal").css("display","none");


});

$("#formlogin").click(function(event) {
    event.preventDefault();
    var em = $("#emaillog").val();
    var pass = $("#passwordlog").val();
    console.log(em);
    console.log(pass);
    function getUserPromise(){
        return new Promise(function (resolve, reject) {
            $.ajax({
                type:"get",
                url:"http://localhost:3000/getuserinstance",
                data:{email: em, password:pass },
                contentType:"application/json",
                success: function(msg){
                    resolve(msg);
                    return msg;
                },
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err);
                  }        
             },20);
            
        });
    }
    async function getResult(){
        let result = await getUserPromise();
        return result
      }
      async function doTask(){
        let data = await getResult();
        console.log(data)
      }
      doTask();


});


});




