import User from "../models/userModel.js";
import apiFeatures from "../utils/apiFeatures.js";
import mongoose from "mongoose";

export const getUsers = async (req, res, next) => {
  try {
    let query = User.find();

    query = apiFeatures.search(query, req.query.search);

    query = apiFeatures.filter(query, req.query);

    const totalCount = await User.countDocuments(query.getQuery());

    query = apiFeatures.sort(query, req.query.sort);

    query = apiFeatures.limitFields(query, req.query.fields);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    query = apiFeatures.paginate(query, page, limit);

    const users = await query;

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        total: totalCount,
        limit,
        page,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
      data: users,
    });
  } catch (error) {
    next(error);
  }
};


export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const seedUsers = async (req, res, next) => {
  try {
    const count = parseInt(req.query.count) || 50;

    // Generate random users
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

    await User.deleteMany({}); // Clear existing users
    await User.insertMany(users);

    res.status(200).json({
      success: true,
      count: users.length,
      message: `Successfully seeded ${users.length} users`,
    });
  } catch (error) {
    next(error);
  }
};
