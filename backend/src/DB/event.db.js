const generateUUID = require("../utils/generateUUID");

exports.insertEvent = async (db, eventData) => {
  const EventCollection = db.collection("events");

  const _id = generateUUID();
  const event = await EventCollection.insertOne({ _id, ...eventData });

  if (event) {
    return { _id, ...eventData };
  }

  return null;
};

exports.findEvent = async (db, searchQuery) => {
  const EventCollection = db.collection("events");

  // const event = await EventCollection.findOne(searchQuery);

  const event = await await BookingCollection.aggregate([
    { $match: searchQuery },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        // localField: "userId",
        // foreignField: "_id",
        pipeline: [
          { $match: { $expr: { $eq: ["$$userId", "$_id"] } } },
          { $project: { _id: 0, name: 1, role: 1 } },
        ],
        as: "user",
      }, // will return array
    },
    {
      $lookup: {
        from: "properties",
        // let: { propertyIds: "$propertyIds" },
        localField: "propertyIds",
        foreignField: "_id",
        // pipeline: [
        //   { $match: { $expr: { $eq: ["$$propertyIds", "$_id"] } } },
        //   // { $match: { "$_id": { $in: ["$$propertyIds"] } } },
        //   {
        //     $project: { _id: 0, name: 1, area: 1, location: 1, rentPerDay: 1 },
        //   },
        // ],
        as: "properties",
      }, // will return array
    },
    { $unwind: "$user" },
  ]).toArray();

  console.log(event);

  return event[0];
};

/**
 *
 * @param {*} db
 * @param {*} searchQuery
 * @param {*} skip
 * @param {*} limit
 * @param {*} sort
 * @returns
 */
exports.findEvents = async (db, searchQuery, skip, limit, sort) => {
  const EventCollection = db.collection("events");

  // const events = await EventCollection.find(searchQuery)
  //   .skip(skip)
  //   .limit(limit)
  //   .sort(sort)
  //   .toArray();

  const events = await EventCollection.aggregate([
    { $match: searchQuery },
    { $skip: skip },
    { $limit: limit },
    { $sort: sort },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        // localField: "userId",
        // foreignField: "_id",
        pipeline: [
          { $match: { $expr: { $eq: ["$$userId", "$_id"] } } },
          { $project: { _id: 0, name: 1, role: 1 } },
        ],
        as: "user",
      }, // will return array
    },
    {
      $lookup: {
        from: "properties",
        // let: { propertyIds: "$propertyIds" },
        localField: "propertyIds",
        foreignField: "_id",
        // pipeline: [
        //   { $match: { $expr: { $eq: ["$$propertyIds", "$_id"] } } },
        //   // { $match: { "$_id": { $in: ["$$propertyIds"] } } },
        //   {
        //     $project: { _id: 0, name: 1, area: 1, location: 1, rentPerDay: 1 },
        //   },
        // ],
        as: "properties",
      }, // will return array
    },
    { $unwind: "$user" },
  ]).toArray();

  console.log(events);

  return events;
};

exports.updateEventData = async (db, searchQuery, dataToUpdate) => {
  const EventCollection = db.collection("events");

  const event = await EventCollection.findOneAndUpdate(
    searchQuery,
    {
      $set: dataToUpdate
    },
    { returnDocument: "after" }
  );

  return event;
};

exports.deleteEventData = async (db, searchQuery) => {
  const EventCollection = db.collection("events");

  const event = await EventCollection.findOneAndDelete(searchQuery);

  console.log(event);

  return event;
};
