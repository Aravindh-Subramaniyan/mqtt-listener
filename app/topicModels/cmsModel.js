var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CmsSchema = mongoose.Schema({ any: {}, },
{
  strict: false
});

module.exports = mongoose.model('cmsSchema', CmsSchema);