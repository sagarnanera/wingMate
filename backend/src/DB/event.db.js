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

  const event = await EventCollection.findOne(searchQuery);

  console.log(event);

  return event;
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

  const events = await EventCollection.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .toArray();

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
