import bcrypt from 'bcrypt';

import User from '../models/User.js';

export const insertUser = async (req, res) => {
    try {
        const data = req.body;
        console.log("DATA: ", data)
        
        

        
        if (data.password !== data.conPassword) {
            return res.status(400).json({ passwordError: 'Passwords do not match' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

       
        const newUser = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword
        });

        
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
            }
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};
