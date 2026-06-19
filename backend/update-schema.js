const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
if (!schema.includes('model PasswordResetToken')) {
  const modelStr = `
model PasswordResetToken {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tokenHash String   @unique
  expiresAt DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([tokenHash])
  @@index([userId])
}`;
  schema += '\n' + modelStr + '\n';
  fs.writeFileSync('prisma/schema.prisma', schema, 'utf8');
  console.log('Added PasswordResetToken model');
}
