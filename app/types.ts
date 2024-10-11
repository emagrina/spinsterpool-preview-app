export interface FileWithMetadata {
  name: string; // Nombre del archivo (original)
  title: string; // Título de la canción (extraído de la metadata)
  artist: string; // Artista (extraído de la metadata)
  genre: string; // Género musical (extraído de la metadata)
  year: string; // Año de grabación (extraído de la metadata)
  size: number; // Tamaño del archivo en bytes
  coverImage?: string; // URL de la imagen de portada (si está disponible)
}
