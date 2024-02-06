const generateUUID = require("../utils/generateUUID");

exports.insertEvent = async (db, eventData) => {
  const EventCollection = db.collection("events");

  const _id = generateUUID();
  const event = await EventCollection.insertOne({ _id, ...eventData });

  return { _id, ...eventData };
};

exports.findEvent = async (db, searchQuery) => {
  const EventCollection = db.collection("events");

  const event = await EventCollection.findOne(searchQuery);

  console.log(event);

  return event;
};

exports.findEvents = async (db, searchQuery) => {
  const EventCollection = db.collection("events");

  const events = await EventCollection.find(searchQuery).toArray();

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
