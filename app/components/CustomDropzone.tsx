import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import * as mm from 'music-metadata';
import { FileWithMetadata } from '../types';

const CustomDropzone = ({
  onFilesAccepted,
}: {
  onFilesAccepted: (files: FileWithMetadata[]) => void;
  existingFiles: FileWithMetadata[];
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const extractMetadata = async (file: File): Promise<FileWithMetadata> => {
    const buffer = await file.arrayBuffer();
    const metadata = await mm.parseBuffer(Buffer.from(buffer), file.type);

    let coverImage: string | undefined = undefined; // Cambiamos null a undefined para el tipo
    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const picture = metadata.common.picture[0];
      const blob = new Blob([picture.data], { type: picture.format });
      coverImage = URL.createObjectURL(blob);
    }

    return {
      name: file.name,
      title: metadata.common.title || file.name,
      artist: metadata.common.artist || 'Unknown Artist',
      genre: metadata.common.genre ? metadata.common.genre[0] : 'Unknown Genre',
      year: metadata.common.year
        ? metadata.common.year.toString()
        : 'Unknown Year',
      size: file.size,
      coverImage, // undefined si no hay imagen
    };
  };

  const handleDrop = async (acceptedFiles: File[]) => {
    setIsDragging(false);

    const newFiles: FileWithMetadata[] = await Promise.all(
      acceptedFiles.map((file) => extractMetadata(file))
    );

    onFilesAccepted(newFiles); // Devuelve FileWithMetadata[]
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: {
      'audio/*': ['.mp3', '.wav'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`flex items-center justify-center border-3 border-dashed border-[#27272a] p-6 text-center transition-all duration-300 ease-in-out rounded-lg h-64 bg-[#18181b] cursor-pointer ${
        isDragging ? 'border-primary-900' : 'border-gray-300 '
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-500 text-lg">
        {isDragging
          ? 'Drop your files here'
          : 'Drag and drop files, or click to select'}
      </p>
    </div>
  );
};

export default CustomDropzone;
