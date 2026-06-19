const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/auth/auth.controller.ts');
let content = fs.readFileSync(file, 'utf8');

const endpointsCode = `
  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 per hour
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    if (!email) {
      return { message: 'If that email exists, a reset link has been sent.' };
    }
    return this.authService.forgotPassword(email);
  }

  @Get('validate-token')
  async validateResetToken(@Query('token') token: string) {
    if (!token) return { valid: false, reason: 'invalid' };
    return this.authService.validateResetToken(token);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: any) {
    const { token, newPassword } = body;
    if (!token || !newPassword) {
      throw new Error('Token and new password are required');
    }
    return this.authService.resetPassword(token, newPassword);
  }
`;

if (!content.includes('@Post(\'forgot-password\')')) {
  content = content.replace('  @Get(\'check-email\')', endpointsCode + '\n  @Get(\'check-email\')');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Added endpoints to auth.controller.ts');
} else {
  console.log('Endpoints already added');
}
