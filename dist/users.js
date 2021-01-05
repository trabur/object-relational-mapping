"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
// libraries
var uuid_1 = require("uuid");
var Users = /** @class */ (function () {
    function Users(channel) {
        this.channel = null;
        this.channel = channel;
        return this;
    }
    /******
     * trigger actions
     ******/
    Users.prototype.listen = function (id, token, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:broadcast", {
            room: 'listen',
            message: {
                payload: {
                    id: id,
                    token: token
                },
                output: outputRoom
            }
        });
    };
    Users.prototype.put = function (id, data, token, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:broadcast", {
            room: 'put',
            message: {
                payload: {
                    id: id,
                    token: token,
                    data: data
                },
                output: outputRoom
            }
        });
    };
    Users.prototype.register = function (email, username, password, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:broadcast", {
            room: 'register',
            message: {
                payload: {
                    email: email,
                    username: username,
                    password: password,
                },
                output: outputRoom
            }
        });
    };
    Users.prototype.login = function (email, password, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:broadcast", {
            room: 'login',
            message: {
                payload: {
                    email: email,
                    password: password
                },
                output: outputRoom
            }
        });
    };
    return Users;
}());
exports.Users = Users;
//# sourceMappingURL=users.js.map