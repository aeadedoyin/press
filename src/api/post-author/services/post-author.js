'use strict';

/**
 * post-author service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post-author.post-author');
