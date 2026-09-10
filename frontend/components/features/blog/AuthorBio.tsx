import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Author } from '@/lib/blog/types';
import styles from './AuthorBio.module.css';

interface AuthorBioProps {
  author: Author;
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <section className={styles.bio} aria-label={`Written by ${author.name}`}>
      <div className={styles.avatarWrap}>
        {author.avatarUrl ? (
          <Image
            src={author.avatarUrl}
            alt=""
            width={64}
            height={64}
            className={styles.avatar}
          />
        ) : (
          <span className={`${styles.avatar} ${styles.avatarFallback}`}>
            {author.name.charAt(0)}
          </span>
        )}
      </div>
      <div className={styles.text}>
        <p className={styles.kicker}>Written by</p>
        <p className={styles.name}>{author.name}</p>
        <p className={styles.role}>{author.role}</p>
        <p className={styles.description}>{author.bio}</p>
        <Link href={`/blog/author/${author.slug}`} className={styles.link}>
          More from {author.name}
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}
