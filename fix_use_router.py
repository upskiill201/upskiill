import sys

filepath = "frontend/app/creator/builder/[id]/CurriculumBuilderMain.tsx"
with open(filepath, "r") as f:
    content = f.read()

# I already tried adding useRouter above, maybe it failed or got wiped out. Let's make sure.
if "import { useRouter } from 'next/navigation';" not in content:
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useRouter } from 'next/navigation';")

with open(filepath, "w") as f:
    f.write(content)
