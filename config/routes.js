var home = require('../app/controllers/home'),
    ajax = require('../app/controllers/ajax');
    
module.exports = function (app) {
 
  // Home page - list of sets
  app.get('/', home.show);
  
  // Wiring for list of revisions AJAX
  app.get('/history/:sid', ajax.history);

  // Wiring to show post form
  app.get('/postnew/:sid', ajax.postnew);
  
  // Wiring for approve as canonical
  app.get('/sets/:sid/:vid/approve', ajax.approve);
  
};