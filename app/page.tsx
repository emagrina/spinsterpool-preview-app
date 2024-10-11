'use client';

import { useState } from 'react';
import { Header } from './components/Header';
import CustomDropzone from './components/CustomDropzone';
import FileTable from './components/FileTable';
import { FileWithMetadata } from './types';

export default function Home() {
  const [files, setFiles] = useState<FileWithMetadata[]>([]);

  const handleFilesAccepted = (acceptedFiles: FileWithMetadata[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleDeleteFile = (fileToDelete: FileWithMetadata) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <CustomDropzone
          onFilesAccepted={handleFilesAccepted}
          existingFiles={files}
        />
        {files.length > 0 && (
          <FileTable files={files} onDeleteFile={handleDeleteFile} />
        )}
      </div>
    </div>
  );
}
