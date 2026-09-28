import { Suspense } from 'react';
import { CouponBuilder } from '@/components/studio/coupons/CouponBuilder';

export default function NewCouponPage() {
  return (
    <Suspense>
      <CouponBuilder />
    </Suspense>
  );
}
