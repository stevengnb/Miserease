export interface Post {
    postID?: String;
    posterID?: String;
    title?: String;
    postedDate?: Date;
    category?: String;
    content?: String;
    status?: Boolean;
    resolvedComment?: String | null;
    emphatizeCount?: number;
}