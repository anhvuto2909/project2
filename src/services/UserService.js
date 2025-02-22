const User = require('../models/UserModels')
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
            try {
                const checkUser = await User.findOne({
                    email : email
            })
            
            if(checkUser !== null) {
                resolve({
                    status: "ERR ",
                    message : "The email is already"
                }) 
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({ 
                name, 
                email, 
                password : hash, 
                phone 
            })
            if (createdUser) {
                resolve({
                    status: 'Ok',
                    message: 'SUCCESS',
                    data: createdUser,
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
            try {
                const checkUser = await User.findOne({
                    email : email
            })
            
            if(checkUser === null) {
                resolve({
                    status: "ERR",
                    message : "The user is not defined"
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if(!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect',
                })
            }
            const access_token = genneralAccessToken({
                id : checkUser.id,
                isAdmin: checkUser.isAdmin  
            })

            const refresh_token = genneralRefreshToken({
                id : checkUser.id,
                isAdmin: checkUser.isAdmin
            })
                
            resolve({
                status: 'Ok',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({
                    _id: id
                });

                if(checkUser === null) {
                    resolve({
                        status: "OK",
                        message : "The user is not defined"
                    });
                }

                const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
                    
                resolve({
                    status: 'Ok',
                    message: 'SUCCESS',
                    data: updateUser
                })
            } catch (e) {
                reject(e)
            }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({
                    _id: id
                });

                if(checkUser === null) {
                    resolve({
                        status: "OK",
                        message : "The user is not defined"
                    });
                }

                await User.findByIdAndDelete(id)
                    
                resolve({
                    status: 'Ok',
                    message: 'Delete user SUCCESS',
                })
            } catch (e) {
                reject(e)
            }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
            try {
                const allUser = await User.find()   
                resolve({
                    status: 'Ok',
                    message: 'SUCCESS',
                    data : allUser
                })
            } catch (e) {
                reject(e)
            }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    _id: id
                });

                if(user === null) {
                    resolve({
                        status: "OK",
                        message : "The user is not defined"
                    });
                }
                    
                resolve({
                    status: 'Ok',
                    message: 'Sucess',
                    data : user
                })
            } catch (e) {
                reject(e)
            }
    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
};
