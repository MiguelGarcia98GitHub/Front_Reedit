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
  userId: number;
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
  creatorId: number;
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
  creatorId: number;
  communityId: number;
}
