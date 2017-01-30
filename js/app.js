$( document ).ready(function() {
  // Handler for .ready() called.

  $(document).foundation();

  var playerHP = 1000;
  var enemyHP = 100;
  var messageBox = $("textarea#messagebox");
  // messageBox.html(playerHP);
  
  function updateMessage(arg) {
  	messageBox.html(arg);
  }

  updateMessage("test");

});