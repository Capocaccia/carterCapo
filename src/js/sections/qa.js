//builds qa items
for(var qaItem in qa){
    var obj = qa[qaItem];
    $('<div class="content-item"><div class="content-item--question"></div><div class="content-item--answer"></div></div>').appendTo('.qa');
    $('.content-item--question:last').html(obj.question);
    $('.content-item--answer:last').html(obj.answer);
}

//handles building qa object for singular qa item
var i = 0;
$('.build_your_own').children('button').on('click', function(){
    if($(this).siblings('.question').val() !== '' && $(this).siblings('.answer').val() !== ''){
        var questionItem = $(this).siblings('.question').val();
        var answerItem = $(this).siblings('.answer').val();
        buildQaItem(questionItem, answerItem);
    } else {
        alert('Please fill out all available fields.');
    }
});

//builds singular qa item
//todo: need to fine tune building of new questions and styling
let userQa = {};
function buildQaItem(question, answer){
    let qaItemName = 'item_' + i;
    userQa[qaItemName] = {
        question: question,
        answer: answer
    };
    i++;
    $('.build_your_own').after('<div class="content-item"><div class="qa"><div class="content-item--question"></div><div class="content-item--answer"></div></div></div>');
    $('.content-item--question').html(userQa[qaItemName].question);
    $('.content-item--answer').html(userQa[qaItemName].answer);
}

//injects build inputs for QA items and handles animations on page
$('.qa').after('<button class="build_button">Build Your Own!</button><div class="build_your_own"><input class="question" type="text" placeholder="Question"><input class="answer" type="text" placeholder="Answer"><button class="submitItem">Build</button></div>');
$('.build_button').on('click', function(){
    $(this).fadeOut();

    $(this).siblings('.qa').fadeOut(600, function(){
        $(this).siblings('.build_your_own').fadeIn(500).css('display', 'flex');
    });
});

//handles animations of qa items
$('.content-item').on('click', function(){
    $(this).children('.content-item--answer').slideToggle();
    $(this).children('.content-item--question').toggleClass('js_arrow_rotate');
});
