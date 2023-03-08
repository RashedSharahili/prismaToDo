"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const user_zod_1 = require("../schema.zod/user.zod");
let router = express_1.default.Router();
// read
router.get('/', user_controller_1.getAllUsers);
// login user
router.post('/login', (0, validate_1.default)(user_zod_1.loginSchema), user_controller_1.login);
// create 
router.post('/', (0, validate_1.default)(user_zod_1.createUserSchema), user_controller_1.createUser);
exports.default = router;
