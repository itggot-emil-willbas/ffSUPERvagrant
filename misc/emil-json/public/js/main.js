$(document).ready(function(){
    $('#fetch-btn').click(function(){
        $.get('/givemedata', function(response){
            $('#content').html(response);
            parsed = JSON.parse(response);
            console.log(parsed);
        })
    })
})