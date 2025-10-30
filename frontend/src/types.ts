export interface Instructor {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
}

export interface Course {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  schedule: string;
  instructor: Instructor;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  teacher: Instructor;
  course: Course;
  location: string;
  seats: number;
  seats_left: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  published_at: string;
  author: Instructor;
  is_featured: boolean;
}

export interface Video {
  id: number;
  youtube_id: string;
  title: string;
  description: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
}

export interface ContactRequestInput {
  name: string;
  email: string;
  message: string;
}
