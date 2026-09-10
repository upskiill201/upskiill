/**
 * Fired whenever a learner gains access to a course (direct enroll, order
 * fulfillment, payment webhook). Listened to by the community module to
 * auto-seat the learner in that course's community.
 */
export class EnrollmentCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly courseId: string,
  ) {}
}
