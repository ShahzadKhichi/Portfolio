"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Connect_DB_1 = __importDefault(require("./src/DB/Connect_DB"));
dotenv_1.default.config({});
const public_route_1 = __importDefault(require("./src/Routes/public.route"));
const user_route_1 = __importDefault(require("./src/Routes/user.route"));
const project_route_1 = __importDefault(require("./src/Routes/project.route"));
const PORT = parseInt(process.env.PORT || "4000", 10);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// routers
app.use("/public/", public_route_1.default);
app.use("/api/user", user_route_1.default);
app.use("/api/projects", project_route_1.default);
app.get("*", (req, res) => {
    res.status(200).json({
        active: true,
        error: false,
    });
});
(async () => {
    await (0, Connect_DB_1.default)();
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`server started on port:${PORT}`);
    });
})();
