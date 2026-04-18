"use strict";
import clientS3 from "@aws-sdk/client-s3";
const { S3Client } = clientS3;
if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('Missing required AWS environment variables.');
}
const s3Client = new S3Client({
    region: process.env.AWS_REGION?.trim(),
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID?.trim(),
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.trim(),
    },
});
export { s3Client };
export default {
    s3Client
};
