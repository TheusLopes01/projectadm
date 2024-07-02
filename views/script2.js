$(document).ready(function() {
    $('#inputUser').mask('AA00000000000AA', {
      translation: {
        'A': { pattern: /[A-Za-z]/ },
        '0': { pattern: /[0-9]/ }
      }
    });  
  });