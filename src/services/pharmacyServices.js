const Pharmacy = require("../models/Pharmacy");
module.exports = class PharmacyServices {
  
  async createPharmacy(pharmacy) {
    try {
      const newPharmacy = new Pharmacy({
        name: pharmacy.name,
        adress: pharmacy.adress,
        phoneNumber: pharmacy.phoneNumber,
        latitude: pharmacy.latitude,
        longitude: pharmacy.longitude,
        openingHour: pharmacy.openingHour,
        closingHour: pharmacy.closingHour,
        feedbacks: pharmacy.feedbacks,
        password: pharmacy.password
      });

      let savedPharmacy = await newPharmacy.save(); //when fail its goes to catch
      console.log("pharmacy created in database in database"); //when successsss it print.
      return savedPharmacy;
    } catch (err) {
      console.log("err" + err);
      res.status(500).send(err);
    }
  }
  async locatePharmacies() {
    var found = await Pharmacy.find({});
    return found;
  }
  async searchPharmacies(query) {
    var searchResult = await Pharmacy.search(query).populate({path:'medicines'});
    return searchResult;
  }
  async addMedicines(query, med) {
    var searchResult = await Pharmacy.search(query)
    .then(data => {
      console.log(data[0].medicines, 'helloooooo')
      data[0].medicines.push(med)
      data[0].save()
      console.log(data)
    })
    .catch(err => console.log(err, 'error updating med'))
  }
};
