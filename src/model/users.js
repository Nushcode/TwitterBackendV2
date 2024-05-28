import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    const user = this;
    // Generate a salt only if the password has been modified or is new
    if (!user.isModified('password')) {
        return next();
    }
    const SALT_ROUNDS = 9;
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJWT = function generate(){
    return jwt.sign({id: this.id , email: this.email}, 'secret', {
        expiresIn: '1h'
    })
}

const User = mongoose.model('User', userSchema);

export default User;
