import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/Product.js';
import User from '../src/models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const sampleUsers = [
    { name: 'Harry', email: 'harry@shop.com', password: 'Will4294!', telephone: 447939420726 },
    { name: 'Mia', email: 'mia@shop.com', password: 'Australia1', telephone: 447388321530 },
];

const sampleProducts = [
    {
        name: 'RTX 4080',
        slug: 'rtx-4080',
        brand: 'NVIDIA',
        category: 'GPU',
        price: 1199,
        specs: { vram: '16GB', interface: 'PCIe 4.0' },
        images: ['/images/rtx4080.png']
    },
    {
        name: 'Ryzen 9 7950X',
        slug: 'ryzen-9-7950x',
        brand: 'AMD',
        category: 'CPU',
        price: 699,
        specs: { cores: '16', threads: '32' },
        images: ['/images/7950x.png']
    }
];

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    // Wipe Existing
    await User.deleteMany();
    await Product.deleteMany();

    // Insert Fresh
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Seeded ${createdUsers.length} users`);

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${createdProducts.length} products`);

    mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});

