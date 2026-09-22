import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const uploadsDirectory = path.resolve('uploads');

export async function saveUpload(file: Buffer, folder: string, extension: string) {
  const directory = path.join(uploadsDirectory, folder);

  await mkdir(directory, {
    recursive: true,
  });

  const fileName = `${randomUUID()}${extension}`;
  const filePath = path.join(directory, fileName);

  await writeFile(filePath, file);

  return `/uploads/${folder}/${fileName}`;
}

export async function deleteUpload(fileUrl: string) {
  if (!fileUrl.startsWith('/uploads/')) {
    return;
  }

  const filePath = path.resolve(fileUrl.slice(1));

  try {
    await unlink(filePath);
  } catch {
    // Arquivo já não existe.
  }
}
