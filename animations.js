$('input').keypress(function (e) {
    if (e.which == 13) {
console.log("yeah");
      $('button').click();
      return false;
    }
  });