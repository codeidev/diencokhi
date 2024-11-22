var express = require("express");
var router = express.Router();

//Imort model
const connectDb = require("../model/db");
const { ObjectId } = require("mongodb");

const multer = require("multer");
//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

//Lấy tất cả banner dùng dạng json
router.get("/banners", async (req, res, next) => {
  try {
    const db = await connectDb();
    const bannerCollection = db.collection("banner");
    const banners = await bannerCollection.find().toArray();

    if (banners.length > 0) {
      res.status(200).json(banners);
    } else {
      res.status(404).json({ message: "Không tìm thấy banner" });
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu banner:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
//Lấy tất cả banks dùng dạng json
router.get("/banks", async (req, res, next) => {
  try {
    const db = await connectDb();
    const bankCollection = db.collection("banks"); // Thay đổi tên collection thành "banks"
    const banks = await bankCollection.find().toArray(); // Tìm tất cả dữ liệu trong collection "banks"

    if (banks.length > 0) {
      res.status(200).json(banks);
    } else {
      res.status(404).json({ message: "Không tìm thấy ngân hàng" }); // Cập nhật thông báo
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu ngân hàng:", error); // Cập nhật log
    res.status(500).json({ message: "Lỗi server" });
  }
});
//Lấy tất cả người dùng dạng json
router.get("/users", async (req, res, next) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("users");
    const users = await userCollection.find().toArray();

    // Trả về mảng rỗng nếu không có người dùng
    res.status(200).json(users);
  } catch (error) {
    // Xử lý lỗi kết nối hoặc truy vấn
    console.error("Lỗi khi lấy người dùng:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy người dùng." });
  }
});

//Lấy tất cả danh mục dạng json
router.get("/categories", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories");
  const categories = await categoryCollection.find().toArray();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});
//Lấy tất cả danh mục dạng json
router.get("/categories1", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories1");
  const categories = await categoryCollection.find().toArray();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});
//Lấy tất cả danh mục dạng json
router.get("/categories2", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories2");
  const categories = await categoryCollection.find().toArray();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});
//Lấy tất cả danh mục dạng json
router.get("/categories3", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories3");
  const categories = await categoryCollection.find().toArray();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});
//lấy tất cả danh mục link dạng json
// Lấy tất cả danh mục với category1 là mảng
router.get("/categories", async (req, res, next) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection("categories");
    const categories = await categoryCollection
      .find({
        category1: { $type: "array" }, // Lọc chỉ những danh mục có category1 là mảng
      })
      .toArray();

    if (categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

//Lấy tất cả sản phẩm dạng json
router.get("/products", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection.find().toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

//testcode2410
router.get("/productstools/:category", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  const category = req.params.category;
  const products = await productCollection
    .find({ category: category })
    .toArray();

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm nào" });
  }
});

router.get("/productsAll/:category1", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  const category = req.params.category1;

  // Tìm sản phẩm có category1 chứa category tại vị trí thứ hai (index 1)
  const products = await productCollection
    .find({ "category1.1": category }) // Kiểm tra giá trị tại index 1
    .toArray();

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm nào" });
  }
});

