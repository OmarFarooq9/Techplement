
$(document).ready(function(){
    $('#change').click(function(){
        $(this).html('Loading...');
        random();
    });

    $(document).on('click','#search',function(){
      $(this).html('wait..');
     console.log("submit is clicked");
     let author = $("#search_author").val();
    //  complete the author name
    $.ajax({
     url:"https://api.quotable.io/search/authors?query="+author,
     type: 'get',
     success: function(data){
        console.log(data);
       let random = Math.floor(Math.random() * data.totalCount);
       let author_name = data.results[random].name
       console.log(author_name);
       $.ajax({
         //  GET /quotes?author=albert-einstein
        type:'get',
        url:'https://api.quotable.io/quotes?author='+author_name,
        success: function(res1){
            console.log(res1);
            let random_quotes = Math.floor(Math.random() * res1.totalCount);
            console.log(res1.results[random_quotes].content);
            $('#quote-body').html(res1.results[random_quotes].content);
            $('#author').html(res1.results[random_quotes].author);
            $('#search').html('search');
        },
        error: function(){
            alert("check Spelling");
            $('#change').html('Try Again');
        }
       });
    
       },
       error: function(){
        $('#change').html('Try Again');
        alert("check Spelling");
       },
     });
 
    
    });
    
});
function random(){
    $.ajax({
     url:"https://api.quotable.io/quotes/random",
     type: 'get',
     success: function(data){
        console.log(data);
       $('#quote-body').html(data[0].content);
       $('#author').html(data[0].author);
       $('#change').html('Change Quotes');
       },
       error: function(){
        $('#change').html('Try Again');
        alert('Connect the Internet:This application only worked on internet');
       },
     });
}
function randomAuthor(){
   var m= $('#search_author').val();
   $('#random_author').attr('display','none');
} 