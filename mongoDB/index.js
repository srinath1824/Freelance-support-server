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
  developerId: String,
  paymentDetails: Array
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
  paymentDetails: Array
});

// *************** Client Details ********************************

const Client = mongoose.model("client_details", clientDetailsSchema);

const createClientDetails = async (clientDetails) => {
  const client = new Client(clientDetails);
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
  return details;
};

const updateClientDetails = async (data, id) => {
  let clientDetails = mongoose.model("client_details", clientDetailsSchema);
  const clientData = await clientDetails.findOneAndUpdate({ _id: id }, data);
  if (!clientData) return;
  const result = await clientData.save();
  return result;
};

const deleteClientDetails = async (id) => {
  let clientDetails = mongoose.model("client_details", clientDetailsSchema);
  const clientData = await clientDetails.findOneAndDelete({ _id: id });
  if (!clientData) return;
  return clientData;
};

const clientDeveloperMapping = async (data) => {
  let clientDetails = mongoose.model("client_details", clientDetailsSchema);
  const clientData = await clientDetails.findOneAndUpdate(
    { _id: data.clientId },
    { developerId: data.developerId }
  );
  if (!clientData) return;
  return clientDetails.find({ _id: data.clientId });
};

const clientDeveloperUnmapping = async (data) => {
  let clientDetails = mongoose.model("client_details", clientDetailsSchema);
  const clientData = await clientDetails.findOneAndUpdate(
    { _id: data.clientId },
    { developerId: "" }
  );
  if (!clientData) return;
  return clientDetails.find({ _id: data.clientId });
};

const clientPaymentDetails = async (data, id) => {
  let paymentDetails = mongoose.model("client_details", clientDetailsSchema);
  const clientData = await paymentDetails.findOneAndUpdate(
    { _id: id },
    { $push: { paymentDetails: [data] } }
  );
  if (!clientData) return;
  return paymentDetails.find({ _id: id });
};

// ----------------------------------------------------------------

// *************** Developer Details ********************************

const Developer = mongoose.model("developer_details", developerDetailsSchema);

const createDeveloperDetails = async (developerDetails) => {
  const developer = new Developer(developerDetails);
  const result = await developer.save();
  return result;
};

const getDeveloperDetails = async () => {
  const developerDetails = mongoose.model(
    "developer_details",
    developerDetailsSchema
  );
  let details;
  try {
    details = await developerDetails.find({});
  } catch (err) {
    console.log("ERROR IN FINDING DATA");
  }
  return details;
};

const getDeveloperDetailsById = async (id) => {
  const developerDetails = mongoose.model(
    "developer_details",
    developerDetailsSchema
  );
  let details;
  try {
    details = await developerDetails.find({ _id: id });
  } catch (err) {
    console.log("ERROR IN FINDING DATA");
  }
  return details;
};

const updateDeveloperDetails = async (data, id) => {
  let developerDetails = mongoose.model(
    "developer_details",
    developerDetailsSchema
  );
  const developerData = await developerDetails.findOneAndUpdate(
    { _id: id },
    data
  );
  if (!developerData) return;
  const result = await developerData.save();
  return result;
};

const deleteDeveloperDetails = async (id) => {
  let developerDetails = mongoose.model(
    "developer_details",
    developerDetailsSchema
  );
  const developerData = await developerDetails.findOneAndDelete({ _id: id });
  if (!developerData) return;
  return developerData;
};

const developerPaymentDetails = async (data, id) => {
  let paymentDetails = mongoose.model(
    "developer_details",
    developerDetailsSchema
  );
  const developerData = await paymentDetails.findOneAndUpdate(
    { _id: id },
    { $push: { paymentDetails: [data] } }
  );
  if (!developerData) return;
  return paymentDetails.find({ _id: id });
};

// ----------------------------------------------------------------

// *************** DashBorad Details ********************************

const getDashBoradDetails = async () => {
  const developerDetails = mongoose.model(
    "developer_details",
    developerDetailsSchema
  );
  const clientDetails = mongoose.model("client_details", clientDetailsSchema);
  let devdetails = await developerDetails.find({});
  let clientPaydetails = await clientDetails.find({});
  let totalproftdetails = [];
  let profitdetails = [];
  let devamountdetails = [];

  const dateView = (date) => {
    let paidDate = new Date(date);
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = monthNames[paidDate.getUTCMonth()];
    let year = paidDate.getFullYear();
    return month + year;
  };
  const checkValues = (date, amount, detailValues) => {
    let checkval = detailValues.find((val) => val.name === date);
    if (checkval) {
      let index = detailValues.findIndex((val) => val.name === date);
      let details = [...detailValues];
      details[index].earning =
        parseInt(details[index].earning) + parseInt(amount);
      details.splice(index, 1, details[index]);
    } else {
      detailValues.push({
        name: date,
        earning: amount,
      });
    }
  };

  if (devdetails && clientPaydetails) {
    clientPaydetails.map((data) => {
      data.paymentDetails.map((val) => {
        const paidMonth = dateView(val.datePaid);
        checkValues(paidMonth, val.amountPaid, profitdetails);
      });
    });
    devdetails.map((data) => {
      data.paymentDetails.map((val) => {
        const paidMonth = dateView(val.datePaid);
        checkValues(paidMonth, val.amountPaid, devamountdetails);
      });
    });
    profitdetails.map((client) => {
      devamountdetails.map((dev) => {
        if (client.name === dev.name) {
          let savings = client.earning - dev.earnedamount;
          totalproftdetails.push({
            name: client.name,
            saving: savings,
            earning: client.earning,
          });
        }
      });
    });
  }
  return totalproftdetails;
};

const getClientDetailsDashborad = async () => {
  const developerDetails = mongoose.model(
    "developer_details",
    developerDetailsSchema
  );
  let clientDetails = mongoose.model("client_details", clientDetailsSchema);
  let clientBorad = await clientDetails.find({});
  let developerBorad = await developerDetails.find({});
  let boardDetails = [];
  if (clientBorad && developerBorad) {
    clientBorad.map((cli) => {
      const findId = developerBorad.find((dev) => dev._id == cli.developerId);
      if (findId) {
        let clidetails = cli.paymentDetails.slice(-1);
        let devdetails = findId.paymentDetails.slice(-1);
        let clidata = [];
        clidetails.map((a) => {
          let paidYear = new Date(a.datePaid);
          clidata.push({
            month: a.paidForMonth + paidYear.getFullYear(),
            earning: a.amountPaid,
          });
        });
        let month;
        let amount;
        clidata.map((d) => {
          return (month = d.month), (amount = d.earning);
        });
        let devdata = devdetails.map((v) => {
          return v.amountPaid;
        });

        boardDetails.push({
          clientName: cli.clientName,
          developerName: findId.developerName,
          month: month,
          amountPaid: devdata.toString(),
          earning: amount,
          status: findId.status,
          technology: findId.technology,
          amount: findId.amount,
          startDate: cli.started,
        });
      }
    });
  }
  return boardDetails;
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
  clientDeveloperMapping,
  clientDeveloperUnmapping,
  clientPaymentDetails,

  createDeveloperDetails,
  getDeveloperDetails,
  getDeveloperDetailsById,
  updateDeveloperDetails,
  deleteDeveloperDetails,
  developerPaymentDetails,

  getDashBoradDetails,
  getClientDetailsDashborad,
};
