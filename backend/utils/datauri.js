import DataUriParser from "datauri/parser.js";
import path from "path";

export const dataUri = (file) => {
    const parser = new DataUriParser();
    // Extract file extension
    const extName = path.extname(file.originalname).toString().toLowerCase();

    // Check if the file buffer exists, then format it as a data URI
    if (!file || !file.buffer) {
        throw new Error("File buffer is missing");
    }

    // Convert file buffer to data URI format
    return parser.format(extName, file.buffer);
};

export default dataUri;
