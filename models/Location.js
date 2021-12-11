// Import mongoose
import mongoose from "mongoose";

// const Schema = mongoose.Schema;
const { Schema } = mongoose; // Destructure the Schema class

// link for the csv file (with preview) to check how the data looks visually:
// https://gitlab.com/100best/100bestdb/-/blob/main/100best_db.csv

function limitToFour(val) {
  return val.length <= 5;
}
function limitToEight(val) {
  return val.length <= 8;
}

const locationSchema = new Schema({
  //? ATTRIBUTES for each property in the schema:
  //? data type
  //? if required
  //? if the property's value is unique

  //1. GENERAL:
  name: { type: String, required: true },
  city: { type: String, required: true },
  year: { type: Number, required: true },
  description: {
    type: String,
    max: 100, //? is 70 enough?
    //? "A very nice restaurant where you surely have the best tap water you'll ever taste in your entire life!" -->  100 chars and still quite short
    //07.12.2021, Yulia: changed to 100
    required: false,
  },
  country: { type: String, required: true },
  district: { type: String, required: false },
  img: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    validate: [limitToFour, "{PATH} exceeds the limit of 4"],
  },
  category: { type: String, required: true },
  addedBy: {
    user: {
      type: String,
      required: true,
    },
    date: { type: String, required: true },
  },
  isOpen: { type: Boolean, required: true }, //if closed, assign "false"

  //2. TAGS:
  mealType: [{ type: String, required: true }],
  awards: [{ type: String, required: false }], // awards array not rendered on the location page / only for filtering on main
  tags: [{ type: String, required: true }],

  //3. REVIEWS: //array of objects for now
  //We may need to change this to two arrays of objects: one for International and one for Local Reviews
  //TBC for later

  //new version:
  reviews: {
    _id: false,
    type: [
      {
        name: {
          type: String,
          required: false,
        },
        link: { type: String, required: false },
      },
    ],
    validate: [limitToEight, "{PATH} exceeds the limit of 10"],
  },

  //old version:
  /* reviews: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    validate: [limitToFour, "{PATH} exceeds the limit of 4"],
  }, */

  //07.12.2021, added:
  googleLink: { type: String, required: false }, //accepts only weblink

  //4. DETAILS:
  weblink: { type: String, required: false }, //accepts only weblink
  description: {
    type: String,
    max: 100, //? is 70 enough?
    //? "A very nice restaurant where you surely have the best tap water you'll ever taste in your entire life!" -->  100 chars and still quite short
    //07.12.2021, Yulia: changed to 100
    required: false,
  },
  topDish: { type: String, max: 75, required: false },
  topDrink: { type: String, max: 75, required: false },
  //topChef: { type: Boolean, required: true }, //if topChef = true, the short sentence should be added in the location card
  topChef: { type: String, max: 75, required: false }, //In order to prevent bugs it might be sufficient to  check if 'topChef' has a value or not
  //? changed placesAround to array
  placesAround: { type: String, required: false }, //if we have capacity, we add few places worth visiting around historic places, shopping, cultural locations

  //? FOR THE FUTURE ******
  //1:
  /* const editedBySchema = new Schema({
  user: {
    type: String,
    required: false
  },
  date: { type: String, required: false },
  }); */

  //2:
  // const detailsSchema = new Schema({
  //   weblink: { type: String, required: false }, //accepts only weblink
  //   topDish: { type: String, max: 75, required: false },
  //   topDrink: { type: String, max: 75, required: false },
  //   //topChef: { type: Boolean, required: true }, //if topChef = true, the short sentence should be added in the location card
  //   topChef: { type: String, max: 75, required: false }, //In order to prevent bugs it might be sufficient to  check if 'topChef' has a value or not
  //   //? changed placesAround to array
  //   placesAround: [{ type: String, required: false }], //if we have capacity, we add few places worth visiting around historic places, shopping, cultural locations
  // });
  //? details: detailsSchema,

  //3:
  //? editedBy: [editedBySchema],
  //WE DONT USE editedBy for now:
  // editedBy: [{
  //   user: {
  //     type: String,
  //     required: false
  //   },
  //   date: { type: String, required: false },
  // }],
  //? *********************
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
