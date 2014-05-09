var home = require('../app/controllers/home'),
    ajax = require('../app/controllers/ajax');
    
module.exports = function (app) {
 
  // Home page - list of sets
  app.get('/', home.show);
  
  // Wiring for list of revisions AJAX
  app.get('/history/:sid', ajax.history);

  
  // Wiring for approve as canonical
  app.get('/sets/:sid/approve', home.approve);
  
  // Wiring for XLS post
  //app.post('/', home.send);
};