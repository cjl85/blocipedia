const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {

  getAllWikis(callback){
    return Wiki.all()

    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getWiki(id, callback){
      return Wiki.findById(id)
      .then((wiki) => {
          callback(null, wiki);
      })
      .catch((err) => {
          callback(err);
      })
  },

  addWiki(newWiki, callback){
      return Wiki.create({
          title: newWiki.title,
          body: newWiki.body,
          userId: newWiki.userId
      })
      .then((wiki) => {
          callback(null, wiki);
      })
      .catch((err) => {
          callback(err);
      })
  },

  updateWiki(id, updatedWiki, callback){
      return Wiki.findById(id)
      .then((wiki) => {
          if(!wiki){
              return callback("Wiki not found");
          }

          wiki.update(updatedWiki, {
              fields: Object.keys(updatedWiki)
          })
          .then(() => {
              callback(null, wiki);
          })
          .catch((err) => {
              callback(err);
          });
      });
  },

  deleteWiki(id, callback){
      return Wiki.destroy({
          where: {id}
      })
      .then((wiki) => {
          callback(null, wiki);
      })
      .catch((err) => {
          callback(err);
      })
  }
}
