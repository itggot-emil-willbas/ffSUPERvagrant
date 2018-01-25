

$(document).ready(function() {

populate_select();


    $(window).on('resize load', function(e){
    
    $('.savings').css({
        height: $(window).height()
        });
    });

    $(document).on('click', 'nav, #load', function(){
        $('.savings').toggleClass('open');
        });



    function populate_select() {
        
        var val = $("#course_select").val();
        $("#collection_select").empty();
            $.get("/collections/" + val , function(response){
            parsed = JSON.parse(response)
            var i = 0
            while (i < parsed.object_first_key.length) {
                $("#collection_select").append("<option value=" + parsed.object_first_key[i][0] + ">" + parsed.object_first_key[i][1] + "</option>" );
                i++;
            };
        });
    };


    


    $("#course_select").on('change',function() {
        var val = $(this).val();
        $("#collection_select").empty();
        $.get("/collections/" + val , function(response){
            parsed = JSON.parse(response)
            var i = 0
            while (i < parsed.object_first_key.length) {
                $("#collection_select").append("<option value=" + parsed.object_first_key[i][0] + ">" + parsed.object_first_key[i][1] + "</option>" );
                i++;
            };
        });
    });

//Toogle popup(comments)
$(document).on('click', '.buttonmaker, #addPosButton, #addKonstrButton', function(){
	$("#popup").toggleClass('hidden');
	});


//Add green comment/div
    $('#addPosButton').click(function(){
        
		//leta fram rätt text
		var komtext = $('#kommentarsinput').val()+'. ';
		//lägg till den i <output>
		var knappen = $('<div class="divknapp bra"><button class="eraseThis" data-clicked="no"></button><p class="nytext">'+komtext+'</p></div>');
		$('#spaceforbuttons').append(knappen);
	});

//Add red comment/div
    $('#addKonstrButton').click(function(){
		//leta fram rätt text
		var komtext = $('#kommentarsinput').val()+'. ';
		//lägg till den i <output>
		var knappen = $('<div class="divknapp konstr"><button class="eraseThis" data-clicked="no"></button><p class="nytext">'+komtext+'</p></div>');
		$('#spaceforbuttons').append(knappen);
		
	});

//Remove comment/div
    $(document).on('click', '.eraseThis', function(event){ 
             $(this).closest('div').remove();
             $('#op:last-child').remove(); 
    });

//Remove text
$('#eraseButton').click(function() {
    $('#opp').empty();
});

$('#empty').click(function() {	
    $('.divknapp').remove();
});

//JSON test. Tänk på att varna om det redan finns ett collectionname med samma namn

$("#save").click(function(){
    
});

$("#clicker").click(function(){
    $course_select = $('#course_select option:selected').text();
    
    //En "alert" som ger en variabel om det är rätt kurs och vad man vill döpa samlingen till
    

    if(confirm("Är ditt ämne " + $course_select + "? Byt annars till rätt ämne.")){

        $collection_name = prompt("Vad vill du kalla din samling kommentarer");
        $course_id = $('#course_select option:selected').val();
        $comments_array = [];
        //$comment_color_word_array = [];//kommentar + färg. Används kontr/pos som tredje? Nej.
        
        //Stoppa in text + färg i comments array:
        $('.bra > p.nytext').each(function(){
            var i = $(this).text();
            $comment_color_word_array = [];
            $comment_color_word_array.push(i); 
            color = "green";
            $comment_color_word_array.push(color);
            $comments_array.push($comment_color_word_array);
        });
        
        $('.konstr > p.nytext').each(function(){
            var j = $(this).text();
            $comment_color_word_array = [];
            $comment_color_word_array.push(j); 
            color = "red";
            $comment_color_word_array.push(color);
            $comments_array.push($comment_color_word_array);
        });
            
        console.log($comments_array);

        $.post("/hello",
        {
            collection_name : $collection_name,
            course_id : $course_id,
            comments : $comments_array 
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });

        return false;

    } else {
        //Nej kör en route som kollar aktuell course-select!
        
        /*var url = window.location.href; 
        alert(url);
        window.location.href(url);*/
        return false;
    };
});

/* Knappar */
$("#spaceforbuttons").on("click",".divknapp",function(event){
    
    if (!$(event.target).is('.eraseThis')){	
        var flyttext = $(this).text() + " ";
        $('#opp').append(flyttext);
    }
});	

$('#copyButton').click(function(e) {
    console.log(e);
    var hejhej = $('#opp').text();
    window.prompt("Copy to clipboard: Ctrl + C, Enter",hejhej);

});



});
