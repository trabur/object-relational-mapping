var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sha512 from 'crypto-js/sha512';
const jwt = require('jsonwebtoken');
// method
export default function (prisma, channel) {
    // trigger
    return function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            // does the account already exist?
            const checkExist = yield prisma.user.findUnique({
                where: {
                    email: data.message.payload.email
                }
            });
            if (checkExist) {
                // respond
                channel.push("room:broadcast", {
                    room: data.message.output,
                    message: {
                        error: 1,
                        reason: `the account ${data.message.payload.email} already exists`
                    }
                });
                return; // it exists; we have no need to continue creation
            }
            // convert password to hash
            data.message.payload.password = sha512(data.message.payload.password).toString();
            // save to db
            const user = yield prisma.user.create({ data: data.message.payload });
            // respond
            channel.push("room:broadcast", {
                room: data.message.output,
                message: {
                    account: user,
                    token: jwt.sign({
                        user: user.id
                    }, '1337-secret-shhhhh', { expiresIn: '1h' })
                }
            });
        });
    };
}
//# sourceMappingURL=onRegister.js.map