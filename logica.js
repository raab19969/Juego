// 1

var questions = [
  [
    "¿Que se utiliza para estilizar un sitio web?",
    "Javascript",
    "CSS",
    "PHP",
    "AngularJS",
    1
  ],
  [
    "¿Qué tipo de lenguaje es PHP?",
    "Interpretado",
    "Compilado",
    "Los 2 anteriores",
    "Ninguno de los anteriores",
    0
  ],
  [
    "¿jQuery es una biblioteca para qué lenguaje?",
    "Python",
    "PHP",
    "Java",
    "Ninguno de los anteriores",
    3
  ],
  [
    "¿Cómo se marca el inicio de código PHP?",
    "&lt;?php",
    "&lt;?",
    "Los 2 anteriores",
    "Ninguno de los anteriores",
    2
  ],
  [
    "¿Quién diseño Javascript?",
    "Mark Zuckerberg",
    "Bill Gates",
    "Brendan Eich",
    "Rasmus Lerdorf",
    2
  ],
    [
    "¿Un hipervínculo es?",
    "Otra página para encontrar información",
    "Otro nombre para el URL",
    "Un punto de navegación para ir a otra página",
    "Una propaganda",
    2
  ],
  [
    "¿Que son los elementos de entrada a un computador?",
    "Son programas en espera al ser ejecutados",
    "Son los que permiten dar entrada al cpu",
    "Son los que te permiten abrir internet",
    "Google, Yahoo, Gmail",
    1
  ],
  [
    "Los archivos Power Point tienen la extensión",
    "ppt",
    "doc",
    "xls",
    "jgp",
    0
  ],
  [
    "¿Cual de las siguientes opciones es una rama de la informática?",
    "Ing civil",
    "Aereonautica",
    "Diseño grafico",
    "Ofimatica",
    3
  ],

];
// 2
var questionTemplate = _.template(" \
<div class='card question'><span class='question'><%= question %></span> \
<ul class='options'> \
<li> \
<input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
<label for='q<%= index %>o1'><%= a %></label> \
</li> \
<li> \
<input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
<label for='q<%= index %>o2'><%= b %></label> \
</li> \
<li> \
<input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
<label for='q<%= index %>o3'><%= c %></label> \
</li> \
<li> \
<input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
<label for='q<%= index %>o4'><%= d %></label> \
</li> \
</ul> \
</div> \
");

// 3
var points,
  pointsPerQuestion,
  currentQuestion,
  questionTimer,
  timeForQuestion = 10, // seconds
  timeLeftForQuestion;
// 4
$(function() {
  // 5
  $('button.start').click(start);
  $('.play_again button').click(restart);

  // 6
  function restart() {
    points = 0;
    pointsPerQuestion = 10;
    currentQuestion = 0;
    timeLeftForQuestion = timeForQuestion;
    // 7
    $('.finish.card').hide();
    $('div.start').show();
    $('.times_up').hide();

    generateCards();
    updateTime();
    updatePoints();
  }

  // 8
  function start() {
    $('div.start').fadeOut(200, function() {
      moveToNextQuestion();
    });
  }

  // 9
  function generateCards() {
    $('.questions').html('');
    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      var html = questionTemplate({
        question: q[0],
        index: i,
        a: q[1],
        b: q[2],
        c: q[3],
        d: q[4],
        e: q[5],
        f: q[6],  
        g: q[7],
        h: q[8]
      });
      $('.questions').append(html);
    };

    // 10
    $('.question.card input').change(optionSelected);
  }

  // 11
  function moveToNextQuestion() {
    currentQuestion += 1;
    if (currentQuestion > 1) {
      $('.question.card:nth-child(' + (currentQuestion - 1) + ')').hide();
    }

    // 12
    showQuestionCardAtIndex(currentQuestion);
    setupQuestionTimer();
  }

  // 13
  function setupQuestionTimer() {
    if (currentQuestion > 1) {
      clearTimeout(questionTimer);
    }
    timeLeftForQuestion = timeForQuestion;
    // 14
    questionTimer = setTimeout(countdownTick, 1000);
  }

  // 15
  function showQuestionCardAtIndex(index) { // staring at 1
    var $card = $('.question.card:nth-child(' + index + ')').show();
  }

  // 16
  function countdownTick() {
    timeLeftForQuestion -= 1;
    updateTime();
    if (timeLeftForQuestion == 0) {
      return finish();
    }
    questionTimer = setTimeout(countdownTick, 1000);
  }

  // 17
  function updateTime() {
    $('.countdown .time_left').html(timeLeftForQuestion + 's');
  }

  // 18
  function updatePoints() {
    $('.points span.points').html(points + ' puntos');
  }

  // 19
  function optionSelected() {
    var selected = parseInt(this.value);
    var correct = questions[currentQuestion - 1][5];

    if (selected == correct) {
      points += pointsPerQuestion;
      updatePoints();
      correctAnimation();
    } else {
      wrongAnimation();
    }

    if (currentQuestion == questions.length) {
      clearTimeout(questionTimer);
      return finish();
    }
    moveToNextQuestion();
  }

  // 20
  function correctAnimation() {
    animatePoints('right');
  }

  // 21
  function wrongAnimation() {
    animatePoints('wrong');
  }

  // 22
  function animatePoints(cls) {
    $('header .points').addClass('animate ' + cls);
    setTimeout(function() {
      $('header .points').removeClass('animate ' + cls);
    }, 500);
  }
  // 23
  function finish() {
    if (timeLeftForQuestion == 0) {
      $('.times_up').show();
    }
    $('p.final_points').html(points + ' puntos');
    $('.question.card:visible').hide();
    $('.finish.card').show();
  }

  // 24
  restart();
});