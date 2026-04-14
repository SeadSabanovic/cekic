'use client';

import { useState, useLayoutEffect } from 'react';

export default function useScroll() {
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    /* Odmah uskladi s trenutnim scrollom (npr. restore nakon refresha) prije prvog paint-a. */
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}
