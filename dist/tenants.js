"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.login = exports.register = exports.all = void 0;
// libraries
var uuid_1 = require("uuid");
// elixir socket
var Socket = require("phoenix").Socket;
if (typeof process === 'object') {
    var w3cwebsocket = require("websocket").w3cwebsocket;
    var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", { transport: w3cwebsocket }); // node.js
}
else {
    var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket"); // broswer
}
socket.connect();
// phoenix channel
var channel = socket.channel("MAIN", { token: "abc" });
channel.join()
    .receive("ok", function (_a) {
    var messages = _a.messages;
    return console.log("joined MAIN channel", messages);
})
    .receive("error", function (_a) {
    var reason = _a.reason;
    return console.log("failed to join MAIN channel", reason);
})
    .receive("timeout", function () { return console.log("still waiting..."); });
/******
 * trigger actions
 ******/
function all(callback) {
    var outputRoom1 = uuid_1.v4();
    channel.on("room:" + outputRoom1, callback);
    channel.push("room:broadcast", {
        room: 'users',
        message: {
            output: outputRoom1
        }
    });
}
exports.all = all;
function register(email, username, password, callback) {
    var outputRoom2 = uuid_1.v4();
    channel.on("room:" + outputRoom2, callback);
    channel.push("room:broadcast", {
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
}
exports.register = register;
function login(email, password, callback) {
    var outputRoom3 = uuid_1.v4();
    channel.on("room:" + outputRoom3, callback);
    channel.push("room:broadcast", {
        room: 'login',
        message: {
            payload: {
                email: email,
                password: password
            },
            output: outputRoom3
        }
    });
}
exports.login = login;
function remove(email, password, callback) {
    var outputRoom4 = uuid_1.v4();
    channel.on("room:" + outputRoom4, callback);
    channel.push("room:broadcast", {
        room: 'remove',
        message: {
            payload: {
                email: email,
                password: password
            },
            output: outputRoom4
        }
    });
}
exports.remove = remove;
//# sourceMappingURL=tenants.js.map