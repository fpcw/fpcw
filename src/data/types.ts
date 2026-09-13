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

/** Credentials held by clinical providers, as opposed to office staff. */
export const CLINICAL_CREDENTIALS = ["MD", "DO", "PMHNP", "LMFT", "LCSW"];

export interface Review {
    id: string;
    author: string;
    link?: string;
    content: Document;
}
