var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// method
export default function (prisma, channel) {
    // trigger
    return function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield prisma.user.findMany();
            channel.push("room:broadcast", {
                room: data.message.output,
                message: allUsers
            });
        });
    };
}
//# sourceMappingURL=onUsers.js.map