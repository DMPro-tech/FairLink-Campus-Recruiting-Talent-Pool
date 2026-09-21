export type SentimentStatus =
  | 'fast-track'
  | 'tech-screen'
  | 'culture-fit'
  | 'infra-team'
  | 'archived'
  | 'pending';

export type CandidateTrack = 'new-grad' | 'intern';

export type InterviewStatus =
  | 'none'
  | '1st-round-scheduled'
  | 'interview-scheduled'
  | 'code-sample-requested'
  | 'take-home-sent';

export interface CandidateAssets {
  resumeUrl?: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  githubUrl?: string;
  githubReposCount?: number;
  githubSkills?: string;
  linkedinUrl?: string;
  audioPitchUrl?: string;
  audioPitchTitle?: string;
  audioPitchDuration?: string;
  arxivPaperUrl?: string;
  portfolioUrl?: string;
}

export interface ApplicationRecord {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  school: string;
  degree: string;
  major: string;
  gradYear: string;
  gradTerm: string;
  gpa: number;
  track: CandidateTrack;
  matchScore: number;
  sentimentStatus: SentimentStatus;
  priority: boolean;
  specialization: string;
  notes: string;
  roleSeeking: string;
  evaluated: boolean;
  assets: CandidateAssets;
  boothNumber: string;
  recruiterName: string;
  interviewStatus: InterviewStatus;
  atsSynced: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationStats {
  total: number;
  priority: number;
  newGrad: number;
  intern: number;
  evaluated: number;
  fastTrack: number;
  atsSynced: number;
}

export type StatusFilter =
  | 'all'
  | 'priority'
  | 'new-grad'
  | 'intern'
  | 'fast-track'
  | 'tech-screen'
  | 'evaluated';

export type SortOption =
  | 'match-desc'
  | 'match-asc'
  | 'gpa-desc'
  | 'name-asc'
  | 'recent';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  stats?: ApplicationStats;
  message?: string;
  error?: string;
}

export interface CreateApplicationDTO {
  candidateName: string;
  candidateAvatar?: string;
  school: string;
  degree?: string;
  major?: string;
  gradYear?: string;
  gradTerm?: string;
  gpa?: number;
  track?: CandidateTrack;
  matchScore?: number;
  sentimentStatus?: SentimentStatus;
  priority?: boolean;
  specialization?: string;
  notes?: string;
  roleSeeking?: string;
  boothNumber?: string;
  recruiterName?: string;
  interviewStatus?: InterviewStatus;
}

export interface UpdateApplicationDTO {
  candidateName?: string;
  school?: string;
  degree?: string;
  major?: string;
  gpa?: number;
  track?: CandidateTrack;
  matchScore?: number;
  sentimentStatus?: SentimentStatus;
  priority?: boolean;
  specialization?: string;
  notes?: string;
  roleSeeking?: string;
  evaluated?: boolean;
  interviewStatus?: InterviewStatus;
  atsSynced?: boolean;
}

export interface HttpLogEntry {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  statusCode: number;
  statusText: string;
  requestPayload?: any;
  responsePayload?: any;
  durationMs: number;
}
