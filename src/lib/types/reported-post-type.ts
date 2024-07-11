export interface ReportedPost {
    reportedPostID?: string; // the id of the document
    reportedPost?: string; // the id of the reported post
    reasons?: string[];
    timesReported?: number;
    status?: string;
}