const request = require("supertest");
let server; // bu portni eshitishni boshlaydi.
const { Category } = require("../../models/category");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

describe("/api/categories", () => {
  beforeEach(async () => {
    server = await require("../../index");
  });

  afterEach(async () => {
    await server.close();
    await Category.deleteMany({}); // Bu barcha yozuvlarni o'chirib tashlaydi
  });

  describe("GET /", () => {
    it("should return all categories", async () => {
      // databesega insert qiladigan kodni yozamiz
      await Category.collection.insertMany([
        { name: "dasturlash" },
        { name: "tarmoqlash" },
        { name: "dizayn" },
      ]); // bu metod bizga bir necha hujjatni bir vaqtda databasega qo`shish imkonini beradi.

      const responce = await request(server).get("/api/categories");
      expect(responce.status).toBe(200);
      expect(responce.body.length).toBe(3);
      expect(
        responce.body.some((cat) => cat.name == "dasturlash")
      ).toBeTruthy();
    });
  });

  describe("GET/:id", () => {
    it("should return a category if valid id is given", async () => {
      // bitta categoriya bo`lgani uchun insertmany bilan emas, boshqa yo`l  bilan qo`shamiz.
      const category = new Category({ name: "sun'iy idrok" });
      await category.save();
      //categoriyani bazaga qo`shib qo`ydik. endpointga get so`rovini jo`natishimiz kerak.

      const response = await request(server).get(
        "/api/categories/" + category._id
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "sun'iy idrok");
    });
    it("should return 404 if invalid id is given", async () => {
      const response = await request(server).get("/api/categories/123");
      expect(response.status).toBe(404);
    });
    it("should return 404 no category with the passed id exist", async () => {
      const categoryId = new mongoose.Types.ObjectId(); 
      const response = await request(server).get("/api/categories/" + categoryId);
      expect(response.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;
    //testlar uchun ishlatiladigan funksiyalar bu yerda olingan
    //aniqlab olamiz va uni har bir test uchun alohida chaqiramiz.

    const execute = async () => {
      return await request(server)
        .post("/api/categories")
        .set("x-auth-token", token)
        .send([name]);
    };
    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'dasturlash';
    })
    it('should return 401 if user is not logged in', async () => {
      token = '';
      const res = await execute();
      expect(res.status).toBe(400);
    });
    it('should return 400 if category is less then 3 characters', async () => {
      name = '12';
      const res = await execute();
      expect(res.status).toBe(400);
    });
    it('should return 400 if category is more then 50 characters', async () => {
      name = new Array(55).join('c');
      const res = await execute();
      expect(res.status).toBe(400);
    }); 
    it('should save the category if it is valid', async () => {
      await execute();
      const category = await Category.find({name: 'dasturlash'});
      expect(category).not.toBeNull();
    });
    it('should return the category if it is valid', async () => {
      const res = await execute();
      // expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'dasturlash');
    });
  });
});
