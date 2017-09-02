var mongoose = require('mongoose');

mongoose.connect('mongodb://0.tcp.ngrok.io:10882/anotherDb', {
  useMongoClient: true, 
})

var myNewDb = mongoose.connection;
myNewDb.on('error', console.error.bind(console, 'connection error:'));
myNewDb.once('open', () => {
  console.log("We are connected")
})

var Schema = mongoose.Schema;
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
})

var Person = mongoose.model('Person', personSchema);

var axl = new Person({
  name: { first: 'Axl', last: 'Rose' }
});

axl.save();
myNewDb.close();

// var kittySchema = mongoose.Schema({
//   name: String
// });

// var Kitten = mongoose.model('Kitten', kittySchema)

// var silence = new Kitten({ name: 'Silence' });
// console.log(silence.name);

// var MyModel = mongoose.model('Test', new Schema({ name: String }));
// MyModel.findOne(function(error, result) { 
//   console.log(result)
//   console.log(error)
//  });