"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORM = void 0;
var users_1 = require("./users");
var tenants_1 = require("./tenants");
var publishSubscribe_1 = require("./platforms/publishSubscribe");
var counter_1 = require("./platforms/counter");
var logging_1 = require("./platforms/logging");
var ORM = /** @class */ (function () {
    function ORM(socket) {
        this.channel = null;
        this.users = null;
        this.tenants = null;
        this.platforms = {
            publishSubscribe: null,
            counter: null,
            logging: null
        };
        // could be socket for node.js or web
        socket.connect();
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
        // methods
        this.users = new users_1.Users(this.channel);
        this.tenants = new tenants_1.Tenants(this.channel);
        this.platforms.publishSubscribe = new publishSubscribe_1.PublishSubscribe(this.channel);
        this.platforms.counter = new counter_1.Counter(this.channel);
        this.platforms.logging = new logging_1.Logging(this.channel);
        return this;
    }
    return ORM;
}());
exports.ORM = ORM;
//# sourceMappingURL=index.js.map