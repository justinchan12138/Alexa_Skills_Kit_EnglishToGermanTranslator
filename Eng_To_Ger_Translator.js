/*  Justin Chan Yung Shing 05/02/2018 
    For opearlo Intern Interview 
    A simple Eng - Ger translation Alexa skills kit 
    API used: https://cloud.google.com/translate/docs/ -- You need an API key for this application to work
*/

'use strict';
const http = require('https');
var api = "<<ENTER YOUR API KEY HERE>>"; 

exports.handler = function(event,context) {

    var request = event.request;
  
    /* 3 types of requests
    i)   LaunchRequest       
    ii)  IntentRequest       
    iii) SessionEndedRequest  */
    
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
        getTranslation(sentence, function(translatedSentence,err){
            if (err) {
                context.fail(err);
            } else {
                options.cardTitle = "Translation of:" + sentence;
                options.cardContent = translatedSentence;
                options.speechText = translatedSentence + ". Sorry that my pronounciation is not very good yet. But I have sent the translation to your alexa app. Is there anything that you need help with?";
                options.repromptText = "is there anything else that I can do?"
                options.endSession = false;
                context.succeed(buildResponse(options));
            }
        });
    }}
    else if (request.type === "SessionEndedRequest"){
        
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
    if(options.repromptText) {
        response.response.reprompt = {
            outputSpeech: {
            type:"PlainText",
            text: options.repromptText}
            
        };} 
    
    if(options.cardTitle) {
        response.response.card = { 
        type: "Simple",
        title: options.cardTitle ,
        content: options.cardContent
        }
    }
    
    return response;
}

function getTranslation(sentence, callback) {
    var url = "https://translation.googleapis.com/language/translate/v2?key=" + api +"&target=de" + "&q=" + sentence;
    var req = http.get(url, function(res){
    var body = "";
    
    res.on('data', function(chunk) {
        body += chunk;
    });
    
    res.on('end', function(){
        //console.log(body);
        body = body.replace(/\\/g,'');
        var content = JSON.parse(body);
        //console.log(content);
        callback(content.data.translations[0].translatedText);
    }); 
    
    });
    
    req.on('error', function(err){
    callback('', err);
    });
    
}