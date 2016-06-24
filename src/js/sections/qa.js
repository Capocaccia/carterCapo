//builds qa items
for(var qaItem in qa){
    var obj = qa[qaItem];
    $('<div class="content-item"><div class="content-item--question"></div><div class="content-item--answer"></div></div>').appendTo('.qa');
    $('.content-item--question:last').html(obj.question);
    $('.content-item--answer:last').html(obj.answer);
}

//handles building qa object for singular qa item
var i = 0;
$(document).ready(function(){
    let qaQuestionSubmitError = 'Please fill out the Question field';
    let qaAnswerSubmitError = 'Please fill out the Answer field';
    $('.submitItem').on('click', function(){
        if($(this).siblings('.question').val() !== '' && $(this).siblings('.answer').val() !== ''){
            var questionItem = $(this).siblings('.question').val();
            var answerItem = $(this).siblings('.answer').val();
            buildQaItem(questionItem, answerItem);
        } else if ($(this).siblings('.question').val() == '' && $(this).siblings('.answer').val() == ''){
            $(this).siblings('.answer').attr('placeholder', qaAnswerSubmitError);
            $(this).siblings('.question').attr('placeholder', qaQuestionSubmitError);
        } else if($(this).siblings('.question').val() == '') {
            $(this).siblings('.question').attr('placeholder', qaQuestionSubmitError);
        } else if ($(this).siblings('.answer').val() == ''){
            $(this).siblings('.answer').attr('placeholder', qaAnswerSubmitError);
        }
    });
})


//builds singular qa item
let userQa = {};
function buildQaItem(question, answer){
    let qaItemName = 'item_' + i;
    userQa[qaItemName] = {
        question: question,
        answer: answer
    };
    if(i < 1){
        $('.build_your_own').after('<div class="qa newQa"></div>');
    }
    i++;
    $('<div class="content-item"><div class="content-item--question"></div><div class="content-item--answer"></div></div>').appendTo('.newQa');
    $('.content-item--question:last').append(userQa[qaItemName].question);
    $('.content-item--answer:last').append(userQa[qaItemName].answer);
}

//injects build inputs for QA items and handles animations on page
$('.qa').after('<button class="build_button">Build Your Own!</button><div class="build_your_own"><input class="question" type="text" placeholder="Question"><input class="answer" type="text" placeholder="Answer"><button class="submitItem">Build</button></div>');
$('.build_button').on('click', function(){
    $(this).fadeOut();
    $(this).siblings('.qa').fadeOut(500, function(){
        $(this).parent().children('.build_your_own').fadeIn(800).css('display', 'flex');
    });
});

//binds click on qa content items
$(document).ready(bindEventDelegation);
function bindEventDelegation() {
    $(document).on('click', '.content-item', function() {
        if($(this).children('.content-item--answer').hasClass('open')){
            $(this).children('.content-item--answer').stop().slideUp().removeClass('open');
        } else {
            $(this).children('.content-item--answer').stop().slideDown().addClass('open');
        }
        $(this).children('.content-item--question').toggleClass('js_arrow_rotate');
    });
}