import sharp from 'sharp';

const imageUtil = {
  async getRawImageBuffer(path: string) {
    const image = sharp(path);
    const uint8Buffer = await image.raw().toBuffer();

    return uint8Buffer;
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
