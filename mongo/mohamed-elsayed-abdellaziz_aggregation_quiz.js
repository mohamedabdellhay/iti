/*
################################# all databases ################################
test> show dbs
admin         40.00 KiB
config        12.00 KiB
ecommerce_db  25.23 MiB
finance_db    16.16 MiB
hr_db          3.86 MiB
local         40.00 KiB
test> 
*/

/*
########################### show all databases collections ###########################

test> use ecommerce_db
switched to db ecommerce_db
ecommerce_db> show collections
categories
orders
products
reviews
users
ecommerce_db> use hr_db
switched to db hr_db
hr_db> show collections
departments
employees
projects
salaries
hr_db> use finance_db
switched to db finance_db
finance_db> show collections
accounts
branches
transactions
finance_db> 
*/

// #####################################################################################
// ################################ Section 1: Basic Aggregation #######################
// #####################################################################################

// Question 1

db.users.aggregate([
  { $match: { isActive: true } },
  { $count: "totalActiveUsers" },
]);
// [ { totalActiveUsers: 45016 } ]

// Question 2
db.orders.aggregate([
  { $group: { _id: "$status", totalamount: { $sum: "$finalAmount" } } },
  { $project: { _id: 0, status: "$_id", totalRevenue: "$totalamount" } },
  { $sort: { totalRevenue: -1 } },
]);
// [
//   { status: 'shipped', totalRevenue: 133758426 },
//   { status: 'delivered', totalRevenue: 131762106 },
//   { status: 'confirmed', totalRevenue: 131284837 },
//   { status: 'cancelled', totalRevenue: 131083671 },
//   { status: 'pending', totalRevenue: 131008763 }
// ]

// Question 3
db.products.aggregate([
  { $sort: { price: 1 } },
  { $limit: 5 },
  { $project: { _id: 0, name: 1, price: 1, categoryId: 1 } },
]);

// [
//   { name: 'Engine Oil Model S398', categoryId: 6, price: 50 },
//   { name: 'French Perfume Model S430', categoryId: 7, price: 50 },
//   { name: 'Air Filter Model J873', categoryId: 6, price: 50 },
//   { name: 'Car Battery Model A755', categoryId: 6, price: 50 },
//   { name: 'Toy Car Model H762', categoryId: 8, price: 50 }
// ]

// Question 4
// : Calculate average salary by department. Include department names by joining with departments collection.
db.employees.aggregate([
  {
    $group: {
      _id: "$departmentId",
      averageSalary: { $avg: "$salary" },
      employees: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "departments",
      localField: "_id",
      foreignField: "_id",
      as: "department",
    },
  },
  { $unwind: "$department" },
  {
    $project: {
      _id: 0,
      departmentName: "$department.name",
      averageSalary: 1,
      employeeCount: 1,
    },
  },
]);

// Question 5
// Task: Count products per category. Join with categories to show category names. Sort by count (highest first).
db.products.aggregate([
  { $group: { _id: "$categoryId", products: { $sum: 1 } } },
  {
    $lookup: {
      from: "categories",
      localField: "_id",
      foreignField: "_id",
      as: "cat",
    },
  },
  { $unwind: "$cat" },
  {
    $project: { catrgoryName: "$cat.name", productsCount: "$products", _id: 0 },
  },
]);

// ################################################################################################################
//################### Section 2: Intermediate Aggregation (4 questions × 5 points = 20 points) ####################
// ################################################################################################################

// Question 6
// Task: For each customer, show total orders, total spent, and average order value. Include customer names. Only show customers with 3+ orders.
db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$finalAmount" },
      avgOrderValue: { $avg: "$finalAmount" },
    },
  },
  { $match: { totalOrders: { $gte: 3 } } },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "customer",
    },
  },
  { $unwind: "$customer" },
  {
    $project: {
      _id: 0,
      customerName: "$customer.name",
      totalOrders: 1,
      totalSpent: 1,
      avgOrderValue: 1,
    },
  },
]);

// Question 7
// Task: Calculate monthly sales for 2023 (total revenue and order count for each month).

db.orders.aggregate([
  { $match: { year: 2023 } },
  {
    $group: {
      _id: "$month",
      totalRevenue: { $sum: "$finalAmount" },
      orderCount: { $sum: 1 },
    },
  },
  { $project: { _id: 0, month: "$_id", totalRevenue: 1, orderCount: 1 } },
  { $sort: { month: 1 } },
]);

// Question 8
// Task: Find total quantity sold and revenue for each product. Join with products and categories. Only include products with revenue > 1000.
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      totalQuantity: { $sum: "$items.quantity" },
      totalRevenue: { $sum: "$items.total" },
    },
  },
  { $match: { totalRevenue: { $gt: 1000 } } },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product",
    },
  },
  { $unwind: "$product" },
  {
    $lookup: {
      from: "categories",
      localField: "product.categoryId",
      foreignField: "_id",
      as: "cat",
    },
  },
  { $unwind: "$cat" },
  {
    $project: {
      _id: 0,
      productName: "$product.name",
      categoryName: "$category.name",
      totalQuantity: 1,
      totalRevenue: 1,
    },
  },
]);
