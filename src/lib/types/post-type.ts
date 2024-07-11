export interface Post {
    postID?: string;
    posterID?: string;
    title?: string;
    postedDate?: Date;
    category?: string;
    content?: string;
    status?: boolean;
    resolvedComment?: string | null;
    emphatizeCount?: number;
}