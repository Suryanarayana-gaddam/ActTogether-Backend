const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs'); 
const Book = require("../models/books");
const users = require("../models/users");

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const filt = { _id: new ObjectId(id) };
    const result = await users.findOne(filt).exec();
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(result);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const signUp = async (req, res) => {
    const userData = req.body;
    console.log("username :",userData.username)
    try {
      const existingUser = await users.findOne({username : userData.username})
      if(existingUser){
        console.log("existingUsers:",userData.username,existingUser);
        return res.status(403).json({message : `user exists :,${existingUser}`});
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const result = await users.create({
        username : userData.username,
        password: hashedPassword,
        mobile : userData.mobile,
        email: userData.email,
        gender: userData.gender,
        dob: userData.dob,
        picture: userData.picture,
        role: userData.role,
        interests: userData.interests,
        eventsParticipated: [],
        address: userData.address
      });
    
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in sign-up:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  const getUsers = async(req,res) => {
      try{
          const Allusers = await users.find({});
          res.status(200).json(Allusers);
      } catch(error){
          res.status(500).json({message : error.message});
      }
  }

  const logIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await users.findOne({ username : username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.status(200).json(user);
          } else {
            res.status(401).json({ error: "Incorrect password" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
      
      const deleteUser = async(req,res) => {
        try{
          const id = req.params.id;
          const filter = {_id: new ObjectId(id)};
          const result = await users.deleteOne(filter);
          res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
      }
      
      const updateUser = async(req,res) => {
        try{
            const id = req.params.id;
            //console.log(id);
            const updateUserData = req.body;
            const filter = {_id: new ObjectId(id)};
            const options = {upsert: true};
            const updateDoc = {
                $set:{
                ...updateUserData
                }
            }
            const result = await users.updateOne(filter,updateDoc,options);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
      }


//       const addToWishlist = async (req, res) => {
//         const userId = req.params.userId;
//         const  book = req.body;
//         //console.log('User Id :' ,userId);
//         // console.log("Recieved book :",book);  
//         try {
//           // Find the user by userId and update the wishlist array
//           const updatedUser = await users.findOneAndUpdate(
//             { _id :new ObjectId(userId) },
//             { $addToSet: { wishlist: book} }, // Push the entire book object
//             {new : true}
//           );
          
//           res.status(200).json(updatedUser);
//           //console.log('Updated user:', updatedUser); // Log the updated user object
          
//         } catch (error) {
//           console.error("Error adding item to wishlist:", error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//       }
      
//       const logIn = async(req,res) => {
//         try{
//           const {password,username} = req.body;
//           const hashedPassword = await bcrypt.hash(password, 10);
//           const result = await users.create({email,hashedPassword,username,wishlist: [],
//             cart: [],
//             orders: [],
//             uploadedbooks: []});
//           res.send(result);
//         } catch (error) {
//           console.error("Error in sign-up:", error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//       };
      
//       const getUserByEmail = async (req, res) => {
          
//           try {
//             const email = req.params.email;
//             console.log("email :",email)
//               const  query = {email : email }
//               // Find the user by email in the userdata collection
//                const user = await users.findOne(query);
//                console.log("user :",user)
//                if (!user) {
//               // If the user is not found, return a 404 status code
//               return res.status(404).json({ error: "User not found" });
//             }
      
//             // If the user is found, return the user data
//             res.status(200).json(user);
//           } catch (error) {
//             // If an error occurs, return a 500 status code with the error message
//             console.error(error);
//             res.status(500).json({ error: "Internal server error" });
//           }
//         }
    
//       const getCartBooks = async (req, res) => {
//         const userId = req.params.userId;
      
//         try {
//           // Find the user by user ID
//           const user = await users.findOne({_id:new ObjectId(userId)}).exec();
      
//           if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//           }
      
//           // Extract cart from the user object
//           const rescart = user.cart;
      
//           res.status(200).json( rescart );
//           //console.log({rescart});
//         } catch (error) {
//           console.error('Error retrieving cart:', error);
//           res.status(500).json({ error: 'Internal server error' });
//         }
//       }
    
//       const addToCart = async (req, res) => {
//         const userId = req.params.userId;
//         const  book = req.body;
//         try {
//           // Find the user by userId and update the cart array
//           const updatedUser = await users.findOneAndUpdate(
//             { _id :new ObjectId(userId) },
//             { $addToSet: { cart: book} }, // Push the entire book object
//             {new : true}
//           );
      
//           res.status(200).json(updatedUser);
//           //console.log('Updated user:', updatedUser); // Log the updated user object
      
//         } catch (error) {
//           console.error("Error adding item to cart:", error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//       }
    
//       const removeFromWishlist =  async (req, res) => {
//         const userId = req.params.userId;
//         const bookId = req.body.bookId;
      
//         //console.log('User Id:', userId);
//         //console.log('Book Id:', bookId);
      
//         try {
//           // Find the user by userId and update the wishlist array
//           const updatedUser = await users.findOneAndUpdate(
//             { _id: new ObjectId(userId) },
//             { $pull: { wishlist: { _id : bookId } } }, // Pull book with matching ID
//             {new : true}
//           );
      
//           if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//           }
//           res.status(200).json(updatedUser);
//           //console.log('Updated user:', updatedUser);
      
//         } catch (error) {
//           console.error("Error removing book from wishlist:", error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//       }
    
//       const removeBookFromCart = async (req, res) => {
//         const userId = req.params.userId;
//         const bookId = req.body.bookId;
      
//         //console.log('User Id:', userId);
//         //console.log('Book Id:', bookId);
      
//         try {
//           // Find the user by userId and update the wishlist array
//           const updatedUser = await users.findOneAndUpdate(
//             { _id: new ObjectId(userId) },
//             { $pull: { cart: { _id : bookId } } }, // Pull book with matching ID
//             {new : true}
//           );
      
//           if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//           }
      
//           res.status(200).json(updatedUser);
//           ///console.log('Updated user:', updatedUser);
      
//         } catch (error) {
//           console.error("Error removing book from cart:", error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//       }
    
//       const getBooksInWishlist =  async (req, res) => {
//         const userId = req.params.userId;
      
//         try {
//           // Find the user by user ID
//           const user = await users.findOne({_id:new ObjectId(userId)});
      
//           if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//           }
      
//           // Extract wishlist from the user object
//           const reswishlist = user.wishlist;
      
//           res.status(200).json( reswishlist );
//           //console.log({reswishlist});
//         } catch (error) {
//           console.error('Error retrieving wishlist:', error);
//           res.status(500).json({ error: 'Internal server error' });
//         }
//       }
      
//       const  removeAllFromCart = async (req, res) => {
//         const userId = req.params.userId;
        
//     try {
//       // Find the user by userId and update the wishlist array to an empty array
//       const updatedUser = await users.findOneAndUpdate(
//         { _id: new ObjectId(userId) },
//         { $set: { cart: [] } }, // Set cart array to empty
//         { new: true }
//       );
  
//       if (!updatedUser) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.status(200).json(updatedUser);
//       //('Updated user:', updatedUser);
  
//     } catch (error) {
//       console.error("Error removing all books from cart:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }


//   const getUsersCount = async(req,res) => {
//     try{
//         const userss = await users.find({});
//         const usercount = userss.length;
//         res.status(200).json({count : usercount});
//     } catch(error){
//         res.status(500).json({message : error.message});
//     }
// }


  module.exports ={ signUp , logIn, getUserById, getUsers, deleteUser, updateUser}