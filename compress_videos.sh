#!/bin/bash

DIR="public/assets/videos"
OUTPUT_DIR="$DIR/optimizados"

mkdir -p "$OUTPUT_DIR"

echo "========================================================="
echo "Iniciando optimización TOTAL de videos (Compresión 720p)"
echo "Esto tomará varios minutos debido al tamaño original..."
echo "========================================================="

# Optimizar los archivos MP4
for file in "$DIR"/*.mp4; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    echo "Comprimiendo: $filename"
    ffmpeg -i "$file" -vf "scale=720:-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k "$OUTPUT_DIR/$filename" -y -loglevel warning
    
    # Si la compresión fue exitosa, reemplazar el original
    if [ $? -eq 0 ]; then
      mv "$OUTPUT_DIR/$filename" "$file"
      echo "  -> Reemplazado por versión optimizada."
    else
      echo "  -> Error al comprimir $filename"
    fi
  fi
done

# Eliminar carpeta temporal
rm -rf "$OUTPUT_DIR"

# Eliminar archivos .webm innecesarios que ocupan espacio (el código usa solo .mp4)
echo "Limpiando archivos .webm duplicados para ahorrar espacio..."
rm -f "$DIR"/*.webm

echo "========================================================="
echo "¡LISTO! Todos los videos han sido comprimidos y reemplazados."
echo "========================================================="
