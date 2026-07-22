const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

const products = [
  {
    barcode: '885012300001',
    name: 'Coca-Cola Bottle',
    material: 'Plastic',
    category: 'Beverage',
    points: 10
  },
  {
    barcode: '885012300002',
    name: 'Pepsi Can',
    material: 'Metal',
    category: 'Beverage',
    points: 15
  },
  {
    barcode: '8850051006207',
    name: 'Plastic Water Bottle',
    material: 'Plastic',
    category: 'Beverage',
    points: 20
  },
  {
    barcode: '885012300004',
    name: 'Cardboard Box',
    material: 'Cardboard',
    category: 'Other',
    points: 5
  },
  {
    barcode: '885012300005',
    name: 'Newspaper',
    material: 'Paper',
    category: 'Other',
    points: 8
  },
  {
    barcode: '885012300006',
    name: 'Sprite Bottle',
    material: 'Plastic',
    category: 'Beverage',
    points: 10
  },
  {
    barcode: '885012300007',
    name: 'Beer Bottle',
    material: 'Glass',
    category: 'Beverage',
    points: 20
  },
  {
    barcode: '885012300008',
    name: 'Juice Carton',
    material: 'Cardboard',
    category: 'Beverage',
    points: 7
  }
];

const users = [
  {
    name: 'John Doe',
    phone: '0812345678',
    totalPoints: 0
  },
  {
    name: 'Jane Smith',
    phone: '0887654321',
    totalPoints: 0
  },
  {
    name: 'Test User',
    phone: '0811111111',
    totalPoints: 0
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    // Insert users
    const insertedUsers = await User.insertMany(users);
    console.log(`Inserted ${insertedUsers.length} users`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample Products:');
    insertedProducts.forEach(p => {
      console.log(`  - ${p.barcode}: ${p.name} (${p.material}) - ${p.points} points`);
    });
    console.log('\nSample Users:');
    insertedUsers.forEach(u => {
      console.log(`  - ${u.name}: ${u.phone}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
