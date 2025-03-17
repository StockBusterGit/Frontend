import '@testing-library/jest-dom';

// Mock pour App Router (next/navigation)
jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      pathname: '/',
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  };
});