const create = async (model, data) => {
  return await model.create(data);
};

// create Many
const createMany = async (model, body) => {
  return await model.insertMany(body);
};
// find and filter
const find = async (
  model,
  filter = {},
  pagination = {},
  sort = {},
  projection = {},
  populate = null,
) => {
  return await model
    .find(filter, projection)
    .sort(sort)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .populate(populate);
};
const findOne = async (model, filter, projection = {}, populate = null) =>
  await model.findOne(filter, projection, { populate: populate });

const findByID = async (model, id) => {
  return await model.findById(id);
};
const countDocuments = async (model, filter) => {
  return await model.countDocuments(filter);
};
// updates
const findOneAndUpdate = async (model, filter, body) => {
  return await model.findOneAndUpdate(filter, body, { new: true });
};
const findOneAndUpsert = async (model, filter, body) => {
  return await model.findOneAndUpdate(filter, body, {
    new: true,
    upsert: true,
    runValidators: true,
    context: "query",
    setDefaultsOnInsert: true,
  });
};
const updateMany = async (model, filter, body) => {
  return await model.updateMany(filter, body, { new: true });
};
// delete
const findOneAndDelete = async (model, filter) => {
  return await model.findOneAndDelete(filter);
};
const deleteMany = async (model, filter) => {
  return await model.deleteMany(filter);
};
// aggregation
const aggregate = async (model, query) => {
  return await model.aggregate(query);
};
//distinct values
const distinct = async (model, field, query = {}, options = {}) => {
  return await model.distinct(field, query);
};

module.exports = {
  create,
  createMany,
  find,
  findOne,
  findByID,
  updateMany,
  findOneAndUpdate,
  findOneAndUpsert,
  countDocuments,
  findOneAndDelete,
  deleteMany,
  aggregate,
  distinct,
};
