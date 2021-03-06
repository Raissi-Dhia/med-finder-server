const Medicine = require("../models/Medicines");
const Pharmacy = require("../models/Pharmacy")
module.exports = class MedicineServices {
  async createMedicine(medicine) {
    try {
      const newMedicine = new Medicine({
        name: medicine.name,
        medicineClass: medicine.medicineClass,
        cost: medicine.cost,
        administrationRoute: medicine.administrationRoute,
        dosageForm: medicine.dosageForm,
        dosageschedule: medicine.dosageschedule,
        medicineUnit: medicine.medicineUnit,
        expiringDay: medicine.expiringDay,
        prescriptionStatus: medicine.prescriptionStatus,
        code: medicine.code,
        warning: medicine.warning,
        sameAs: medicine.sameAs,
        quantity: medicine.quantity
      });

      let savedMedicine = await newMedicine.save(); //when fail its goes to catch
      console.log("medecine saved in database "); //when successsss it print.
      return savedMedicine;
    } catch (err) {
      console.log("err" + err);
      res.status(500).send(err);
    }
  }
  async searchMedicine(query) {
    try {
      var searchResult = await Medicine.search(query).populate({path:'pharmacyId'});
      return searchResult;
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
  async getAllMedicines() {
    var found = await Medicine.find({});
    return found;
  }
  async addPharmacy(query, pharmacyId) {
     await Medicine.search(query)
    .then(data => {
      console.log(data[0].pharmacyId, 'helloooooo from medicine')
      data[0].pharmacyId.push(pharmacyId)
      data[0].save()
      console.log(data)
    })
    .catch(err => console.log(err, 'error updating med'))
  }
  async getMedsLocations() {
     await Medicine.find({}).populate({path:'pharmacyId'})
    .then(data => {
      var arr = data.map((med)=>{
        if( med.pharmacyId.length !== 0) return med
      })
      console.log(arr, "arrrrrrrrrr")
    })
     .catch(err => console.log(err)) 
  }
}
