export const blogName = 'Lime';
export const menuItems = [
  { title: 'home', path: '/' },
  { title: 'profile', path: '/profile' },
  { title: 'about', path: '/about' },
];
export const TOKEN_KEY = 'IdToken'

export interface UserInfo {
  uid: string,
  email: string | undefined,
  picture: string | undefined,
}

export interface PostPublish {
  title: string,
  data: {}
}