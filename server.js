var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
    var parsedUrl = url.parse(request.url);

    //The request handler checks the path, and send the data if in the appropriate path
    if(parsedUrl.pathname == '/listings')
    {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(listingData);
    }
    //A 404 error is sent of the path is not correct
    else
    {
      response.writeHead(404, {'Content-Type' : 'text/plain'});
      response.end('Bad gateway error')
    }

};

fs.readFile('listings.json', 'utf8', function(err, data) {

   //Check for errors
    if(err) {
      throw err;
    }

    //Save the data in the listingData variable already defined
    listingData = data;

    //Creates the server
    var server = http.createServer(requestHandler);

    //Start the server
    server.listen(port, function() {
      console.log('Server listening on: localhost:' + port + "/listings");
    });
  

});
