import sys

filepath = "frontend/app/creator/builder/[id]/CurriculumBuilderMain.tsx"
with open(filepath, "r") as f:
    content = f.read()

content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useRouter } from 'next/navigation';")

if "const router = useRouter();" not in content:
    content = content.replace("export default function CurriculumBuilder({ courseId, onBack, onSaveStatus }: Props) {", "export default function CurriculumBuilder({ courseId, onBack, onSaveStatus }: Props) {\n  const router = useRouter();")

old_func = """  const handleBuildLesson = (lessonId: string) => {
    setPremiumModal({
      title: 'Step 3: Lesson Builder',
      desc: 'The Lesson Builder is the ultimate tool to craft engaging learning journeys (Learn → Apply → Reflect → Deepen). It will be unlocked in the next step of the wizard.',
    });
  };"""

new_func = """  const handleBuildLesson = (lessonId: string) => {
    router.push(`/creator/courses/${courseId}/lesson-builder/${lessonId}`);
  };"""

content = content.replace(old_func, new_func)

with open(filepath, "w") as f:
    f.write(content)

print("Updated CurriculumBuilderMain.tsx")
