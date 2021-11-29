// api request body for feedback
export interface FeedbackInfo {
  label: string;
  message: string;
}

// api response for the new feedback created
export interface NewFeedbackResponse {
  url: string;
  number: number;
}
