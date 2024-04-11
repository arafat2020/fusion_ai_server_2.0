import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtServiceMock: Partial<JwtService>;

  beforeEach(async () => {
    // Mock JwtService
    jwtServiceMock = {
      verifyAsync: jest.fn(),
    } as Partial<JwtService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if token is not provided', async () => {
      const context: any = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {},
          }),
        }),
      };

      await expect(guard.canActivate(context)).rejects.toThrow(HttpException);
    });

    it('should throw HttpException if token is invalid', async () => {
      const token = 'invalid_token';
      (jwtServiceMock.verifyAsync as jest.Mock).mockRejectedValueOnce(new Error('Invalid token'));

      const context: any = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: { authorization: `Bearer ${token}` },
          }),
        }),
      };

      await expect(guard.canActivate(context)).rejects.toThrow(HttpException);
    });

    it('should set user in request object if token is valid', async () => {
      const token = 'valid_token';
      const payload = { userId: 1 };
      (jwtServiceMock.verifyAsync as jest.Mock).mockResolvedValueOnce(payload);

      const context: any = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: { authorization: `Bearer ${token}` },
          }),
        }),
      };

      await guard.canActivate(context);

      expect(context.switchToHttp().getRequest().user).toEqual(payload);
    });
  });
});
