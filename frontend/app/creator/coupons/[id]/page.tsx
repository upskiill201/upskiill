import { CouponDetailView } from '@/components/studio/coupons/CouponDetailView';

export default async function CouponPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CouponDetailView id={id} />;
}
