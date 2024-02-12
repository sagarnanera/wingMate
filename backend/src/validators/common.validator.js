exports.skipValidator = (ctx) => {
  let { skip } = ctx.request.query;
  skip = parseInt(skip);

  if (skip && (isNaN(skip) || skip < 0)) {
    return { field: "skip", message: "Skip must be a non-negative integer" };
  }

  ctx.request.query.skip = skip || 0;

  return null;
};

exports.limitValidator = (ctx) => {
  let { limit } = ctx.request.query;
  limit = parseInt(limit);

  if (limit && (isNaN(limit) || limit <= 0)) {
    return { field: "limit", message: "Limit must be a positive integer" };
  }

  ctx.request.query.limit = limit || 10;

  return null;
};
