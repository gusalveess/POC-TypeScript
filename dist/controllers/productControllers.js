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
import * as authRepository from "../repositories/authRepository.js";
import * as productRepository from "../repositories/productRepository.js";
export function InsertProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, Product, session, SendProduct, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                    Product = req.body;
                    return [4 /*yield*/, authRepository.FindToken(token)];
                case 1:
                    session = (_b.sent()).rows;
                    SendProduct = {
                        product: Product.product,
                        price: Product.price,
                        userid: session[0].userid
                    };
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    if (!Product.product || !Product.price) {
                        return [2 /*return*/, res.status(422).send("Preencha os campos em vazios!")];
                    }
                    if (session.length === 0) {
                        return [2 /*return*/, res.status(401).send("Sessão não encontrada")];
                    }
                    if (!token) {
                        return [2 /*return*/, res.status(401).send("Sem Token de acesso.")];
                    }
                    return [4 /*yield*/, productRepository.NewProduct(SendProduct)];
                case 3:
                    _b.sent();
                    res.sendStatus(200);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    res.sendStatus(500);
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function GetProducts(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, session, myProducts, error_2;
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
                    return [4 /*yield*/, productRepository.ReadProducts(session[0].userid)];
                case 3:
                    myProducts = (_b.sent()).rows;
                    res.status(200).send(myProducts);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    res.sendStatus(500);
                    console.log(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function GetTotal(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, session, myTotal, error_3;
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
                    return [4 /*yield*/, productRepository.Total(session[0].userid)];
                case 3:
                    myTotal = (_b.sent()).rows;
                    res.status(200).send(myTotal);
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
export function EditProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, newName, token, session, product, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    newName = req.body;
                    token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                    return [4 /*yield*/, authRepository.FindToken(token)];
                case 1:
                    session = (_b.sent()).rows;
                    return [4 /*yield*/, productRepository.ReadProducts(id)];
                case 2:
                    product = (_b.sent()).rows;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    if (session[0].userid !== product[0].userid) {
                        return [2 /*return*/, res.status(401).send("Não autorizado.")];
                    }
                    if (session.length === 0) {
                        return [2 /*return*/, res.status(401).send("Sessão não encontrada")];
                    }
                    if (!token) {
                        return [2 /*return*/, res.status(401).send("Sem Token de acesso.")];
                    }
                    return [4 /*yield*/, productRepository.UpdateName(newName, id)];
                case 4:
                    _b.sent();
                    res.sendStatus(200);
                    return [3 /*break*/, 6];
                case 5:
                    error_4 = _b.sent();
                    res.sendStatus(500);
                    console.log(error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function EditPrice(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, newPrice, token, session, product, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    newPrice = req.body;
                    token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                    return [4 /*yield*/, authRepository.FindToken(token)];
                case 1:
                    session = (_b.sent()).rows;
                    return [4 /*yield*/, productRepository.ReadProducts(id)];
                case 2:
                    product = (_b.sent()).rows;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    if (session[0].userid !== product[0].userid) {
                        return [2 /*return*/, res.status(401).send("Não autorizado.")];
                    }
                    if (session.length === 0) {
                        return [2 /*return*/, res.status(401).send("Sessão não encontrada")];
                    }
                    if (!token) {
                        return [2 /*return*/, res.status(401).send("Sem Token de acesso.")];
                    }
                    return [4 /*yield*/, productRepository.UpdatePrice(newPrice, id)];
                case 4:
                    _b.sent();
                    res.sendStatus(200);
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _b.sent();
                    res.sendStatus(500);
                    console.log(error_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function Del(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, token, session, product, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                    return [4 /*yield*/, authRepository.FindToken(token)];
                case 1:
                    session = (_b.sent()).rows;
                    return [4 /*yield*/, productRepository.ReadProducts(id)];
                case 2:
                    product = (_b.sent()).rows;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    if (session[0].userid !== product[0].userid) {
                        return [2 /*return*/, res.status(401).send("Não autorizado.")];
                    }
                    if (session.length === 0) {
                        return [2 /*return*/, res.status(401).send("Sessão não encontrada")];
                    }
                    if (!token) {
                        return [2 /*return*/, res.status(401).send("Sem Token de acesso.")];
                    }
                    return [4 /*yield*/, productRepository.Delete(id)];
                case 4:
                    _b.sent();
                    res.sendStatus(200);
                    return [3 /*break*/, 6];
                case 5:
                    error_6 = _b.sent();
                    res.sendStatus(500);
                    console.log(error_6);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
