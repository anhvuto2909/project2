const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w+([.-]?\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ 
                status : 'ERR',
                message: 'All fields are required' 
            });
        }   else if (!isCheckEmail) {
                return res.status(200).json({ 
                    status : 'ERR',
                    message: 'Input is email @'  
                })
        }   else if (password !== confirmPassword) {
                return res.status(200).json({ 
                    status : 'ERR',
                    message: 'Password is not same confirmPassword'  
                })
            }

        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w+([.-]?\w+)*$/
        const isCheckEmail = reg.test(email)
        if ( !email || !password ) {
            return res.status(400).json({ 
                status : 'ERR',
                message: 'All fields are required' 
            });
        }   else if (!isCheckEmail) {
                return res.status(200).json({ 
                    status : 'ERR',
                    message: 'Input is email @'  
                })
        } 

        const response = await UserService.loginUser(req.body);
        const { refresh_token, ...newResponse } = response
        //console.log('response', response)
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json(newResponse);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId) {
            return res.status(400).json({
                status : "ERR",
                message : "The userID is required"
            })
        }
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(400).json({
                status : "ERR",
                message : "The userID is required"
            })
        }

        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(400).json({
                status : "ERR",
                message : "The userID is required"
            })
        }

        const response = await UserService.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    console.log('req.cookies.refresh_token', req.cookies.refresh_token)
    try {
        const token = req.cookies.refresh_token;
        if(!token) {
            return res.status(400).json({
                status : "ERR",
                message : "The token is required"
            })
        }

        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in refreshToken:", e);
        res.clearCookie('refresh_token')
        return res.status(500).json({
            status: "ERROR",
            message: "Internal server error",
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'No refresh token found',
            });
        }

        // Clear cookie
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(200).json({
            status: 'OK',
            message: 'Logout Successfully',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Something went wrong',
        });
    }
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
}