"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYU = void 0;
var users_1 = require("./users");
var TYU = /** @class */ (function () {
    function TYU(socket) {
        this.users = null;
        // could be socket for node.js or web
        socket.connect();
        // methods
        this.users = new users_1.Users(socket);
        return this;
    }
    return TYU;
}());
exports.TYU = TYU;
// export {
//   users,
//   tenants,
//   platform,
//   services
// }
//# sourceMappingURL=index.js.map