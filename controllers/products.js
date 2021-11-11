const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // select certain fields
  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const totalRecords = await Product.countDocuments();

  const products = await result;

  const totalPages = Math.ceil(totalRecords / limit);
  const hasMore = page < totalPages;
  res.status(200).json({
    products,
    nbHits: products.length,
    totalResults: totalRecords,
    page,
    totalPages,
    hasMore,
  });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
