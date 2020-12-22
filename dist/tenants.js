"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.login = exports.register = exports.all = exports.run = exports.stop = void 0;
// libraries
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const uuid_1 = require("uuid");
// elixir socket
var w3cwebsocket = require("websocket").w3cwebsocket;
var Socket = require("phoenix").Socket;
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", { transport: w3cwebsocket });
socket.connect();
// phoenix channel
let channel = socket.channel("MAIN", { token: "abc" });
channel.join()
    .receive("ok", ({ messages }) => console.log("joined MAIN channel", messages))
    .receive("error", ({ reason }) => console.log("failed to join MAIN channel", reason))
    .receive("timeout", () => console.log("still waiting..."));
// listener references
let ref1;
let ref2;
let ref3;
let ref4;
// listener functions
const onRegister_1 = __importDefault(require("./users/onRegister"));
const onLogin_1 = __importDefault(require("./users/onLogin"));
const onUsers_1 = __importDefault(require("./users/onUsers"));
const onRemove_1 = __importDefault(require("./users/onRemove"));
/******
 * trigger methods
 ******/
function run() {
    // start listening
    ref1 = channel.on("room:register", onRegister_1.default(prisma, channel));
    ref2 = channel.on("room:login", onLogin_1.default(prisma, channel));
    ref3 = channel.on("room:users", onUsers_1.default(prisma, channel));
    ref4 = channel.on("room:remove", onRemove_1.default(prisma, channel));
}
exports.run = run;
function stop() {
    // quit listening
    channel.off("room:register", ref1);
    channel.off("room:login", ref2);
    channel.off("room:users", ref3);
    channel.off("room:remove", ref4);
}
exports.stop = stop;
/******
 * trigger actions
 ******/
function all(callback) {
    let outputRoom1 = uuid_1.v4();
    channel.on(`room:${outputRoom1}`, callback);
    channel.push("room:broadcast", {
        room: 'users',
        message: {
            output: outputRoom1
        }
    });
}
exports.all = all;
function register(email, username, password, callback) {
    let outputRoom2 = uuid_1.v4();
    channel.on(`room:${outputRoom2}`, callback);
    channel.push("room:broadcast", {
        room: 'register',
        message: {
            payload: {
                email,
                username,
                password,
            },
            output: outputRoom2
        }
    });
}
exports.register = register;
function login(email, password, callback) {
    let outputRoom3 = uuid_1.v4();
    channel.on(`room:${outputRoom3}`, callback);
    channel.push("room:broadcast", {
        room: 'login',
        message: {
            payload: {
                email,
                password
            },
            output: outputRoom3
        }
    });
}
exports.login = login;
function remove(email, password, callback) {
    let outputRoom4 = uuid_1.v4();
    channel.on(`room:${outputRoom4}`, callback);
    channel.push("room:broadcast", {
        room: 'remove',
        message: {
            payload: {
                email,
                password
            },
            output: outputRoom4
        }
    });
}
exports.remove = remove;
//# sourceMappingURL=tenants.js.map