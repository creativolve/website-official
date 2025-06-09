'use client';

import { ParallaxProvider } from 'react-scroll-parallax';

export default function ClientWrapper({ children }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
