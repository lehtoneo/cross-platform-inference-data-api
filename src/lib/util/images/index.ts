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
        const float32Array = new Float32Array(
          uint8Buffer.buffer,
          uint8Buffer.byteOffset,
          uint8Buffer.byteLength / Float32Array.BYTES_PER_ELEMENT
        );

        return Buffer.from(float32Array.buffer);
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
