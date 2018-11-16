var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
var sentenceCount = 0;
var keyPress = 0;
var numberOfWords = 54;
var numberOfMistakes = 0;
var startTime = new Date();

$('#keyboard-upper-container').hide();
$('#sentence').append(sentences[0]);

$('body').keypress(function (e) {
    if (e.keyCode == 16) {
        $('#keyboard-lower-container').hide();
        $('#keyboard-upper-container').show();
    };

    $(this).keyup(function (e) {
        if (e.keyCode == 16) {
            $('#keyboard-lower-container').show();
            $('#keyboard-upper-container').hide();
        }
    });
});

$('body').keypress(function (e) {
    $('span.glyphicon.glyphicon-ok').remove();
    $('span.glyphicon.glyphicon-remove').remove();

    if (sentenceCount == 4 && keyPress == 48) {
        let endTime = new Date();
        let minutes = endTime.getMinutes() - startTime.getMinutes();
        let score = numberOfWords / minutes - 2 * numberOfMistakes

        $('#keyboard-lower-container').remove();
        $('keyboard-upper-container').remove();
        $('#32').remove();
        $('#stop-go').remove();
        $('#sentence').remove();
        $('#yellow-block').remove();
        $('.keys-row').append('<span class="glyphicon glyphicon-ok"></span>');
        $('.keys-row').append('<span class="glyphicon glyphicon-remove"></span>');
        $('.glyphicon-remove').css('padding-left', '250px');
        
        $('.glyphicon-ok').click(function () {
            console.log(document.location.href = '');
        });

        $('.glyphicon-remove').click(function () {
            close();
        });

        return $('#target-letter').text("Your score is " + score + " words per minute! Would you like to try again?");
    }

    else if (String.fromCharCode(e.which) == sentences[sentenceCount][keyPress]) {
        $('#target-letter').text(sentences[sentenceCount][keyPress]);
        $('#yellow-block').animate({ left: "+=17.5px" }, .1);
        $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
        $('.glyphicon-ok').animate({ fontSize: "2em" });
        keyPress++;
        console.log(keyPress);
    } 
    
    else {
        $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
        $('.glyphicon-remove').animate({ fontSize: "2em" });
        numberOfMistakes++;
    }

    $('#' + e.which).animate({
        padding: '40px',
        borderRadius: '8px',
        backgroundColor: '#e3e3e3'
    }, 50, function () {
        $(this).animate({
            padding: '24px',
            borderRadius: '6px',
            backgroundColor: '#f5f5f5'
        }, 50);//animates the correct key on screen
    });

    if (sentences[sentenceCount][keyPress] == [0][47] || [1][46] || [2][47] || [3][47]) {
        sentenceCount++;
        keyPress = 0;

        $('#target-letter').text(sentences[sentenceCount][keyPress]);
        $('#stop-go').attr('src', '');
        $('#yellow-block').animate({ left: '15px' }, .1);//resets `#yellow-block` position
        $('#sentence').text(sentences[sentenceCount]);
    }
});






