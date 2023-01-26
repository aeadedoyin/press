const moment = require("moment");

module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    if (!data.postDate) {
      event.params.data.postDate = moment().format("YYYY-MM-DD");
    }
  },

  beforeUpdate(event) {
    const { data, where, select, populate } = event.params;

    if (!data.postDate) {
      event.params.data.postDate = moment().format("YYYY-MM-DD");
    }
  },
};
