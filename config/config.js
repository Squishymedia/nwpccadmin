
module.exports = {
    
  // App configuration
  debug: true,
  
  // Port for the app server
  runPort: 3000,
  dataService: 'http://npc.sqm.io',
  dataTail: '?format=json',
  
  // Handlebars URLification Regex
  protocol: /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
  scheme: /(^|[^\/])(www\.[\S]+(\b|$))/gim,

  redis: {
    should_use: false,
    host: 'localhost',
    port: 6379,
    db: 2,
    pass: undefined
  }
};
