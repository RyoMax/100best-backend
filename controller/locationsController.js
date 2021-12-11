import createError from "http-errors";
import Location from "../models/Location.js";
import AdminUser from "../models/AdminUser.js";

export const getAllLocations = async (req, res, next) => {
  try {
    const currentUser = await AdminUser.findById(req.adminUserId);
    if (!currentUser) return next(createError.Unauthorized());
    const reqPage = +req.query.page || 1;
    const reqLimit = +req.query.limit || 40;
    console.log("reqPage", reqPage);
    const limit = reqLimit <= 100 ? reqLimit : 100;
    const skip = (reqPage - 1) * limit;

    const getSomeLocations = await Location.find().skip(skip).limit(limit);
    const getAllLocations = await Location.find();
    const getCities = getAllLocations.map((data) => data.city);
    const uniqueSet = new Set(getCities);
    let dataListCities = [...uniqueSet];

    console.log(`Total Locations found: ${getAllLocations.length} entries.`);
    const response = {
      locations: getSomeLocations,
      countAllLocations: getAllLocations.length,
      dataListCities: dataListCities,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};

export const postLocation = async (req, res, next) => {
  try {
    const currentUser = await AdminUser.findById(req.adminUserId);
    if (!currentUser) return next(createError.Unauthorized());

    const {
      name,
      city,
      year,
      country,
      district,
      img,
      category,
      addedBy,
      isOpen,
      mealType,
      awards,
      tags,
      reviews,
      description,
      weblink,
      topDish,
      topDrink,
      topChef,
      placesAround,
      googleLink,

      //? FUTURE
      //?details,
      //? editedBy,
    } = req.body;

    console.log("postLocation addedBy", addedBy);
    //console.log(addedBy.user)

    const locationExist = await Location.findOne({
      name: name,
      city: city,
      country: country,
    });

    if (locationExist) {
      res.json(createError.Conflict());
    }

    /* const newLocation = await Location.create(
            {
                name: name,
                year: year,
                city: city,
                district: district,
                country: country,
                addedBy: addedBy,
                editedBy: editedBy,
                isOpen: isOpen,
                img: img,
                description: description,
                details: details,
                reviews: reviews,
                category: category,
                tags: tags,
                mealType: mealType,
                awards: awards
            }
        ) */
    let newLocation = new Location({
      name: name,
      year: year,
      city: city,
      country: country,
      district: district,
      img: img,
      category: category,
      addedBy: addedBy,
      isOpen: isOpen,
      mealType: mealType,
      awards: awards,
      tags: tags,
      reviews: reviews,
      description: description,
      weblink: weblink,
      topDish: topDish,
      topDrink: topDrink,
      topChef: topChef,
      placesAround: placesAround,
      googleLink: googleLink,

      //? FUTURE
      //? editedBy: editedBy,
      //? details: details,
    });

    await newLocation.save();

    const response = await Location.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};

export const getCity = async (req, res, next) => {
  try {
    const currentUser = await AdminUser.findById(req.adminUserId);
    if (!currentUser) return next(createError.Unauthorized());

    const reqPage = +req.query.page || 1;
    const reqLimit = +req.query.limit || 40;

    const limit = reqLimit <= 100 ? reqLimit : 100;
    const skip = (reqPage - 1) * limit;

    console.log(req.params);
    const { city } = req.params;
    const getCity = await Location.find({ city: city }).skip(skip).limit(limit);
    if (!getCity) return next(createError(404, "City Not Found"));
    console.log(`For ${city} found: ${getCity.length} entries.`);
    res.status(200).json(getCity);
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};

export const getCityAndYear = async (req, res, next) => {
  try {
    //const {page} = req.body //? Or req.params

    const currentUser = await AdminUser.findById(req.adminUserId);
    if (!currentUser) return next(createError.Unauthorized());

    const reqPage = +req.query.page || 1;
    const reqLimit = +req.query.limit || 40;

    const limit = reqLimit <= 100 ? reqLimit : 100;
    const skip = (reqPage - 1) * limit;

    const { city, year } = req.params;
    console.log(`Looking for ${city} - ${year}`);
    const getCityAndYear = await Location.find({ city: city, year: year })
      .skip(skip)
      .limit(limit);
    if (!getCityAndYear) return next(createError(404, "City Not Found"));
    console.log(
      `For ${city} - ${year} found: ${getCityAndYear.length} entries.`
    );
    res.status(200).json(getCityAndYear);
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};

export const getEstablishmentData = async (req, res, next) => {
  try {
    const currentUser = await AdminUser.findById(req.adminUserId);
    if (!currentUser) return next(createError.Unauthorized());

    const { locationId } = req.params;
    const getEstablishmentData = await Location.findById(locationId);
    if (!getEstablishmentData)
      return next(createError(404, "Establishment Not Found or wrong ID"));
    console.log(`For ${locationId} found: ${getEstablishmentData.name}`);
    res.status(200).json(getEstablishmentData);
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};

export const updateEstablishmentData = async (req, res, next) => {
  try {
    const currentUser = await AdminUser.findById(req.adminUserId);
    if (!currentUser) return next(createError.Unauthorized());

    //REQ BODY
    const {
      name,
      city,
      year,
      description,
      country,
      district,
      img,
      category,
      addedBy,
      editedBy,
      isOpen,
      mealType,
      awards,
      tags,
      reviews,

      //? FUTURE
      //?details,
      //? editedBy,
    } = req.body;
    const { locationId } = req.params;

    const currentEstablishment = await Location.findById(locationId);
    if (!currentEstablishment)
      return next(createError(404, "Establishment Not Found or wrong ID"));
    // const locationExist = await Location.findOne({ name: name, city: city, country: country })
    // if(locationExist) return next(createError.Conflict())
    console.log(`For ${locationId} found: ${currentEstablishment.name}`);
    currentEstablishment.name = name;
    currentEstablishment.city = city;
    currentEstablishment.year = year;
    currentEstablishment.description = description;
    currentEstablishment.country = country;
    currentEstablishment.district = district;
    currentEstablishment.img = img;
    currentEstablishment.category = category;
    currentEstablishment.addedBy = addedBy;
    currentEstablishment.editedBy = editedBy;
    currentEstablishment.isOpen = isOpen;
    currentEstablishment.mealType = mealType;
    currentEstablishment.awards = awards;
    currentEstablishment.tags = tags;
    currentEstablishment.reviews = reviews;

    //? FUTURE
    //? currentEstablishment.details = details;
    //? currentEstablishment.editedBy = editedBy;

    await currentEstablishment.save();
    console.log(`UPDATE Finish ----> ${currentEstablishment.name}`);

    const response = await Location.find();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};

export const deleteEstablishmentData = async (req, res, next) => {
  try {
    const currentUser = await AdminUser.findById(req.adminUserId);
    if (!currentUser) return next(createError.Unauthorized());

    const { locationId } = req.params;
    const currentEstablishment = await Location.findById(locationId);
    if (!currentEstablishment)
      return next(createError(404, "Establishment Not Found or wrong ID"));
    console.log(
      `For ${locationId} found: ${currentEstablishment.name} <----DELETED`
    );

    await Location.deleteOne({ _id: locationId });
    const response = await Location.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError());
  }
};
