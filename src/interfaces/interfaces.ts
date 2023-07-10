export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
}

export interface CommentDTO {
  content: string;
  postId: number;
}

export interface Community {
  id: number;
  name: string;
  imageUrl: string;
}

export interface CommunityDTO {
  name: string;
  imageUrl: string;
}

export interface PostCreator {
  id: number;
  username: string;
  email: string;
}

export interface Post {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  comments: Comment[];
  community: Community;
  creator: User;
}

export interface PostDTO {
  title: string;
  description: string;
  imageUrl: string;
  communityId: number;
}

export interface DecodedJWT {
  username: string;
  email: string;
}

export interface BackendErrorResponse {
  message: string;
  statusCode: number;
}

export interface loggedIn {
  access_token: string;
}
