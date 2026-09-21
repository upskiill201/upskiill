import { RenderedEmail } from '../../types';
import {
  clip,
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
} from '../shared';

export interface NewStudentEmailData {
  firstName: string;
  courseName: string;
  studentsCount: number;
  studioUrl: string;
}

export function renderNewStudentEmail(
  data: NewStudentEmailData,
): RenderedEmail {
  const name = safeName(data.firstName);
  const courseName = escapeHtml(clip(data.courseName));

  const bodyHtml = `
    ${paragraph(`Someone just joined your course, ${name}.`)}
    ${paragraph(`<strong>${courseName}</strong> now has <strong>${data.studentsCount}</strong> ${data.studentsCount === 1 ? 'learner' : 'learners'}.`)}
    ${ctaButton('Open Creator Studio', data.studioUrl)}
  `;

  return {
    subject: 'Someone just joined your course',
    html: renderLayout({
      bodyHtml,
      preheader: `New student in ${data.courseName}`,
    }),
  };
}
