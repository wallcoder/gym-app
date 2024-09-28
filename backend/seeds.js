
import mongoose from "mongoose"
import { Gym } from "./models/Gym.js";
import { Membership } from "./models/Gym.js";
import Subscription from "./models/Subscription.js";
import Transaction from "./models/Transaction.js";
import { User, Admin, GymAdmin } from "./models/User.js";
const db = mongoose.connect('mongodb://localhost:27017/gymApp')
    .then(() => console.log("MongoDB connected successfully..."))
    .catch(e => console.log("Error connection to DB: ", e))


// SUBSCRIPTION SEED

const seedDatabase = async () => {
    try {
      // Clear the database
      await Gym.deleteMany();
      await Membership.deleteMany();
      await Subscription.deleteMany();
      await Transaction.deleteMany();
      await User.deleteMany();
      await Admin.deleteMany();
      await GymAdmin.deleteMany();
  
      // Create subscriptions
      const subscriptions = await Subscription.insertMany([
        {
          title: 'Basic Plan',
          description: 'Access to basic features',
          price: 19.99,
        },
        {
          title: 'Premium Plan',
          description: 'Access to premium features',
          price: 39.99,
        },
      ]);
  
      // Create gyms
      const gyms = await Gym.insertMany([
        {
          gymName: 'Fitness World',
          address: {
            lat: 40.7128,
            lng: -74.0060,
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postalCode: '10001',
          },
          email: 'fitnessworld@gmail.com',
          phone: 1234567890,
          equipments: [
            { name: 'Treadmill' },
            { name: 'Dumbbells' },
          ],
          images: [{ path: '/images/gym1.jpg' }],
          subscription: {
            subscriptionId: subscriptions[0]._id,
            expireDate: new Date('2025-12-31'),
          },
        },
        {
          gymName: 'Power Gym',
          address: {
            lat: 34.0522,
            lng: -118.2437,
            address: '456 Power St',
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
            postalCode: '90001',
          },
          email: 'powergym@gmail.com',
          phone: 9876543210,
          equipments: [
            { name: 'Bench Press' },
            { name: 'Pull-Up Bar' },
          ],
          images: [{ path: '/images/gym2.jpg' }],
          subscription: {
            subscriptionId: subscriptions[1]._id,
            expireDate: new Date('2024-12-31'),
          },
        },
      ]);
  
      // Create memberships
      const memberships = await Membership.insertMany([
        {
          title: 'Standard Membership',
          description: 'Access to all gym facilities',
          price: 49.99,
          gymId: gyms[0]._id,
        },
        {
          title: 'VIP Membership',
          description: 'VIP access to personal trainers and premium facilities',
          price: 99.99,
          gymId: gyms[1]._id,
        },
      ]);
  
      // Create users
      const users = await User.insertMany([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          userType: 'client',
          membership: [
            {
              membershipID: [memberships[0]._id],
              expiryDate: new Date('2025-12-31'),
            },
          ],
          clientPassword: 'password123',
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@gmail.com',
          userType: 'gym-admin',
          membership: [
            {
              membershipID: [memberships[1]._id],
              expiryDate: new Date('2024-12-31'),
            },
          ],
          clientPassword: 'password456',
        },
      ]);
  
      // Create gym admins
      const gymAdmins = await GymAdmin.insertMany([
        {
          gymAdminUsername: 'janeAdmin',
          gymAdminType: 'manager',
          gymAdminPassword: 'admin123',
          userId: users[1]._id,
        },
      ]);
  
      // Create transactions
      const transactions = await Transaction.insertMany([
        {
          userId: users[0]._id,
          transactionType: 'membership',
          amount: 49.99,
          currency: 'USD',
          status: 'completed',
          method: 'credit card',
          membershipId: memberships[0]._id,
        },
        {
          userId: users[1]._id,
          transactionType: 'subscription',
          amount: 99.99,
          currency: 'USD',
          status: 'completed',
          method: 'credit card',
          subscriptionId: subscriptions[1]._id,
        },
      ]);
  
      console.log('Database seeding completed successfully!');
      mongoose.connection.close();
    } catch (err) {
      console.error('Error during database seeding:', err);
      mongoose.connection.close();
    }
  };


  seedDatabase();