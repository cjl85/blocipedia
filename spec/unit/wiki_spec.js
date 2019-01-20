const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("Topic", ()=>{

	beforeEach((done) => {

     this.topic;
     this.user;

     sequelize.sync({force: true}).then((res) => {

       User.create({
       	 username: "dog",
         email: "user@example.com",
         password: "1234567890",
         role: "member"
       })
       .then((user) => {
         this.user = user; //store the user
         Wiki.create({
          title: "JavaScript" ,
          body: "JS frameworks and fundamentals",
          userId: user.id
         })
         .then((wiki) => {
           this.wiki = wiki;
           done();
         })
       })
     });
    });

	describe("#create()",()=>{
		it("should create a wiki object and store it in the database",(done)=>{
			Wiki.create({
				title: "Created wiki",
				body: "Created wiki description"
			})
			.then((newWiki)=>{
				expect(newWiki.title).toBe("Created wiki");
				expect(newWiki.body).toBe("Created wiki description");
				done();
			})
			.catch((err)=>{
				expect(err).toBeNull();
				console.log(err);
				done();
			});
		});

		it("should not create a wiki without a description", (done) =>{
			Wiki.create({
				title:"Wiki without a description"
			})
			.then((newWiki)=>{
				done();
				//since the code will go to the error, let's catch the error
			})
			.catch((err)=>{
				expect(err.message).toContain("Wiki.body cannot be null");
				done();
			})
		});
	});

});