// Lấy tất cả sản phẩm theo date dạng json
router.get("/products/date", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lấy tất cả sản phẩm và sắp xếp theo ngày giảm dần
  const products = await productCollection
    .find() // Không có điều kiện lọc
    .sort({ date: -1 }) // Sắp xếp theo ngày giảm dần
    .toArray(); // Chuyển đổi thành mảng

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});
// Lấy tất cả sản phẩm kiến trúc theo date dạng json
router.get("/products/ktdate", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo ngày giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Kiến trúc"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ date: -1 })
    .toArray(); // Sắp xếp theo ngày giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});
// Lấy tất cả sản phẩm kiến trúc theo lượt xem dạng json
router.get("/products/ktview", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo lượt xem giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Kiến trúc"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ view: -1 })
    .toArray(); // Sắp xếp theo lượt xem giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

// Lấy tất cả sản phẩm kiến trúc theo lượt tải dạng json
// Lấy tất cả sản phẩm dạng json
router.get("/products/ktdownload", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo lượt tải giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Kiến trúc"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ download: -1 })
    .toArray(); // Sắp xếp theo lượt tải giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

// Lấy tất cả sản phẩm chuyên ngành theo date dạng json
router.get("/products/cndate", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo ngày giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Chuyên ngành"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ date: -1 })
    .toArray(); // Sắp xếp theo ngày giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});
// Lấy tất cả sản phẩm chuyên ngành theo lượt xem dạng json
router.get("/products/cnview", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo lượt xem giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Chuyên ngành"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ view: -1 })
    .toArray(); // Sắp xếp theo lượt xem giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

// Lấy tất cả sản phẩm chuyên ngành theo lượt tải dạng json
router.get("/products/cndownload", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo lượt tải giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Chuyên ngành"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ download: -1 })
    .toArray(); // Sắp xếp theo lượt tải giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});
// Lấy tất cả sản phẩm Đồ án - Luận văn theo date dạng json
router.get("/products/dalvdate", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo ngày giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Đồ án - Luận văn"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ date: -1 })
    .toArray(); // Sắp xếp theo ngày giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});
// Lấy tất cả sản phẩm Đồ án - Luận văn theo lượt xem dạng json
router.get("/products/dalvview", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo lượt xem giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Đồ án - Luận văn"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ view: -1 })
    .toArray(); // Sắp xếp theo lượt xem giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

// Lấy tất cả sản phẩm Đồ án - Luận văn theo lượt tải dạng json
router.get("/products/dalvdownload", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lọc sản phẩm có category1 chứa "Kiến trúc" và sắp xếp theo lượt tải giảm dần
  const products = await productCollection
    .find({
      category1: { $in: ["Đồ án - Luận văn"] }, // Kiểm tra xem "Kiến trúc" có trong mảng không
    })
    .sort({ download: -1 })
    .toArray(); // Sắp xếp theo lượt tải giảm dần

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

//lấy tất cả sản phẩm nổi bật
router.get("/products/download", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  // Lấy 5 sản phẩm và sắp xếp theo lượt tải giảm dần
  const products = await productCollection
    .find({})
    .sort({ download: -1 })
    .limit(5) // Giới hạn kết quả về 5 sản phẩm
    .toArray(); // Chuyển đổi sang mảng

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

//tìm kiếm sản phẩm
router.get("/search/:keyword", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  const keyword = req.params.keyword.trim();

  // Kiểm tra xem keyword có phải là số hay không
  const id = isNaN(keyword) ? null : parseInt(keyword, 10);

  // Tạo điều kiện tìm kiếm
  const searchConditions = {
    $or: [
      { name: new RegExp(keyword, "i") }, // Tìm kiếm theo name (theo ký tự)
      ...(id !== null ? [{ id: id }] : []), // Tìm kiếm theo id nếu keyword là số
    ],
  };

  // Tìm kiếm sản phẩm
  const products = await productCollection.find(searchConditions).toArray();

  // Kiểm tra và trả về sản phẩm
  if (products.length === 0) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm nào" });
  }

  res.status(200).json(products);
});

//Thêm danh mục
router.post("/addcategory", upload.single("image"), async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories");
  const { name } = req.body;
  let lastCategory = await categoryCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastCategory[0] ? lastCategory[0].id + 1 : 1;
  let newCategory = { id, name };
  try {
    const result = await categoryCollection.insertOne(newCategory);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});
//Sửa danh mục
router.put(
  "/updatecategory/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      let id = req.params.id;
      const db = await connectDb();
      const categoryCollection = db.collection("categories");
      let { name } = req.body;
      let editCategory = { name };
      category = await categoryCollection.updateOne(
        { id: parseInt(id) },
        { $set: editCategory }
      );
      if (category) {
        res.status(200).json(editCategory);
      } else {
        res.status(404).json({ message: "Không thêm được" });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//Xóa danh mục
router.delete("/deletecategory/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories");
  const id = new ObjectId(req.params.id);
  try {
    const result = await categoryCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
//Thêm danh mục
router.post("/addcategory1", upload.single("image"), async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories1");
  const { name } = req.body;
  let lastCategory = await categoryCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastCategory[0] ? lastCategory[0].id + 1 : 1;
  let newCategory = { id, name };
  try {
    const result = await categoryCollection.insertOne(newCategory);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});
//Sửa danh mục
router.put(
  "/updatecategory1/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      let id = req.params.id;
      const db = await connectDb();
      const categoryCollection = db.collection("categories1");
      let { name } = req.body;
      let editCategory = { name };
      category = await categoryCollection.updateOne(
        { id: parseInt(id) },
        { $set: editCategory }
      );
      if (category) {
        res.status(200).json(editCategory);
      } else {
        res.status(404).json({ message: "Không thêm được" });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//Xóa danh mục
router.delete("/deletecategory1/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories1");
  const id = new ObjectId(req.params.id);
  try {
    const result = await categoryCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
//Thêm danh mục
router.post("/addcategory2", upload.single("image"), async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories2");
  const { name } = req.body;
  let lastCategory = await categoryCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastCategory[0] ? lastCategory[0].id + 1 : 1;
  let newCategory = { id, name };
  try {
    const result = await categoryCollection.insertOne(newCategory);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});
//Sửa danh mục
router.put(
  "/updatecategory2/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      let id = req.params.id;
      const db = await connectDb();
      const categoryCollection = db.collection("categories2");
      let { name } = req.body;
      let editCategory = { name };
      category = await categoryCollection.updateOne(
        { id: parseInt(id) },
        { $set: editCategory }
      );
      if (category) {
        res.status(200).json(editCategory);
      } else {
        res.status(404).json({ message: "Không thêm được" });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//Xóa danh mục
router.delete("/deletecategory2/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories2");
  const id = new ObjectId(req.params.id);
  try {
    const result = await categoryCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
//Thêm danh mục
router.post("/addcategory3", upload.single("image"), async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories3");
  const { name } = req.body;
  let lastCategory = await categoryCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastCategory[0] ? lastCategory[0].id + 1 : 1;
  let newCategory = { id, name };
  try {
    const result = await categoryCollection.insertOne(newCategory);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});
//Sửa danh mục
router.put(
  "/updatecategory3/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      let id = req.params.id;
      const db = await connectDb();
      const categoryCollection = db.collection("categories3");
      let { name } = req.body;
      let editCategory = { name };
      category = await categoryCollection.updateOne(
        { id: parseInt(id) },
        { $set: editCategory }
      );
      if (category) {
        res.status(200).json(editCategory);
      } else {
        res.status(404).json({ message: "Không thêm được" });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//Xóa danh mục
router.delete("/deletecategory3/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories3");
  const id = new ObjectId(req.params.id);
  try {
    const result = await categoryCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
// //Thêm sản phẩm
router.post("/addproduct", upload.array("image"), async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");

  const {
    name,
    price,
    category,
    content,
    file,
    date,
    link = "Đang cập nhật",
    // Expecting category1 to be in the form of a JSON string that can be parsed into an array
    category1,
    view = 0,
    download = 0,
    love = 0,
    start = "5",
    comment = 0,
    engineer = "admin",
    blueprint = "Đang cập nhật...",
    voteen = "Đang cập nhật...",
    dateen = "2022-09-12",
    imgen = "logo.png",
  } = req.body;

  // Parse description and category1 from the request body
  const description = JSON.parse(req.body.description || "[]"); // Ensure it's parsed as an array
  const parsedCategory1 = JSON.parse(category1 || "[]"); // Parse category1 to ensure it's an array

  // Check if category and category1 are provided
  if (
    !category ||
    !Array.isArray(parsedCategory1) ||
    parsedCategory1.length === 0
  ) {
    return res.status(400).json({ message: "Danh mục không được để trống" });
  }

  // Prepare image names from uploaded files
  const img = req.files ? req.files.map((file) => file.originalname) : []; // img is an array

  // Get the last product ID
  let lastProduct = await productCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();

  let id = lastProduct[0] ? lastProduct[0].id + 1 : 1;

  // Create a new product object
  let newProduct = {
    id,
    name,
    price,
    category,
    img,
    description, // Use description as an array
    content,
    date,
    link,
    category1: parsedCategory1, // Use parsed category1 as an array
    file,
    view,
    download,
    love,
    start,
    comment,
    engineer,
    blueprint,
    voteen,
    dateen,
    imgen,
  };

  try {
    const result = await productCollection.insertOne(newProduct);
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

//Sửa sản phẩm
router.put(
  "/updateproduct/:id",
  upload.array("image"),
  async (req, res, next) => {
    try {
      let id = req.params.id;
      const db = await connectDb();
      const productCollection = db.collection("products");
      let { name, price, category, content, file, date, link, category1 } =
        req.body;
      const description = JSON.parse(req.body.description || "[]");
      const parsedCategory1 = JSON.parse(category1 || "[]");
      const removedFiles = JSON.parse(req.body.removedFiles || "[]"); // Parse removed files

      if (
        !category ||
        !Array.isArray(parsedCategory1) ||
        parsedCategory1.length === 0
      ) {
        return res
          .status(400)
          .json({ message: "Danh mục không được để trống" });
      }

      // Retrieve the old product information from the database
      let product = await productCollection.findOne({ id: parseInt(id) });
      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
      }

      // Get the new images from the uploaded files
      let newImages = req.files
        ? req.files.map((file) => file.originalname)
        : [];

      // Nếu có hình ảnh mới, thay thế hoàn toàn mảng hình ảnh cũ
      let updatedImages = newImages.length > 0 ? newImages : product.img; // Nếu không có hình ảnh mới, giữ lại hình ảnh cũ

      // Kiểm tra và loại bỏ các hình ảnh đã xóa (nếu có)
      if (Array.isArray(removedFiles) && removedFiles.length > 0) {
        updatedImages = updatedImages.filter(
          (img) => !removedFiles.includes(img)
        );
      }

      // Create the product object to update
      const editProduct = {
        name: name || product.name,
        price: price || product.price,
        category: category || product.category,
        img: updatedImages, // Sử dụng danh sách hình ảnh đã cập nhật
        description,
        content: content || product.content,
        date: date || product.date,
        link: link || "Đang cập nhật",
        category1:
          parsedCategory1.length > 0 ? parsedCategory1 : product.category1,
        file: file || product.file,
      };

      const result = await productCollection.updateOne(
        { id: parseInt(id) },
        { $set: editProduct }
      );

      if (result.modifiedCount > 0) {
        res.status(200).json(editProduct);
      } else {
        res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm để cập nhật." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Đã xảy ra lỗi trên server." });
    }
  }
);
//Xóa sản phẩm
router.delete("/deleteproduct/:id", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const id = new ObjectId(req.params.id);
  try {
    const result = await productCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

//Thêm người dùng
router.post("/adduser", upload.single("image"), async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("users");

  const {
    name,
    fullname,
    email,
    phone,
    address,
    gender,
    role,
    comment = 0,
  } = req.body;

  // Validate required fields
  if (!name || !fullname || !email || !phone || !gender || !address) {
    return res.status(400).json({ message: "Người dùng không được để trống" });
  }

  const img = req.file ? req.file.originalname : null; // Check if there is an image
  let lastUser = await userCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();

  let id = lastUser[0] ? lastUser[0].id + 1 : 1;
  let newUser = {
    id,
    name,
    fullname,
    email,
    phone,
    gender,
    address,
    role,
    img,
    comment,
  };

  try {
    const result = await userCollection.insertOne(newUser);
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm người dùng thành công" });
    } else {
      res.status(500).json({ message: "Thêm người dùng thất bại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

//Xóa người dùng
router.delete("/deleteuser/:id", async (req, res) => {
  const db = await connectDb(); // Connect to the database
  const userCollection = db.collection("users"); // Reference the users collection
  const id = req.params.id; // Get the user ID from the request parameters

  // Validate the ID format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" }); // Invalid ID format
  }

  try {
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) }); // Attempt to delete the user
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa người dùng thành công" }); // Successful deletion
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" }); // User not found
    }
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // General error message
  }
});

//Sửa người dùng
router.patch("/changePassword/:id", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = parseInt(req.params.id); // Lấy ID từ params

  try {
    console.log("Request Body:", req.body);
    const db = await connectDb();
    const userCollection = db.collection("users");

    // Tìm người dùng theo ID
    const user = await userCollection.findOne({ id: userId });
    console.log("Found User:", user);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng." });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    const updateResult = await userCollection.updateOne(
      { id: userId },
      { $set: { password: hashedPassword } }
    );

    console.log("Update Result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "Không có thay đổi nào được thực hiện." });
    }

    res.status(200).json({ message: "Mật khẩu đã được đổi thành công!" });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình cập nhật." });
  }
});

//Đổi mật khẩu user
router.patch("/changePassword", async (req, res) => {
  const { currentPassword, newPassword, id } = req.body;

  try {
    console.log("Request Body:", req.body); // Log thông tin yêu cầu
    const db = await connectDb();
    const userCollection = db.collection("users");

    // Chuyển đổi ID thành số
    const userId = parseInt(id);
    console.log("User ID:", userId);

    // Tìm người dùng theo ID
    const user = await userCollection.findOne({ id: userId });
    console.log("Found User:", user); // Log thông tin người dùng tìm thấy

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng." });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    const updateResult = await userCollection.updateOne(
      { id: userId },
      { $set: { password: hashedPassword } }
    );

    console.log("Update Result:", updateResult); // Log kết quả cập nhật

    if (updateResult.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "Không có thay đổi nào được thực hiện." });
    }

    res.status(200).json({ message: "Mật khẩu đã được đổi thành công!" });
  } catch (error) {
    console.error("Error occurred:", error); // Log lỗi
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình cập nhật." });
  }
});

//Thêm banner
router.post("/addbanner", upload.single("image"), async (req, res) => {
  const db = await connectDb();
  const userCollection = db.collection("banner");

  // Check if an image was uploaded
  const img = req.file ? req.file.originalname : null;
  if (!img) {
    return res.status(400).json({ message: "Hình ảnh là bắt buộc" });
  }

  try {
    // Get the last banner to generate a new ID
    const lastBanner = await userCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const id = lastBanner.length > 0 ? lastBanner[0].id + 1 : 1;
    const newBanner = { id, img };

    // Insert the new banner
    const result = await userCollection.insertOne(newBanner);
    if (result.insertedId) {
      res.status(201).json({ message: "Thêm banner thành công" });
    } else {
      res.status(500).json({ message: "Thêm banner thất bại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

//Xóa banner
router.delete("/deletebanner/:id", async (req, res) => {
  const db = await connectDb(); // Connect to the database
  const userCollection = db.collection("banner"); // Reference the banner collection
  const id = req.params.id; // Get the banner ID from the request parameters

  // Validate the ID format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" }); // Invalid ID format
  }

  try {
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) }); // Attempt to delete the banner
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Xóa banner thành công" }); // Successful deletion
    } else {
      res.status(404).json({ message: "Không tìm thấy banner" }); // Banner not found
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // General error message
  }
});

//sửa banner
router.put(
  "/updatebanner/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      let id = req.params.id;
      const db = await connectDb();
      const productCollection = db.collection("banner");
      if (req.file) {
        var img = req.file.originalname;
      } else {
        let product = await productCollection.findOne({ id: parseInt(id) });
        var img = product.img;
      }
      let editProduct = { img };
      product = await productCollection.updateOne(
        { id: parseInt(id) },
        { $set: editProduct }
      );
      if (product) {
        res.status(200).json(editProduct);
      } else {
        res.status(404).json({ message: "Không thêm được" });
      }
    } catch (error) {
      console.log(error);
    }
  }
);
// Thêm bank
router.post("/addbank", upload.single("image"), async (req, res) => {
  const db = await connectDb();
  const userCollection = db.collection("banks");

  // Check if an image was uploaded
  const img = req.file ? req.file.originalname : null;
  if (!img) {
    return res.status(400).json({ message: "Hình ảnh là bắt buộc" });
  }

  try {
    // Get the last bank to generate a new ID
    const lastBank = await userCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const id = lastBank.length > 0 ? lastBank[0].id + 1 : 1;
    const newBank = { id, img };

    // Insert the new bank
    const result = await userCollection.insertOne(newBank);
    if (result.insertedId) {
      res.status(201).json({ message: "Thêm bank thành công" });
    } else {
      res.status(500).json({ message: "Thêm bank thất bại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// Xóa bank
router.delete("/deletebank/:id", async (req, res) => {
  const db = await connectDb(); // Connect to the database
  const userCollection = db.collection("banks"); // Reference the bank collection
  const id = req.params.id; // Get the bank ID from the request parameters

  // Validate the ID format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" }); // Invalid ID format
  }

  try {
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) }); // Attempt to delete the bank
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Xóa bank thành công" }); // Successful deletion
    } else {
      res.status(404).json({ message: "Không tìm thấy bank" }); // Bank not found
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // General error message
  }
});

// Sửa bank
router.put("/updatebank/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const db = await connectDb();
    const bankCollection = db.collection("banks");
    let img;

    if (req.file) {
      img = req.file.originalname;
    } else {
      const bank = await bankCollection.findOne({ id: parseInt(id) });
      img = bank.img; // Use existing image if none is uploaded
    }

    const editBank = { img };
    const result = await bankCollection.updateOne(
      { id: parseInt(id) },
      { $set: editBank }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json(editBank);
    } else {
      res.status(404).json({ message: "Không cập nhật được" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

//API đăng kí
//Đăng ký tài khoản với mã hóa mật khẩu bcrypt
const bcrypt = require("bcryptjs");

router.post("/register", upload.single("img"), async (req, res) => {
  const db = await connectDb();
  const userCollection = db.collection("users");
  const { email, password, fullname, name, phone, gender, address } = req.body;
  const img = req.file ? req.file.originalname : null; // Lấy tên file

  console.log("Tệp nhận được:", req.file); // In ra tệp nhận được

  if (!img) {
    return res.status(400).json({ message: "Hình ảnh là bắt buộc" });
  }

  let lastUser = await userCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastUser[0] ? lastUser[0].id + 1 : 1;

  const user = await userCollection.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id,
      email,
      password: hashPassword,
      role: "User",
      comment: 0,
      fullname,
      name,
      phone,
      gender,
      img,
      address,
    };

    try {
      const result = await userCollection.insertOne(newUser);
      if (result.insertedId) {
        res.status(200).json({ message: "Đăng ký thành công" });
      } else {
        res.status(500).json({ message: "Đăng ký thất bại" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
  }
});

//Đăng nhập
const jwt = require("jsonwebtoken");
router.post("/login", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("users");
  const { email, password } = req.body;
  const user = await userCollection.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Mật khẩu không chính xác" });
  }
  const token = jwt.sign({ email: user.email, role: user.role }, "secret", {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
});
//
//Token
//Kiểm tra token qua Bearer

router.get("/checktoken", async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    res.status(200).json({ message: "Token hợp lệ" });
  });
});

//lấy thông tin chi tiết user qua token
router.get("/detailuser", async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    const db = await connectDb();
    const userCollection = db.collection("users");
    const userInfo = await userCollection.findOne({ email: user.email });
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "Không tìm thấy user" });
    }
  });
});

router.patch("/usersnewpass/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const db = await connectDb();
    const userCollection = db.collection("users");

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    const result = await userCollection.updateOne(
      { _id: new ObjectId(id) }, // Make sure to use ObjectId
      { $set: { password: hashedPassword } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "Cập nhật mật khẩu thất bại." });
    }

    res.status(200).json({ message: "Cập nhật mật khẩu thành công." });
  } catch (error) {
    console.error("Lỗi khi cập nhật mật khẩu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật mật khẩu." });
  }
});

// Lấy người dùng chi tiết dạng json
router.get("/users/:id", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("users");
  let id = req.params.id;
  const users = await userCollection.findOne({ id: parseInt(id) });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// Lấy danh mục chi tiết dạng json
router.get("/categoriesdetail/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories");
  let id = req.params.id;
  const categories = await categoryCollection.findOne({ id: parseInt(id) });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});
// Lấy danh mục chi tiết dạng json
router.get("/categoriesdetail1/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories1");
  let id = req.params.id;
  const categories = await categoryCollection.findOne({ id: parseInt(id) });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});
// Lấy danh mục chi tiết dạng json
router.get("/categoriesdetail2/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories2");
  let id = req.params.id;
  const categories = await categoryCollection.findOne({ id: parseInt(id) });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});
// Lấy danh mục chi tiết dạng json
router.get("/categoriesdetail3/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("categories3");
  let id = req.params.id;
  const categories = await categoryCollection.findOne({ id: parseInt(id) });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});
// Lấy banner chi tiết dạng json
router.get("/bannerdetail/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("banner");
  let id = req.params.id;
  const categories = await categoryCollection.findOne({ id: parseInt(id) });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});
// Lấy bank chi tiết dạng json
router.get("/bankdetail/:id", async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection("banks");
  let id = req.params.id;
  const categories = await categoryCollection.findOne({ id: parseInt(id) });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

//bình luận
router.get("/comments", async (req, res) => {
  try {
    const db = await connectDb(); // Kết nối đến cơ sở dữ liệu
    const commentsCollection = db.collection("comments"); // Lấy collection comments
    const comments = await commentsCollection.find().toArray(); // Lấy tất cả bình luận

    if (comments.length > 0) {
      res.status(200).json(comments); // Trả về bình luận nếu có
    } else {
      res.status(404).json({ message: "Không tìm thấy bình luận" }); // Thông báo nếu không có bình luận
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu bình luận:", error); // Ghi log lỗi
    res.status(500).json({ message: "Lỗi server" }); // Thông báo lỗi server
  }
});
// Lấy tất cả bình luận dạng JSON
router.get("/comments", async (req, res, next) => {
  const db = await connectDb();
  const commentCollection = db.collection("comments");

  try {
    const comments = await commentCollection.find().toArray();
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "Không tìm thấy bình luận" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
router.post("/comments", async (req, res) => {
  const { comment, author, date, img } = req.body;

  try {
    const db = await connectDb(); // Kết nối đến cơ sở dữ liệu
    const commentsCollection = db.collection("comments"); // Lấy collection comments

    // Lấy ID cuối cùng từ collection comments
    let lastComment = await commentsCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    let id = lastComment[0] ? lastComment[0].id + 1 : 1; // Tạo ID mới

    // Tạo một bình luận mới với ID
    const newComment = {
      id, // Thêm ID vào bình luận
      comment,
      author,
      date,
      img,
    };

    // Thêm bình luận mới vào cơ sở dữ liệu
    await commentsCollection.insertOne(newComment);

    res.status(201).json(newComment); // Trả về bình luận mới
  } catch (error) {
    console.error("Error adding comment:", error); // Ghi log lỗi
    res.status(500).json({ message: "Lỗi server" }); // Thông báo lỗi server
  }
});
router.delete("/deletecomment/:id", async (req, res, next) => {
  const db = await connectDb();
  const commentCollection = db.collection("comments");
  const id = new ObjectId(req.params.id);

  try {
    const result = await commentCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa bình luận thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy bình luận" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
router.patch("/products/:id/comments", async (req, res) => {
  const { commentId } = req.body; // Nhận ID bình luận từ body

  try {
    const db = await connectDb(); // Kết nối đến cơ sở dữ liệu
    const productCollection = db.collection("products"); // Lấy collection products

    const id = parseInt(req.params.id); // Lấy ID sản phẩm từ URL

    // Tìm sản phẩm theo ID
    const product = await productCollection.findOne({ id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Cập nhật trường comment trong sản phẩm
    const updatedComments = [...(product.comment || []), commentId];

    await productCollection.updateOne(
      { id: id },
      { $set: { comment: updatedComments } } // Cập nhật trường comment
    );

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating comment:", error); // Ghi log lỗi
    res.status(500).json({ message: "Lỗi server" }); // Thông báo lỗi server
  }
});

// API lấy bình luận theo ID sản phẩm
router.get("/product/:id/comments", async (req, res) => {
  try {
    const db = await connectDb(); // Kết nối đến cơ sở dữ liệu
    const productCollection = db.collection("products"); // Lấy collection products
    const commentsCollection = db.collection("comments"); // Lấy collection comments

    const id = parseInt(req.params.id);

    // Tìm sản phẩm theo ID
    const product = await productCollection.findOne({ id: id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Found product:", product); // Log thông tin sản phẩm

    // Kiểm tra trường comment trong sản phẩm
    if (!Array.isArray(product.comment) || product.comment.length === 0) {
      return res
        .status(200)
        .json({ message: "No comments found for this product" });
    }

    // Lấy tất cả bình luận tương ứng với ID trong mảng comment
    const commentIds = product.comment.map((id) => {
      // Kiểm tra xem id có phải là số hay không
      if (typeof id === "number") {
        return id; // Nếu là số, sử dụng trực tiếp
      } else {
        return new ObjectId(id); // Nếu là chuỗi, chuyển đổi thành ObjectId
      }
    });

    // Lấy bình luận từ collection comments
    const comments = await commentsCollection
      .find({
        id: { $in: commentIds },
      })
      .toArray();

    res.status(200).json({
      product: product,
      comments: comments,
    });
  } catch (error) {
    console.error("Error fetching product comments:", error); // Log lỗi để kiểm tra
    res.status(500).json({ message: "Server error", error: error.message }); // Thông báo lỗi server
  }
});
// Lấy tất cả phiếu bầu dạng JSON
router.get("/votes", async (req, res, next) => {
  const db = await connectDb();
  const voteCollection = db.collection("votes");

  try {
    const votes = await voteCollection.find().toArray();
    if (votes.length > 0) {
      res.status(200).json(votes);
    } else {
      res.status(404).json({ message: "Không tìm thấy phiếu bầu" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
router.post("/votes", async (req, res) => {
  const { name, stars } = req.body; // Sử dụng userId thay vì id để rõ ràng hơn

  try {
    const db = await connectDb(); // Kết nối đến cơ sở dữ liệu
    const votesCollection = db.collection("votes"); // Lấy collection votes

    // Lấy ID cuối cùng từ collection votes
    const lastVote = await votesCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const newId = lastVote[0] ? lastVote[0].id + 1 : 1; // Tạo ID mới

    // Tạo một đối tượng đánh giá mới
    const newVote = {
      id: newId,
      name, // Tên người dùng
      stars, // Số sao đã chọn
    };

    // Thêm đánh giá mới vào cơ sở dữ liệu
    await votesCollection.insertOne(newVote);

    res
      .status(201)
      .json({ message: "Đánh giá đã được lưu thành công", vote: newVote });
  } catch (error) {
    console.error("Error saving vote:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.delete("/deletevote/:id", async (req, res, next) => {
  const db = await connectDb();
  const voteCollection = db.collection("votes");
  const id = new ObjectId(req.params.id);
  try {
    const result = await voteCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa bỏ phiếu thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy phiếu bầu" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// API cập nhật đánh giá cho sản phẩm
router.patch("/products/:id/starts", async (req, res) => {
  const { voteId } = req.body; // Nhận ID đánh giá từ body

  try {
    const db = await connectDb(); // Kết nối đến cơ sở dữ liệu
    const productCollection = db.collection("products"); // Lấy collection products

    const id = parseInt(req.params.id); // Lấy ID sản phẩm từ URL

    // Tìm sản phẩm theo ID
    const product = await productCollection.findOne({ id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Cập nhật trường starts trong sản phẩm
    const updatedStarts = [...(product.start || []), voteId]; // Thêm voteId vào mảng starts

    await productCollection.updateOne(
      { id: id },
      { $set: { start: updatedStarts } } // Cập nhật trường starts
    );

    res.status(200).json({ message: "Star updated successfully" });
  } catch (error) {
    console.error("Error updating star:", error); // Ghi log lỗi
    res.status(500).json({ message: "Lỗi server" }); // Thông báo lỗi server
  }
});
// API lấy đánh giá theo ID sản phẩm
router.get("/products/:id/votes", async (req, res) => {
  try {
    const db = await connectDb(); // Kết nối đến cơ sở dữ liệu
    const productCollection = db.collection("products"); // Lấy collection products
    const votesCollection = db.collection("votes"); // Lấy collection votes

    const id = parseInt(req.params.id); // Lấy ID sản phẩm từ URL

    // Tìm sản phẩm theo ID
    const product = await productCollection.findOne({ id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Found product:", product); // Log thông tin sản phẩm

    // Kiểm tra trường votes trong sản phẩm
    if (!Array.isArray(product.start) || product.start.length === 0) {
      return res
        .status(200)
        .json({ message: "No votes found for this product" });
    }

    // Lấy tất cả đánh giá tương ứng với ID trong mảng votes
    const voteIds = product.start.map((voteId) => {
      // Kiểm tra xem voteId có phải là số hay không
      if (typeof voteId === "number") {
        return voteId; // Nếu là số, sử dụng trực tiếp
      } else {
        return new ObjectId(voteId); // Nếu là chuỗi, chuyển đổi thành ObjectId
      }
    });

    // Lấy đánh giá từ collection votes
    const votes = await votesCollection
      .find({
        id: { $in: voteIds },
      })
      .toArray();

    res.status(200).json({
      product: product,
      votes: votes,
    });
  } catch (error) {
    console.error("Error fetching product votes:", error); // Log lỗi để kiểm tra
    res.status(500).json({ message: "Server error", error: error.message }); // Thông báo lỗi server
  }
});

router.get("/productsdetail/:id", async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection("products");
    let id = req.params.id;

    // Tìm sản phẩm theo ID
    const product = await productCollection.findOne({ id: parseInt(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Found product:", product); // Log sản phẩm để kiểm tra

    // Kiểm tra nếu trường img tồn tại và là một mảng
    if (!Array.isArray(product.img)) {
      return res.status(400).json({ message: "Invalid image data" });
    }

    // Tạo mảng URL cho các hình ảnh
    const imageUrls = product.img.map((img) => `${img}`); // Thêm http://localhost:3000/productsimg/ vào mỗi tên tệp

    // Trả về thông tin sản phẩm và mảng hình ảnh
    res.status(200).json({
      product: product,
      images: imageUrls,
    });
  } catch (error) {
    console.error("Error fetching product details:", error); // Log error for debugging
    res.status(500).json({ message: "Server error", error: error.message }); // Include error message for debugging
  }
});

// router.get("/productsdetail/:id", async (req, res, next) => {
//   const db = await connectDb();
//   const productCollection = db.collection("products");
//   let id = req.params.id;
//   const products = await productCollection.findOne({ id: parseInt(id) });
//   if (products) {
//     res.status(200).json(products);
//   } else {
//     res.status(404).json({ message: "Not found" });
//   }
// });

module.exports = router;
