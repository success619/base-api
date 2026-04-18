"use strict";
import fs from "fs";
const analyseMulterStorageDestination = (path) => {
    let structuredPath = path.toString();
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
    return structuredPath;
};
export { analyseMulterStorageDestination };
export default {
    analyseMulterStorageDestination
};
