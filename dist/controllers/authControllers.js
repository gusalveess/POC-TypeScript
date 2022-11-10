var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepository from "../repositories/authRepository.js";
export function SU(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var Info, user, passwordHash, Send, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Info = req.body;
                    return [4 /*yield*/, authRepository.FindUser(Info.email)];
                case 1:
                    user = (_a.sent()).rows;
                    passwordHash = bcrypt.hashSync(Info.password, 10);
                    Send = {
                        picture: Info.picture,
                        name: Info.name,
                        email: Info.email,
                        passwordHash: passwordHash
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    if (!Info.picture || !Info.name || !Info.email || !Info.password) {
                        return [2 /*return*/, res.status(422).send("Preencha os campos em vazios!")];
                    }
                    if (Info.password != Info.confirmPassword) {
                        return [2 /*return*/, res.status(422).send("As senhas precisam ser iguais!")];
                    }
                    if (user.length > 0) {
                        return [2 /*return*/, res
                                .status(409)
                                .send("Já existe um usuário cadastrado com esse e-mail.")];
                    }
                    return [4 /*yield*/, authRepository.CreateUser(Send)];
                case 3:
                    _a.sent();
                    res.sendStatus(200);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    res.sendStatus(500);
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function SI(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var info, key, user, token, sendToken, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    info = req.body;
                    key = process.env.JWT_SECRET;
                    return [4 /*yield*/, authRepository.FindUser(info.email)];
                case 1:
                    user = (_a.sent()).rows;
                    token = jwt.sign(user[0].id, key);
                    sendToken = {
                        token: token
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    if (!info.email || !info.password) {
                        return [2 /*return*/, res.status(422).send("Preencha os campos em vazios!")];
                    }
                    if (user.length === 0) {
                        return [2 /*return*/, res.status(401).send("Usuário incompátivel ou inexistente")];
                    }
                    if (bcrypt.compareSync(info.password, user[0].password) === false) {
                        return [2 /*return*/, res.status(401).send("Senha incorreta.")];
                    }
                    return [4 /*yield*/, authRepository.Login(token, user[0].id)];
                case 3:
                    _a.sent();
                    res.status(200).send(sendToken);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    res.sendStatus(500);
                    console.log(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function LogOut(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, session, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                    return [4 /*yield*/, authRepository.FindToken(token)];
                case 1:
                    session = (_b.sent()).rows;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    if (session.length === 0) {
                        return [2 /*return*/, res.status(401).send("Sessão não encontrada")];
                    }
                    if (!token) {
                        return [2 /*return*/, res.status(401).send("Sem Token de acesso.")];
                    }
                    return [4 /*yield*/, authRepository.Finish(token)];
                case 3:
                    _b.sent();
                    res.sendStatus(200);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _b.sent();
                    res.sendStatus(500);
                    console.log(error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
