import { google } from "googleapis";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Decode the base64 encoded JSON key from the environment variable
const serviceAccountKey = JSON.parse(
  Buffer.from(process.env.GOOGLE_CREDENTIALS!, "base64").toString("utf-8")
);

// OAuth2 setup for service account
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccountKey,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

// Function to upload file to Google Drive
export const uploadToGoogleDrive = async (file: any) => {
  try {
    const drive = google.drive({ version: "v3", auth });

    const fileMetadata = {
      name: file.split("/")[2],
    };
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file),
    };

    const response = await drive.files.create({
      // @ts-ignore
      resource: fileMetadata,
      media: media,
      fields: "id, webViewLink, webContentLink",
    });

    await drive.permissions.create({
      // @ts-ignore
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    fs.unlinkSync(file);
    //@ts-ignore
    return response.data.webViewLink;
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    throw error;
  }
};

// in this if we are update a document then need to delte the previous file from the google drive

export const updateToGoogleDrive = async (file: any, fileId: string) => {
  try {
    const drive = google.drive({ version: "v3", auth });

    const fileMetadata = {
      name: file.split("/")[2],
    };
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file),
    };

    const response = await drive.files.update({
      // @ts-ignore
      fileId: fileId,
      media: media,
      fields: "id, webViewLink, webContentLink",
    });

    await drive.permissions.create({
      // @ts-ignore
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    fs.unlinkSync(file);
    //@ts-ignore
    return response.data.webViewLink;
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    throw error;
  }
};
