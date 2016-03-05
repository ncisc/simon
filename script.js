$('document').ready(function(){
  // declare var
  var colors = ['green', 'red', 'yellow', 'blue'];
  var colorAudio = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3']
  var strict = false;
  var sequence = [];
  var userSequence = [];
  // keeps the button pressed by user
  var pressed;
  // keeps the sequence position for looping
  var count = 0;

  function playSequence(){
    // loop array
    if (count < sequence.length) {
      new Audio(colorAudio[colors.indexOf(sequence[count])]).play();
      $('#' + sequence[count]).fadeTo('fast', 0.7).delay(1000).fadeTo('fast', 1);
      count += 1;
      setTimeout(function(){playSequence()}, 2000);
    } else {
      count = 0;

      // duplicate sequence
      userSequence = sequence.slice(0);

      // enable buttons
      $('#green').removeAttr('disabled');
      $('#red').removeAttr('disabled');
      $('#yellow').removeAttr('disabled');
      $('#blue').removeAttr('disabled');
    }
  }

  // adding colors
  function addColor (){
    $('#green').attr('disabled','disabled');
    $('#red').attr('disabled','disabled');
    $('#yellow').attr('disabled','disabled');
    $('#blue').attr('disabled','disabled');

    sequence.push(colors[Math.floor((Math.random() * colors.length) + 1) - 1]);

    // call play sequence, setTimeout is used to slow the sequence when played
    setTimeout(function(){
      // update count
      $('#screen').text(parseInt($('#screen').text()) + 1);
      playSequence()
    }, 2000);
  }

  // user error function
  function wrongColor(){
    // disable buttons
    $('#green').attr('disabled','disabled');
    $('#red').attr('disabled','disabled');
    $('#yellow').attr('disabled','disabled');
    $('#blue').attr('disabled','disabled');

    if (strict) {
      // add wrong signal
      $('#screen').text('!!');
      setTimeout(function(){
        sequence = [];
        $('#screen').text('0');
        addColor();
      }, 2000);
    } else {
      // add wrong signal
      $('#screen').text('!!');
      setTimeout(function(){
        $('#screen').text(sequence.length);
        playSequence()
      }, 2000);
    }
  }

  // pushed button function
  function checkColor(){
    if (pressed === userSequence[0]) {
      userSequence.shift();
      if (userSequence.length < 1) {
        if (sequence.length == 20) {
          $('#screen').text('WP');
          setTimeout(function(){
            sequence = [];
            $('#screen').text('0');
            addColor();
          }, 2000);
        } else {
          addColor();
        }
      }
    } else {
      wrongColor();
    }
  }

  function colorPressed(){
    new Audio(colorAudio[colors.indexOf(pressed)]).play();
    $('#' + pressed).fadeTo('fast', 0.7).delay(300).fadeTo('fast', 1);
    // call checkColor
    checkColor();
  };

  // colors buttons
  $('#green').on('click', function(){
    pressed = 'green';
    colorPressed();

  });
  $('#red').on('click', function(){
    pressed = 'red';
    colorPressed();
  });
  $('#yellow').on('click', function(){
    pressed = 'yellow';
    colorPressed();
  });
  $('#blue').on('click', function(){
    pressed = 'blue';
    colorPressed();
  });

  // start button
  $('#start button').on('click', function(){
    // reset sequence
    sequence = [];
    $('#screen').text('0');

    // call addColor
    addColor();
  });

  // strict button
  $('#strict button').on('click', function(){
    if (strict) {
      strict = false;
      $(this).css('background-color', 'white');
      $(this).css('color', 'inherit');
    } else {
      strict = true;
      $(this).css('background-color', 'tomato');
      $(this).css('color', 'snow');
    }
  });

  // on button
  $('#on').on('click', function(){
    // active or inactive buttons
    $(this).attr('disabled', 'disabled');
    $('#off').removeAttr('disabled');
    $('#start button').removeAttr('disabled');
    $('#strict button').removeAttr('disabled');

    // active screen
    $('#screen').text('--');

  });

  // off button
  $('#off').on('click', function(){
    $(this).attr('disabled', 'disabled');
    $('#on').removeAttr('disabled');
    $('#start button').attr('disabled', 'disabled');

    strict = false;
    $('#strict button').css('background-color', 'white');
    $('#strict button').css('color', 'inherit');
    $('#strict button').attr('disabled', 'disabled');

    $('#screen').text('');

    // empty sequence
    sequence = [];

  });

});
