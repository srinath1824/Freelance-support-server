const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log("could not connect to mongoDB...", process.env.MONGODB_URI);
    console.log("ERROR IN DATABASE", err);
  });

const clientDetailsSchema = new mongoose.Schema({
  clientName: String,
  technology: String,
  started: String,
  amount: Number,
  status: String,
});

const developerDetailsSchema = new mongoose.Schema({
  developerName: String,
  technology: String,
  started: String,
  amount: Number,
  experience: String,
  company: String,
  mobile: Number,
  status: String,
});

// *************** Client Details ********************************

const Client = mongoose.model("client_details", clientDetailsSchema);

const createClientDetails = async (clientDetails) => {
  const client = new Client(clientDetails)
  const result = await client.save();
  return result;
};

const getClientDetails = async () => {
  const clientDetails = mongoose.model("client_details", clientDetailsSchema);
  let details;
  try {
    details = await clientDetails.find({});
  } catch (err) {
    console.log("ERROR IN FINDING DATA");
  }
  console.log(details);
  return details;
}

const updateClientDetails = async (data, id) => {
  let clientDetails = mongoose.model("client_details", clientDetailsSchema);
  const clientData = await clientDetails.findOneAndUpdate(
    { _id: id },
    data,
  );
  if (!clientData) return;
  const result = await clientData.save();
  console.log(result);
  return result;
};

const deleteClientDetails = async (id) => {
  let clientDetails = mongoose.model("client_details", clientDetailsSchema);
  const clientData = await clientDetails.findOneAndDelete({ _id: id });
  if (!clientData) return;
  return clientData;
};

// ----------------------------------------------------------------

// *************** Developer Details ********************************

const Developer = mongoose.model("developer_details", developerDetailsSchema);

const createDeveloperDetails = async (developerDetails) => {
  const developer = new Developer(developerDetails)
  const result = await developer.save();
  return result;
};

const getDeveloperDetails = async () => {
  const developerDetails = mongoose.model("developer_details", developerDetailsSchema);
  let details;
  try {
    details = await developerDetails.find({});
  } catch (err) {
    console.log("ERROR IN FINDING DATA");
  }
  console.log(details);
  return details;
}

const updateDeveloperDetails = async (data, id) => {
  let developerDetails = mongoose.model("developer_details", developerDetailsSchema);
  const developerData = await developerDetails.findOneAndUpdate(
    { _id: id },
    data,
  );
  if (!developerData) return;
  const result = await developerData.save();
  console.log(result);
  return result;
};

const deleteDeveloperDetails = async (id) => {
  let developerDetails = mongoose.model("developer_details", developerDetailsSchema);
  const developerData = await developerDetails.findOneAndDelete({ _id: id });
  if (!developerData) return;
  return developerData;
};


// ----------------------------------------------------------------

// eq
// ne
// gt
// gte
// lt
// lte
// in, nin

module.exports = {
  getClientDetails,
  createClientDetails,
  updateClientDetails,
  deleteClientDetails,

  createDeveloperDetails,
  getDeveloperDetails,
  updateDeveloperDetails,
  deleteDeveloperDetails
};
