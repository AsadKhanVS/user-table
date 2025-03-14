import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js"; // Adjust the path based on your structure

dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    const count = 50; // Change this if needed
    const users = [];
    const roles = ["user", "admin", "editor"];
    const statuses = ["active", "inactive", "pending"];

    for (let i = 0; i < count; i++) {
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      users.push({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: randomRole,
        status: randomStatus,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
        bio: `This is a bio for User ${i + 1}`,
        location: `Location ${i + 1}`,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 10000000000)
        ),
      });
    }

    await User.deleteMany({});
    await User.insertMany(users);

    console.log(`Successfully seeded ${users.length} users`);
    process.exit(); // Exit after completion
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};

// Run seeding process
connectDB().then(seedUsers);
