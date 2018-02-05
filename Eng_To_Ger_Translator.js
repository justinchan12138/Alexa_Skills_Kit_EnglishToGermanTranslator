'use strict';
var http = require('http');

exports.handler = function(event,context) {

    try {
    var request = event.request;
  
    /* 3 types of requests
    i)   LaunchRequest       Ex: "Open greeter"
    ii)  IntentRequest       Ex: "Say hello to John" or "ask greeter to say hello to John"
    iii) SessionEndedRequest Ex: "exit" or error or timeout */
    
    if (request.type === "LaunchRequest") {
        let options = {};
        options.speechText = "Welcome. I am your personal German translator. How may I help you.";
        options.endSession = false;
        context.succeed(buildResponse(options));
    }
        
    else if (request.type === "IntentRequest" ) {
        let options = {};
       

        if (request.intent.name === "TranslateIntent") {
        let sentence = request.intent.slots.sentence.value;

        var url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyDOceu-kUF26jegEkL9EzwkyaBIFofj2MY&target=de" + "&q=" + sentence;
        var translation = "";
            
        http.get(url, function(res){
        var body = "";
        
        res.on('data', function(chunk){
            body += chunk;
            
        });
        
        res.on('end', function(){
            var tempJson = JSON.parse(body);
            translation = tempJson.data.translations[0].translatedText;
        });
    
        });
      
        options.cardTitle = "Translation of:" + ;
        options.cardContent = translation;
        options.speechText = "The translation has been sent to your alexa app on your phone";
        options.endSession = true;
        context.succeed(buildResponse(options));
        }
        
        else {
            throw"unknown intent";
        }
        
    }
    else if (request.type === "SessionEndedRequest"){
        
    }
    else {
        throw"Unknown intent type";
    }

}catch (e) {
    context.fail("Exception:"+e);
}
}

function buildResponse(options) {
    
var response = {
    version: "1.0",
    response: {
    outputSpeech: {
      type: "PlainText",
      text: options.speechText
    },
    "shouldEndSession": options.endSession}
};
    
    if(options.cardTitle) {
        response.reponse.card = { 
        type: "Simple",
        title: options.cardTitle ,
        content: options.cardContent
        }
    }
    
    return response;
}