("use strict");

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const postSchema = require("../content-types/post/schema.json");
const { getPopulateFromSchema } = require("../../../helpers/populate");

module.exports = createCoreController("api::post.post", () => ({
  async find(ctx) {
    // Update query
    ctx.query.populate = "*";
    if ("category" in ctx.query) {
      ctx.query.filters = {
        postCategory: {
          slug: {
            $eq: ctx.query.category,
          },
        },
      };
    }

    // Call the default find method to get the data
    let { data, meta } = await super.find(ctx);

    // Manipulate the data before sending it back
    data.forEach((post) => {
      // Other options -> thumbnail, small, medium, large,
      post.attributes.image =
        post.attributes.featuredImage.data.attributes.formats.small.url;
      post.attributes.imageAlt =
        post.attributes.featuredImage.data.attributes.alternativeText;

      delete post.attributes.featuredImage;
      delete post.attributes.block;
    });

    // Set the response body
    return { data, meta };
  },

  async findOne(ctx) {
    // Update query
    const { id: slug } = ctx.params;
    ctx.query.populate = getPopulateFromSchema(postSchema);
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
}));
