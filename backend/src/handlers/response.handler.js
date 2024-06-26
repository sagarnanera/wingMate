/**
 *
 * @param {*} ctx
 * @param {boolean} success
 * @param {string} resMessage
 * @param {Number} resStatus
 * @param {object} resData
 * @param {string} logMessage
 */
exports.responseHandler = (
  ctx,
  success,
  resMessage,
  resStatus = 500,
  resData,
  logMessage
) => {
  console.dir({ logMessage, resData }, { depth: null });
  ctx.status = resStatus || 500;
  ctx.body = { success: success, message: resMessage, ...resData };
};
