import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const auth = req.headers['authorization'] as string | undefined;
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

    if (!token) throw new UnauthorizedException('Missing Bearer token');

    try {
      const payload = this.jwt.verify(token); // проверяет подпись + exp
      req.user = payload;                    // сохраняем payload в request
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
