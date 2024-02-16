const joi = require("joi");

// {
// "_id": "652c21c9-7f65-4e2f-a510-298269b1d829",
// "wingAdminId": "65cf60c6-4e68-41d9-be0c-5762be5be9ff",
// "societyId": "8426a679-6a38-416a-a6d8-4e9ccadb8744",
// "name": "wing B",
// "area": 5000,
// "location": "somewhere outside society"
// }

exports.wingIdValidator = (ctx) => {
  const { wingId } = ctx.request.body;

  if (!wingId && !ctx.request.path.includes("property")) {
    return { field: "wingId", message: "WingId is required." };
  }
  if (wingId) {
    const { error } = joi.string().uuid().required().validate(wingId);
    if (error) {
      return { field: "wingId", message: "Wing ID must be a valid UUID" };
    }
  }

  return null;
};
