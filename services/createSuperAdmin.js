import mongoose from 'mongoose';
import Admin from '../models/admin.model.js';
import hashPassword from '../middleware/hashPassword.js';

const createSuperAdmin = async () => {
  const email = 'superadmin@example.com';
  const password = 'superadmin123'; // Change this to a secure password

  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Check if super admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Super admin already exists.');
      return;
    }

    // Encrypt password
    const encryptedPassword = await hashPassword.encrypt(password);

    // Create super admin
    const newAdmin = new Admin({
      email,
      fullName: 'Super Admin',
      password: encryptedPassword,
      role: 'SUPER_ADMIN',
    });

    await newAdmin.save();
    console.log('Super admin created successfully.');

    // Close the database connection
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

// Execute the script
createSuperAdmin();
