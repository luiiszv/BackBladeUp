

// src/utils/firebaseStorage.ts

import admin from "../config/firebase";
import fs from "fs/promises";

export class FirebaseStorageService {
  private bucket = admin.storage().bucket();

  async uploadFile(
    folder: string,
    filePath: string,
    originalName: string,
    mimetype: string,
    metadata?: Record<string, string>
  ): Promise<string> {
    const filename = `${folder}/${Date.now()}-${originalName.replace(/\s+/g, "_")}`;

    await this.bucket.upload(filePath, {
      destination: filename,
      metadata: {
        contentType: mimetype,
        metadata: metadata || {},
      },
      public: true,
    });

    await this.bucket.file(filename).makePublic();

    const [publicUrl] = await this.bucket.file(filename).getSignedUrl({
      action: "read",
      expires: "03-09-2491", // fecha muy lejana para simular público
    });

    // Eliminar archivo temporal local
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Error cleaning temp file:", error);
    }

    return publicUrl;
  }
}
