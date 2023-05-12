// server.js

// Importing dependencies
const express = require("express");
require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const toxicity = require('@tensorflow-models/toxicity');


// Initializing Express app
const app = express();

// Parsing request body as JSON
app.use(express.json());


// Serving home.html file to / endpoint
app.get("/", async function(request, response) {
  // The minimum prediction confidence.
  response.sendFile(__dirname+'/home.html');
});

// Serve main.js file to avoid mimetype issue
app.get("/main.js", async function(request, response) {
  // The minimum prediction confidence.
  response.header("Content-Type", "application/javascript");
  response.sendFile(__dirname+'/main.js');
});

// POST route for sentiment analysis
app.post('/sentiment', async function(req, res){
  try{
      const threshold = 0.9;
      // Load toxicity model
      toxicity.load(threshold).then(model => {
        // Classifying input sentences if no message passed then use hello 
        const sentences = [req.body.message]||['hello'];
        model.classify(sentences).then(predictions => {
          
          // Return resultby filtering out only toxicity from prediction and removing other labels
          res.json({sentiments:predictions.filter(obj=>obj.label==='toxicity')[0].results[0]})
      });
    });
  }
  catch(err){
    res.status(500).json({message:'Internal error occured'})
  }
});

// Starting the server
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
