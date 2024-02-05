const generateUUID = require("../utils/generateUUID");

exports.insertProperty = async (
  db,
  { name, wingId, societyId, area, location, createdOn = new Date() }
) => {
  const PropertyCollection = db.collection("properties");

  const _id = generateUUID();

  const property = await PropertyCollection.insertOne({
    _id,
    name,
    area,
    wingId,
    societyId,
    location,
    createdOn
  });

  if (property) {
    return {
      _id,
      name,
      area,
      wingId,
      societyId,
      location,
      createdOn
    };
  }

  return null;
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
