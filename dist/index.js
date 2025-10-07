"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const route_1 = require("./routes/route");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use((0, helmet_1.default)());
app.use("/styles", express_1.default.static(path_1.default.join(__dirname, "styles")));
app.use(express_1.default.static(path_1.default.join(__dirname, "scripts")));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", route_1.router);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
