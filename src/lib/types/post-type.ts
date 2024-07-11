export interface Post {
    postID?: string;
    posterID?: string;
    title?: string;
    postedDate?: Date;
    category?: string;
    content?: string;
    resolved?: boolean;
    resolvedComment?: string | null;
    emphatizeCount?: number;
    archived?: boolean;
    banned?: boolean;
}