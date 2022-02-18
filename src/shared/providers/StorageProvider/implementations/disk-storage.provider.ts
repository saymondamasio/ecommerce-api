import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { storageConfig } from 'src/config/storage';
import { IStorageProvider } from '../models/storage.provider';

@Injectable()
export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(storageConfig.tmpFolder, file),
      path.resolve(storageConfig.uploadFolder, folder, file),
    );

    return file;
  }

  public async deleteFile(file: string, folder: string): Promise<void> {
    const filePath = path.resolve(storageConfig.uploadFolder, folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
