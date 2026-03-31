import styles from './Spinner.module.css';

type SpinnerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'grey';
  centered?: boolean;
};

export default function Spinner({
  size = 'md',
  color = 'blue',
  centered = false,
}: SpinnerProps) {
  const spinner = (
    <span
      className={[styles.spinner, styles[size], styles[color]].join(' ')}
      role="status"
      aria-label="Loading"
    />
  );

  if (centered) {
    return <div className={styles.centered}>{spinner}</div>;
  }

  return spinner;
}
