{
  "languageModel": {
    "intents": [
      {
        "name": "AMAZON.CancelIntent",
        "samples": []
      },
      {
        "name": "AMAZON.HelpIntent",
        "samples": []
      },
      {
        "name": "AMAZON.StopIntent",
        "samples": []
      },
      {
        "name": "TranslateIntent",
        "samples": [
          "How do you say {happy|sentence} in German",
          "how do you say {I am a very very very very very happy guy|sentence} in German"
        ],
        "slots": [
          {
            "name": "sentence",
            "type": "AMAZON.LITERAL"
          }
        ]
      }
    ],
    "invocationName": "german translator"
  }
}