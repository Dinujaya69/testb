import User from "../models/User.js"; // Import the User model to interact with the user data in the database
import bcrypt from "bcrypt"; // Import bcrypt for password hashing and comparison

// Register User
export const registerUser = async (req, res) => {
  // Define the registerUser function which handles user registration
  const { name, email, password } = req.body; // Destructure name, email, and password from the request body
  try {
    // Check if the user already exists in the database by searching with the email
    const userExists = await User.findOne({ email });
    if (userExists) {
      // If user exists, send a response with status 400 and a message
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password using bcrypt before storing it in the database
    const hashPassword = await bcrypt.hash(password, 10);
    // Create a new User object with the provided details, including the hashed password
    const newUser = new User({ name, email, password: hashPassword });
    // Save the new user to the database
    await newUser.save();
    // Send a success response after user is successfully registered
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    // Log the error if there's any issue during registration
    console.log("Error in register user", error);
    // Send a response with status 500 indicating server error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  // Define the loginUser function which handles user login
  const { email, password } = req.body; // Destructure email and password from the request body
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" }); // If user doesn't exist, return an error
    // Compare the provided password with the stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" }); // If password doesn't match, return an error
    // If the login is successful, send a success response along with the user data
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    // Log any errors that occur during the login process
    console.log("Error in login user", error);
    // Send a response indicating a server error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  // Define the getAllUsers function which retrieves all users
  try {
    // Fetch all users from the database
    const users = await User.find();
    // Send the list of users as a response with status 200
    res.status(200).json(users);
  } catch (error) {
    // Log the error if there's any issue retrieving the users
    console.log("Error in get all users", error);
    // Send a response with status 500 indicating a server error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  // Define the getUserById function to get a specific user by their ID
  try {
    // Fetch the user from the database using the ID parameter from the request
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" }); // If user not found, return an error
    // Send the user data as a response
    res.status(200).json(user);
  } catch (error) {
    // Log the error if there's any issue retrieving the user
    console.log("Error in get user by ID", error);
    // Send a response with status 500 indicating a server error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Filter Users by Name (case-insensitive)
export const filterUsersByName = async (req, res) => {
  // Define the filterUsersByName function which filters users by name
  try {
    // Use a regular expression to search for users with the name matching the query (case-insensitive)
    const users = await User.find({ name: new RegExp(req.query.name, "i") });
    // Send the filtered list of users as a response
    res.status(200).json(users);
  } catch (error) {
    // Log the error if there's any issue filtering the users
    console.log("Error in filter users", error);
    // Send a response with status 500 indicating a server error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  // Define the updateUser function to update a user's information
  try {
    // Use findByIdAndUpdate to update the user by their ID and pass the updated data
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Ensure the updated user data is returned
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" }); // If user not found, return an error
    // Send a success response with the updated user data
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    // Log the error if there's any issue updating the user
    console.log("Error in update user", error);
    // Send a response with status 500 indicating a server error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  // Define the deleteUser function to delete a user by their ID
  try {
    // Use findByIdAndDelete to delete the user by their ID
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" }); // If user not found, return an error
    // Send a success response indicating that the user was deleted
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Log the error if there's any issue deleting the user
    console.log("Error in delete user", error);
    // Send a response with status 500 indicating a server error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
