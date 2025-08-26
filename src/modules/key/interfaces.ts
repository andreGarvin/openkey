// api response for key information
export interface KeyInfoResponse {
  alias: string;
  created_at: string;
  expires_at: string;
  url: {
    href: string;
    secure: boolean;
    redirects?: string;
  };
}

// api response for report information
export interface ReportInfoResponse {
  report_id: string;
}

// api request body for key
export interface NewKeyInfo {
  url: string;
  expiration: string | number;
}

// api request body for report
export interface NewReportInfo {
  message: string;
}
