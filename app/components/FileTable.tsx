import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
  Checkbox,
} from '@nextui-org/react';
import { FileWithMetadata } from '../types';
import { ArrowDownCircleIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Key } from '@react-types/shared'; // Importamos el tipo Key

interface FileTableProps {
  files: FileWithMetadata[];
  onDeleteFile: (file: FileWithMetadata) => void;
}

const FileTable: React.FC<FileTableProps> = ({ files, onDeleteFile }) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set<Key>());
  const [selectAll, setSelectAll] = useState(false);

  // Manejamos el cambio de selección individual
  const handleSelectionChange = (
    key: Key,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedKeys = new Set(selectedKeys);
    if (event.target.checked) {
      updatedKeys.add(key); // Agregamos la key si el checkbox está seleccionado
    } else {
      updatedKeys.delete(key); // Eliminamos la key si se deselecciona
    }
    setSelectedKeys(updatedKeys);
    setSelectAll(updatedKeys.size === files.length); // Verificamos si todos los elementos están seleccionados
  };

  // Manejamos el cambio del checkbox "Select All"
  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const allKeys = new Set(files.map((file) => file.name as Key));
      setSelectedKeys(allKeys); // Seleccionamos todas las canciones
      setSelectAll(true); // Activamos la selección de todas
    } else {
      setSelectedKeys(new Set<Key>()); // Deseleccionamos todas las canciones
      setSelectAll(false); // Desactivamos la selección de todas
    }
  };

  // Lógica de descarga de archivos seleccionados
  const handleDownloadSelected = () => {
    const selectedFiles = files.filter((file) =>
      selectedKeys.has(file.name as Key)
    );
    // Aquí puedes manejar la descarga de los archivos seleccionados
    console.log('Archivos seleccionados:', selectedFiles);
  };

  // Renderizado de cada celda
  const renderCell = (file: FileWithMetadata, columnKey: string) => {
    switch (columnKey) {
      case 'select':
        return (
          <Checkbox
            isSelected={selectedKeys.has(file.name as Key)}
            onChange={(e) => handleSelectionChange(file.name as Key, e)} // Manejamos el evento de cambio del checkbox
          />
        );
      case 'cover':
        return (
          <User
            avatarProps={{
              src: file.coverImage || '/cover-placeholder.jpg',
              alt: 'Cover Image',
              radius: 'lg',
            }}
            name={file.title}
          />
        );
      case 'artist':
        return <p>{file.artist}</p>;
      case 'genre':
        return <p>{file.genre}</p>;
      case 'year':
        return <p>{file.year}</p>;
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Download">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <ArrowDownCircleIcon className="h-5 w-5" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => onDeleteFile(file)}
              >
                <TrashIcon className="h-5 w-5" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Table aria-label="Songs Table" className="mt-6">
        <TableHeader>
          <TableColumn>
            <Checkbox
              isSelected={selectAll}
              onChange={handleSelectAllChange} // Manejamos el checkbox de seleccionar todo
            />
          </TableColumn>
          <TableColumn>Cover</TableColumn>
          <TableColumn>Artist</TableColumn>
          <TableColumn>Genre</TableColumn>
          <TableColumn>Year</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              {['select', 'cover', 'artist', 'genre', 'year', 'actions'].map(
                (columnKey) => (
                  <TableCell key={columnKey}>
                    {renderCell(file, columnKey)}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedKeys.size > 0 && (
        <div className="fixed bottom-4 z-50 left-1/2 transform -translate-x-1/2">
          <Button
            size="lg"
            color="primary"
            variant="shadow"
            radius="lg"
            onClick={handleDownloadSelected}
          >
            Download Selected ({selectedKeys.size})
          </Button>
        </div>
      )}
    </>
  );
};

export default FileTable;
