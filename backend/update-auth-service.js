const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/auth/auth.service.ts');
let content = fs.readFileSync(file, 'utf8');

const forgotPasswordCode = `
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Always return the same message to avoid email enumeration
    const message = { message: 'If that email exists, a reset link has been sent.' };

    if (!user) {
      return message;
    }

    // 1. Delete existing unused tokens
    await this.prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, used: false },
    });

    // 2. Generate raw token and hash it
    const plainToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(plainToken).digest('hex');
    
    // 3. Store in DB (expires in 30 minutes)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
        used: false,
      },
    });

    // 4. Send Email
    await this.emailService.sendPasswordResetEmail(user.email, plainToken, user.fullName.split(' ')[0]);

    return message;
  }

  async validateResetToken(token: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken) {
      return { valid: false, reason: 'invalid' };
    }

    if (resetToken.used) {
      return { valid: false, reason: 'used' };
    }

    if (new Date() > resetToken.expiresAt) {
      return { valid: false, reason: 'expired' };
    }

    return { valid: true };
  }

  async resetPassword(token: string, newPassword: string) {
    if (newPassword.length < 8) {
      throw new ConflictException('Password must be at least 8 characters long');
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken) {
      throw new ForbiddenException({ error: 'invalid_token' });
    }

    if (resetToken.used) {
      throw new ForbiddenException({ error: 'token_used' });
    }

    if (new Date() > resetToken.expiresAt) {
      throw new ForbiddenException({ error: 'token_expired' });
    }

    // Hash new password
    const hash = await bcrypt.hash(newPassword, 12);

    // Update user password and mark token as used
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hash },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ]);

    return { message: 'Password updated successfully' };
  }
`;

if (!content.includes('async forgotPassword')) {
  content = content.replace('async login(dto: LoginDto) {', forgotPasswordCode + '\n  async login(dto: LoginDto) {');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Added forgot password logic to auth.service.ts');
} else {
  console.log('Already added');
}
