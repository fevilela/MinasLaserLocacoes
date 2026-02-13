
export interface NavLink {
  label: string;
  href: string;
}

export interface Equipment {
  id: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
  category: string;
  specs?: { label: string; value: string }[];
  additionalImages?: string[];
  videoUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  instructor: string;
  image: string;
  modules?: string[];
}

export interface Differential {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}