'use client';

import { ParallaxProvider } from 'react-scroll-parallax';
import useLenisScroll from '@/components/animation/lenis';

export default function ClientWrapper({ children }) {
  useLenisScroll(); // 🔥 aktifkan smooth scroll

  return <ParallaxProvider>{children}</ParallaxProvider>;
}
