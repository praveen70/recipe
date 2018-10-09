const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) =>{
    const { username, email, password } = user;
    return jwt.sign({ username, email, password }, secret, { expiresIn})
}





exports.resolvers = {
    Query:{
        getAllRecipes: async(root, args, { Recipe }) =>{
            const allRecipes = await Recipe.find();
            return allRecipes;
        },
        getcurrentUser:async(root, args, { currentUser, User }) =>{
            if(!currentUser){
                return null;
            }
        const user = await User.findOne({ username: currentUser.username })
        .populate({
            path:'favorites',
            model:'Recipe'
        });
        return user;
        }
    },
    Mutation:{
        addRecipe: async (root, { name, description, category, instructions, username}, { Recipe })=>{
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();
             return newRecipe;
        },
        signinUser: async(root, { username, password }, { User }) =>{
            const user = await User.findOne({ username });
            if(!user){
                throw new Error('User not exists');
            }
            const inValidPassword = await bcrypt.compare(password, user.password);
            if(!inValidPassword){
                throw new Error('Invalid Password');
            }
            return { token: createToken(user, process.env.SECRET,"100days")}
        },
        signupUser: async (root, { username, email, password }, { User })=>{
            const user = await User.findOne({ username });
            if(user){
                throw new Error('User already exists');

            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return { token: createToken(newUser, process.env.SECRET,"100days")}
        }
    }
};