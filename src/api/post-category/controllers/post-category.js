"use strict";

/**
 * post-category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::post-category.post-category",
  () => ({
    async findOne(ctx) {
      // Update query
      const { id: slug } = ctx.params;
      ctx.query.filters = {
        slug: {
          $eq: slug,
        },
      };

      // Call the default find method to get the data
      // and get one since the original scope is findOne
      let { data } = await super.find(ctx);
      if (data.length > 0) {
        data = data[0];
      } else {
        return ctx.notFound();
      }

      // Set the response body
      return { data };
    },
  })
);
