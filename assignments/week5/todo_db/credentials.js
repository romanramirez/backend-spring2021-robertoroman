// Credentials

// Things you don't want public

const dbURL =
  'mongodb+srv://romanramirez:Imgoingbackto505!@cluster0.0fgmd.mongodb.net/todo?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  dbURL: dbURL,
};
