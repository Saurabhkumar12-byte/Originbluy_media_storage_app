"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mediaRoutes_1 = __importDefault(require("./routes/mediaRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/media', mediaRoutes_1.default);
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
});
exports.default = app;
