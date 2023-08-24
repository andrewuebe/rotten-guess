export const config = {
  protocol: !!process.env.NEXT_PUBLIC_IS_DEV ? 'http://' : 'https://',
  baseUrls: {
    api: !!process.env.NEXT_PUBLIC_IS_DEV ? 'localhost:3000' : 'api.example.com',
  }
}