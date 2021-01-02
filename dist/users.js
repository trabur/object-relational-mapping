"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
// libraries
var uuid_1 = require("uuid");
var Users = /** @class */ (function () {
    function Users(socket) {
        this.socket = null;
        this.channel = null;
        // phoenix channel
        this.channel = socket.channel("MAIN", { token: "abc" });
        this.channel.join()
            .receive("ok", function (_a) {
            var messages = _a.messages;
            return console.log("users: joined MAIN channel", messages);
        })
            .receive("error", function (_a) {
            var reason = _a.reason;
            return console.log("users: failed to join MAIN channel", reason);
        })
            .receive("timeout", function () { return console.log("still waiting..."); });
        return this;
    }
    /******
     * trigger actions
     ******/
    Users.prototype.all = function (callback) {
        var outputRoom1 = uuid_1.v4();
        this.channel.on("room:" + outputRoom1, callback);
        this.channel.push("room:broadcast", {
            room: 'users',
            message: {
                output: outputRoom1
            }
        });
    };
    Users.prototype.register = function (email, username, password, callback) {
        var outputRoom2 = uuid_1.v4();
        this.channel.on("room:" + outputRoom2, callback);
        this.channel.push("room:broadcast", {
            room: 'register',
            message: {
                payload: {
                    email: email,
                    username: username,
                    password: password,
                },
                output: outputRoom2
            }
        });
    };
    Users.prototype.login = function (email, password, callback) {
        var outputRoom3 = uuid_1.v4();
        this.channel.on("room:" + outputRoom3, callback);
        this.channel.push("room:broadcast", {
            room: 'login',
            message: {
                payload: {
                    email: email,
                    password: password
                },
                output: outputRoom3
            }
        });
    };
    Users.prototype.remove = function (email, password, callback) {
        var outputRoom4 = uuid_1.v4();
        this.channel.on("room:" + outputRoom4, callback);
        this.channel.push("room:broadcast", {
            room: 'remove',
            message: {
                payload: {
                    email: email,
                    password: password
                },
                output: outputRoom4
            }
        });
    };
    return Users;
}());
exports.Users = Users;
//# sourceMappingURL=users.js.map