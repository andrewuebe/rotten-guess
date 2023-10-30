export const config = {
  protocol: !!process.env.NEXT_PUBLIC_IS_DEV ? 'http://' : 'https://',
  baseUrls: {
    api: !!process.env.NEXT_PUBLIC_IS_DEV ? `${process.env.LOCAL_URL_PREFIX}:3000` : 'api.example.com',
  }
}