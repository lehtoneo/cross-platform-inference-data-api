import sharp from 'sharp';

const imageUtil = {
  async getRawImageBuffer(path: string, type: 'uint8' | 'float32') {
    const image = sharp(path);
    const uint8Buffer = await image.raw().toBuffer();

    switch (type) {
      case 'uint8':
        return uint8Buffer;
      case 'float32':
        // Convert to Float32Array
        const float32Data = new Float32Array(uint8Buffer.length);
        for (let i = 0; i < uint8Buffer.length; i++) {
          float32Data[i] = uint8Buffer[i] / 255.0; // Normalize the pixel values
        }
        // create buffer from float32Data
        return Buffer.from(float32Data.buffer);
      default:
        throw new Error('Invalid type');
    }
  },
  async getImageBuffer(path: string) {
    const image = sharp(path);
    return await image.toBuffer();
  },
  async getBase64Image(path: string) {
    const image = sharp(path);
    const uint8Buffer = await image.raw().toBuffer();
    return uint8Buffer.toString('base64');
  }
};

export default imageUtil;
