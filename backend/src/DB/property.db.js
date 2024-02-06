const generateUUID = require("../utils/generateUUID");

exports.insertProperty = async (db, propertyData) => {
  const PropertyCollection = db.collection("properties");

  const _id = generateUUID();

  const property = await PropertyCollection.insertOne({ _id, ...propertyData });

  return { _id, ...propertyData };
};

exports.findProperty = async (db, searchQuery) => {
  const PropertyCollection = db.collection("properties");

  const property = await PropertyCollection.findOne(searchQuery);

  console.log(property);

  return property;
};

exports.findProperties = async (db, searchQuery) => {
  const PropertyCollection = db.collection("properties");

  const properties = await PropertyCollection.find(searchQuery).toArray();

  console.log(properties);

  return properties;
};

exports.updatePropertyData = async (db, searchQuery, dataToUpdate) => {
  const PropertyCollection = db.collection("properties");

  const property = await PropertyCollection.findOneAndUpdate(
    searchQuery,
    {
      $set: dataToUpdate
    },
    { returnDocument: "after" }
  );

  return property;
};

exports.deletePropertyData = async (db, searchQuery) => {
  const PropertyCollection = db.collection("properties");

  const property = await PropertyCollection.findOneAndDelete(searchQuery);

  console.log(property);

  return property;
};

exports.calculatePropertyRent = async (db, propertyIds, requestedDateRange) => {
  const PropertyCollection = db.collection("properties");
  const aggregationPipeline = [
    {
      $match: {
        _id: { $in: propertyIds }
      }
    },
    {
      $project: {
        _id: 1,
        rentPerDay: 1
      }
    },
    {
      $group: {
        _id: null,
        totalDays: {
          $sum: {
            $ceil: {
              $divide: [
                {
                  $subtract: [
                    requestedDateRange.endDate,
                    requestedDateRange.startDate
                  ]
                },
                24 * 60 * 60 * 1000 // Convert milliseconds to days
              ]
            }
          }
        },
        totalAmount: {
          $sum: {
            $multiply: [
              {
                $ceil: {
                  $divide: [
                    {
                      $subtract: [
                        requestedDateRange.endDate,
                        requestedDateRange.startDate
                      ]
                    },
                    24 * 60 * 60 * 1000 // Convert milliseconds to days
                  ]
                }
              },
              "$rentPerDay"
            ]
          }
        }
      }
    }
  ];

  const totalPayableAmount = await PropertyCollection.aggregate(
    aggregationPipeline
  ).toArray();

  console.log(totalPayableAmount);
  return totalPayableAmount;
};
