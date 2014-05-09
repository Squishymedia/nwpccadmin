/* Translation functionality for OB */

$('body').on('click', "a.load", function(event){
  var sid = $(this).attr("data-sid");
  console.log('Loading revisions for set #' + sid);
  
  $.get('/history/' + sid, function(response){
    
    $("#revisions" + sid).html(response);
  
  });
});

$('body').on('click', "a.close", function(event){
  console.log('hi');
  var sid = $(this).attr("data-sid");
  
  var link = $("<a>").attr("class","load").attr("data-sid",""+sid).attr("href","#").html("View history");
  console.log(link);
  $("#revisions" + sid).html(link);
});