$(document).ready(function () {
  // console.log('myScript.js loaded!');
  $('#red-sentence').click(function () {
    // First remove the purple-text class in case it was added first.
    $(this).removeClass('purple-text');
    // Then add the red-text class to turn the sentence red.
    $(this).addClass('red-text');
  });

  $('#blue-button').click(function () {
    // We can also "chain" methods together like this:
    $('#blue-sentence')
      .removeClass('purple-text')
      .addClass('blue-text');
  });

  $('#purple-button').click(function () {
    $('.colorful-sentence').addClass('purple-text');
  });

  $('h1').hover(function () {
    $(this).css('color', '#ff0000');
  }, function () {
    $(this).css('color', '#000000');
  });

  $('#change-size').click(function () {
    $('#input-text').css('display', 'inline');
    $('#input-button').css('display', 'inline');
    $(this).text('Change my size');
  });

  $('#input-button').click(function () {
    const inputTextStr = $('#input-text').val();
    if (!inputTextStr.match(/^[0-9]*$/)) {
      $('#input-text').css('background-color', '#ffee00');
      alert('pls insert number');
    } else {
      const inputTextNum = parseInt(inputTextStr);
      $('#change-size').css('font-size', inputTextNum);
    }

  });
});