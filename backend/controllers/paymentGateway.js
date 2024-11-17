import Razorpay from 'razorpay';
import crypto from 'crypto';
import { PaymentGateway } from '../models/paymentGateway.js';

// Global variables for Razorpay instance
let razorpayInstance = null;

// Function to encrypt two texts with the same key and IV
export function encrypt(text1, text2) {
    const algorithm = 'aes-256-cbc'; // Algorithm for encryption
    const key = crypto.randomBytes(32); // 256-bit key
    const iv = crypto.randomBytes(16);  // Initialization vector

    // Create a cipher for the first text
    const cipher1 = crypto.createCipheriv(algorithm, key, iv);
    let encrypted1 = cipher1.update(text1, 'utf-8', 'hex');
    encrypted1 += cipher1.final('hex');

    // Create a cipher for the second text
    const cipher2 = crypto.createCipheriv(algorithm, key, iv);
    let encrypted2 = cipher2.update(text2, 'utf-8', 'hex');
    encrypted2 += cipher2.final('hex');

    // Return both encrypted data along with the key and IV
    return {
        iv: iv.toString('hex'),
        encryptedData1: encrypted1,
        encryptedData2: encrypted2,
        key: key.toString('hex') // Store the key securely in a real-world scenario
    };
}

// Function to insert API key into the database
export const insertApiKey = async (encrypted1, encrypted2, key, iv, gymId) => {
    try {
        const newApiKey = await PaymentGateway.create({
            apiKey: encrypted1,
            apiKeySecret: encrypted2,
            key,
            iv,
            gymId: gymId // Replace this with the actual gym ID you need
        });
        console.log('API Key inserted successfully:');
    } catch (error) {
        console.error('Error inserting API Key:', error);
    }
};

// Decrypt function to decrypt the encrypted data
export function decrypt(encryptedData, iv, key) {
    const algorithm = 'aes-256-cbc'; // Same algorithm used for encryption
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));

    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted; // Return the decrypted plaintext
}

// Fetch API keys from the database
export const getApiKey = async (id) => {
    try {
        const apiKey = await PaymentGateway.findOne({ where: { gymId: id } });
        return { apiKey: apiKey.apiKey, apiKeySecret: apiKey.apiKeySecret, key: apiKey.key, iv: apiKey.iv };
    } catch (error) {
        console.error('Error fetching API Key:', error);
        throw error;
    }
};

// Function to initialize the Razorpay instance with dynamic keys
const initializeRazorpay = async (gymId) => {


    if (!gymId) {
        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
    } else {
        const { apiKey, apiKeySecret, key, iv } = await getApiKey(gymId);
        const decryptedApiKey = decrypt(apiKey, iv, key);
        const decryptedApiKeySecret = decrypt(apiKeySecret, iv, key);

        razorpayInstance = new Razorpay({
            key_id: decryptedApiKey,
            key_secret: decryptedApiKeySecret,
        });
    }
};

export const getPublicKey = async (req, res) => {
    console.log("from getPublicKey: ", req.body)
    try {
        const { apiKey, key, iv } = await getApiKey(req.body.gymId);

        const decryptedApiKey = decrypt(apiKey, iv, key);

        res.json({ publicKey: decryptedApiKey })
    } catch (err) {
        res.json(err)
    }




}
export const createOrder = async (req, res) => {
    const { amount, currency, receipt, gymId } = req.body;
    console.log(req.body);

    try {
        console.log("hey its working!!");

        // Initialize Razorpay with keys for the given gymId
        await initializeRazorpay(gymId);

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paisa for INR)
            currency: currency,
            receipt: receipt,
        };

        // Use the global instance to create an order
        const order = await razorpayInstance.orders.create(options);
        console.log(order);

        // Send the order details in the response
        res.json(order);
    } catch (error) {
        console.error('Payment failed:', error);

        // Check if the error is from Razorpay SDK (normalizeError)
        if (error && error.response) {
            console.error('Razorpay error response:', error.response);
        } else if (error && error.statusCode) {
            console.error('Razorpay API Error:', error.statusCode, error.message);
            res.status(error.statusCode).json({ message: error.message });
        } else {
            // Handle errors where there is no proper response
            console.error('General Error:', error.message || 'Unknown error');
            res.status(500).json({
                message: 'Something went wrong while processing the payment.',
            });
        }
    }
};


// Payment verification using the global Razorpay instance
export const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', razorpayInstance.key_secret); // Use global instance key_secret
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        res.send('Payment verification successful');
    } else {
        res.status(400).send('Payment verification failed');
    }
};

// Fetch payment details using the global Razorpay instance
export const paymentDetails = async (req, res) => {
    const paymentId = req.params.id;
    try {
        const paymentDetails = await razorpayInstance.payments.fetch(paymentId);
        console.log("paymentDetails fetched: ", paymentDetails)
        res.json(paymentDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment details' });
    }
};
