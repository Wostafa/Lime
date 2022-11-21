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
// type of post when publish from editor
export interface PostPublish {
  title: string,
  data: {
    blocks: [],
    time: number
  }
}
// type of post stored in firebase
export interface PostStored {
  post: PostPublish,
  user: UserInfo,
  slug: string
}

export interface CardProps {
  slug: string;
  image: string,
  title: string;
}