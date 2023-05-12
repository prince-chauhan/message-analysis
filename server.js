// server.js
// where your node app starts

const express = require("express");
const app = express();
require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const toxicity = require('@tensorflow-models/toxicity');
app.use(express.json());



app.get("/", async function(request, response) {
  // The minimum prediction confidence.
  response.sendFile(__dirname+'/home.html');
});


app.get("/main.js", async function(request, response) {
  // The minimum prediction confidence.
  response.header("Content-Type", "application/javascript");
  response.sendFile(__dirname+'/main.js');
});
app.post('/sentiment', async function(req, res){
  try{
const threshold = 0.9;
toxicity.load(threshold).then(model => {
  const sentences = [req.body.message]||['hello'];

  model.classify(sentences).then(predictions => {
    res.json({sentiments:predictions.filter(obj=>obj.label==='toxicity')[0].results[0]})
  });
});
  }
  catch(err){
    res.status(500).json({message:'Internal error occured'})
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
