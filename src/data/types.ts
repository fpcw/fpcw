import { Document } from "@contentful/rich-text-types";

export interface Page {
    id: string;
    title: string;
    metaTitle?: string;
    metaDescription?: string;
}

export interface Gallery {
    id: string;
    title: string;
    photos: {
        title: string;
        description: string;
        url: string;
    }[];
}

export interface Post {
    id: string;
    title: string;
    metaTitle?: string;
    metaDescription?: string;
    slug: string;
    feature: string;
    body: Document;
}

export interface Profile {
    id: string;
    name: string;
    slug: string;
    headshot: string;
    bio: Document;
    description?: string;
    jobTitle: string;
    credential?: string;
}

export interface Review {
    id: string;
    author: string;
    link?: string;
    content: Document;
}
