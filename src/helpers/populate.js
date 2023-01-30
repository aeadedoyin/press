const { createCoreController } = require("@strapi/strapi/lib/factories");

function populateAttribute({ components }, kind = "*") {
  if (components) {
    const populate = components.reduce((currentValue, current) => {
      return {
        ...currentValue,
        [current.split(".").pop()]: { populate: kind },
      };
    }, {});
    return { populate };
  }
  return { populate: kind };
}

const getPopulateFromSchema = function (schema, kind = "*") {
  return Object.keys(schema.attributes).reduce((currentValue, current) => {
    const attribute = schema.attributes[current];
    if (
      !["dynamiczone", "component", "relation", "media"].includes(
        attribute.type
      )
    ) {
      return currentValue;
    }
    return {
      ...currentValue,
      [current]: populateAttribute(attribute, kind),
    };
  }, {});
};

function createPopulatedController(uid, schema) {
  return createCoreController(uid, () => {
    console.log(schema.collectionName, getPopulateFromSchema(schema));
    return {
      async find(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: getPopulateFromSchema(schema),
        };
        return await super.find(ctx);
      },
      async findOne(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: getPopulateFromSchema(schema),
        };
        return await super.findOne(ctx);
      },
    };
  });
}

module.exports = { getPopulateFromSchema, createPopulatedController };
