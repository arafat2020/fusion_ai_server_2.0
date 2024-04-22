import { ImageMiddleware } from './image.middleware';

describe('ImageMiddleware', () => {
  it('should be defined', () => {
    expect(new ImageMiddleware()).toBeDefined();
  });
});
