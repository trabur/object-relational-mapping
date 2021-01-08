"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenants = void 0;
// libraries
var uuid_1 = require("uuid");
var Tenants = /** @class */ (function () {
    function Tenants(channel) {
        this.channel = null;
        this.channel = channel;
        return this;
    }
    /******
     * trigger actions
     ******/
    Tenants.prototype.allUserTenants = function (callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:secure", {
            vault: 'tenants',
            message: {
                output: outputRoom
            }
        });
    };
    Tenants.prototype.register = function (email, username, password, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:secure", {
            vault: 'register',
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
    Tenants.prototype.login = function (email, password, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:secure", {
            vault: 'login',
            message: {
                payload: {
                    email: email,
                    password: password
                },
                output: outputRoom
            }
        });
    };
    Tenants.prototype.remove = function (email, password, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:secure", {
            vault: 'remove',
            message: {
                payload: {
                    email: email,
                    password: password
                },
                output: outputRoom
            }
        });
    };
    return Tenants;
}());
exports.Tenants = Tenants;
//# sourceMappingURL=tenants.js.map