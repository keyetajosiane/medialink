const path = require("path");
const fs = require("fs").promises;
const { fromPath } = require("pdf2pic");

exports.generateThumbnail = async (pdfPath) => {
    const options = {
      density: 100,   // Set the density (DPI) of the image
      format: "png",  // Output image format
      width: 600,     // Output image width
      height: 600,    // Output image height
    };
    pdfPath = path.join(__dirname, "..", pdfPath);
    const pdf2picConverter = fromPath(pdfPath, options);
  
    try {
      const page = 1;
      const thumbnail = await pdf2picConverter(page);
      const imagePath = thumbnail.path;
      
      // Read the image file and convert it to base64
      const imageBuffer = await fs.readFile(imagePath);
      const imageBase64 = imageBuffer.toString('base64');
      
      // Optionally, delete the image file if you don't need to keep it
      await fs.unlink(imagePath);
  
      return imageBase64; // Return the base64-encoded string
    } catch (error) {
      console.error("Error generating PDF thumbnail:", error);
      throw error;
    }
  };
