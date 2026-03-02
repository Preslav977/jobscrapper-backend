import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export { upload };
//# sourceMappingURL=multerConfiguration.js.map