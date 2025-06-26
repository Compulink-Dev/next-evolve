// utils/getDominantColor.ts
export const getDominantColor = async (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve('#ffffff');
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          const colorCounts: Record<string, number> = {};
          
          // Sample some pixels to find dominant color
          for (let i = 0; i < imageData.length; i += 16 * 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const a = imageData[i + 3];
            
            if (a > 128) { // Only count non-transparent pixels
              const color = `${r},${g},${b}`;
              colorCounts[color] = (colorCounts[color] || 0) + 1;
            }
          }
          
          const dominantColor = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '255,255,255';
          resolve(`rgb(${dominantColor})`);
        } catch {
          resolve('#ffffff');
        }
      };
      
      img.onerror = () => resolve('#ffffff');
    });
  };