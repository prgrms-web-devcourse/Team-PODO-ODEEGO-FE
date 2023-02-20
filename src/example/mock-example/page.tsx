'use client';

import { useEffect } from 'react';

export default function MockExample() {
  //client side에서 data mockAPI
  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('../../src/mocks/browser');
        worker.start();

        const res = await fetch('https://example.com/reviews');
        const result = await res.json();
        console.log('api result: ', result);
      }
    })();
  }, []);

  return (
    <>
      <h1>Mock Example Page</h1>
    </>
  );
}
