import axios from "axios";

export const CoreInstance = axios.create({
    baseURL:`https://www.centralfile-sisadcloud.com:11470/api/`,
});

export const SaveDocumentUpdate = `https://www.centralfile-sisadcloud.com:11470/api/`;