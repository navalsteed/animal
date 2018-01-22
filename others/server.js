var http =require('http');
var fs =require ('fs');
//var a=require('myanimal.js');


function onRequest(request,response) {
    response.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile('./index.html',null,function(error,data) {
        if(error){
            response.writeHead(404);
            response.write("File not found!");
            }else{
                response.write(data);
            }
            response.end();
    })
    
}

http.createServer(onRequest).listen(8000);