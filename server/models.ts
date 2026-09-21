import {
  ApplicationRecord,
  CreateApplicationDTO,
  UpdateApplicationDTO,
  ApplicationStats,
  StatusFilter,
  SortOption,
} from '../src/types.js';

// In-memory data store seeded with initial records matching Stitch design
export const initialApplications: ApplicationRecord[] = [
  {
    id: 'app-001',
    candidateName: 'Maya Lin',
    candidateAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmLxL2Z9yb_mjF-PBqiz_d4uaKIbcWF-dq4p8kgktRTMn4C40e2EwfVXEmZXO2XAS88kqWVDGrco1xPrnllU5tCZn5uipbsGXv-8qYnEyFmDq9cAbmbwiSGQiTquaqdv-gwYSRhK-XPyJ01CHBeJ-esBMt8ppcFwQvF6iT4l7XrSdbbb2ZH_cT_u6O9GLI5MEgZSFE0m_NBAQRSTSk-FN4h_gMWmSi_fPQua38X4HOsalxW5ZlE29ZnQ',
    school: 'Stanford University',
    degree: 'B.S. CS',
    major: 'Computer Science & HCI',
    gradYear: '25',
    gradTerm: "Fall '25",
    gpa: 3.92,
    track: 'new-grad',
    matchScore: 98,
    sentimentStatus: 'fast-track',
    priority: true,
    specialization: 'Systems Architecture',
    notes: 'Strong system design & latency intuition. Spoke about distributed graph query engine project. Very articulate!',
    roleSeeking: 'Frontend Engineer / Full-Stack New Grad',
    evaluated: true,
    assets: {
      resumeFileName: 'Maya_Lin_Resume_StanfordCS.pdf',
      resumeFileSize: '184 KB',
      githubUrl: 'https://github.com/mayalin',
      githubReposCount: 42,
      githubSkills: 'React / TS / Rust',
      linkedinUrl: 'https://linkedin.com/in/mayalin-cs',
      audioPitchTitle: '"Why I built distributed storage"',
      audioPitchDuration: '0:30',
      portfolioUrl: 'https://mayalin.design',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: '1st-round-scheduled',
    atsSynced: false,
    createdAt: '2025-09-20T10:14:00Z',
    updatedAt: '2025-09-20T14:22:00Z',
  },
  {
    id: 'app-002',
    candidateName: 'David Zhao',
    candidateAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ya2g4YVxi0K77NkSI8jmXAjQrnshyMqlUorPqyxkiSifAjj4iYk4YIfuyPCC9240ytoaWGJjpVMUOFOxWTx3BPrV4vlyaf3mIYMa8bnthEghJ9MFclpA-54jbgFGSNwZibFZmjmM-3Q2_WRwy52Q8eimryEjnOTnGHyr0a8ymrYN_tU0onHktRIKZlP6DPfNj2YS6aURueMk94MNcd59k18Ahw8iEGGm387cM35HfOq2I0O80PQ9YA',
    school: 'UC Berkeley',
    degree: 'B.S. EECS',
    major: 'Electrical Engineering & Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.88,
    track: 'new-grad',
    matchScore: 94,
    sentimentStatus: 'tech-screen',
    priority: true,
    specialization: 'Distributed Systems',
    notes: 'Needs technical screen on distributed consensus protocols. Deep knowledge of Raft and Go network primitives.',
    roleSeeking: 'Infrastructure Engineer / Distributed Systems',
    evaluated: true,
    assets: {
      resumeFileName: 'David_Zhao_Resume.pdf',
      resumeFileSize: '142 KB',
      githubUrl: 'https://github.com/davidzhao-eecs',
      githubReposCount: 28,
      githubSkills: 'Go / Rust / gRPC',
      linkedinUrl: 'https://linkedin.com/in/david-zhao-eecs',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'interview-scheduled',
    atsSynced: false,
    createdAt: '2025-09-20T10:35:00Z',
    updatedAt: '2025-09-20T13:40:00Z',
  },
  {
    id: 'app-003',
    candidateName: 'Amara Patel',
    candidateAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFbn-QJDnoyd_rnOR2G6Z4Byq_dZoMNSWUbxYOO3YIurqK1i7_T7QYzu8SsZm9aGWz7_TABEFUH8OjA1FExCdzxPwfIb46kBvIP92ZJqMCJS0SUH4vYEfIj2gV4Ww8nYyBKXUNgiDNNWD2nHfjQKnW1wL-DPgOyJW0IoPYphbHY_90BRHD-WKqvluTM8QoW7tCv7BnZ_9dsdB77IQjsmyJ9xtFxAm_fPrWKGxkc-jE2oFJOjOXF85N0w',
    school: 'Carnegie Mellon',
    degree: 'B.S. CS & AI',
    major: 'Computer Science & Machine Learning',
    gradYear: '25',
    gradTerm: "May '25",
    gpa: 3.95,
    track: 'new-grad',
    matchScore: 89,
    sentimentStatus: 'fast-track',
    priority: true,
    specialization: 'Deep Learning & LLMs',
    notes: 'ML Platform lead candidate. Published NeurIPS workshop paper on KV-cache quantization for inference acceleration.',
    roleSeeking: 'Machine Learning Infrastructure Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Amara_Patel_CV.pdf',
      resumeFileSize: '210 KB',
      arxivPaperUrl: 'https://arxiv.org/abs/2403.09123',
      linkedinUrl: 'https://linkedin.com/in/amara-patel-ml',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'code-sample-requested',
    atsSynced: false,
    createdAt: '2025-09-20T11:05:00Z',
    updatedAt: '2025-09-20T14:10:00Z',
  },
  {
    id: 'app-004',
    candidateName: 'Jordan Lee',
    candidateAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsm_5d3ysVqThcpSxHvmM4WkxcQypEEtw8SDERbmmbkKElSQf7RqxJ6ZWT7adZJS-K4v9m8jKZ1eLgIWeYyze8JgU50dDtcjV1vpBi57T3KvC4XDJJRnCSbJqdzwXSMal7FxpzdB251btVEcBQOJDRMvE1We3K_Ubq6CrcM8EqliclUc6__VuCJm_w0-0Otzco00W-BiXtEVxYbMQwCZO30aEFAyroQJpzKtkfO9JduZV87k95Y_WA9w',
    school: 'MIT',
    degree: 'B.S. EECS',
    major: 'Electrical Engineering & Computer Science',
    gradYear: '25',
    gradTerm: "June '25",
    gpa: 3.9,
    track: 'new-grad',
    matchScore: 92,
    sentimentStatus: 'infra-team',
    priority: true,
    specialization: 'Cloud & Microservices',
    notes: 'Outstanding cloud infra foundation. Contributor to Envoy proxy filter modules and Kubernetes operators.',
    roleSeeking: 'Backend Platform Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Jordan_Lee_MIT_Resume.pdf',
      resumeFileSize: '156 KB',
      githubUrl: 'https://github.com/jordanlee-dev',
      githubReposCount: 34,
      githubSkills: 'C++ / Go / K8s',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'interview-scheduled',
    atsSynced: false,
    createdAt: '2025-09-20T11:20:00Z',
    updatedAt: '2025-09-20T14:15:00Z',
  },
  {
    id: 'app-005',
    candidateName: 'Sophia Chen',
    candidateAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    school: 'Harvard University',
    degree: 'B.S. CS & Math',
    major: 'Applied Mathematics & Computer Science',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.94,
    track: 'intern',
    matchScore: 91,
    sentimentStatus: 'fast-track',
    priority: true,
    specialization: 'High-Throughput Algorithms',
    notes: 'USAMO qualifier, ICPC World Finalist. Excellent algorithmic problem solving and low-level cache optimization.',
    roleSeeking: 'Software Engineering Summer Intern',
    evaluated: true,
    assets: {
      resumeFileName: 'Sophia_Chen_SWE_2026.pdf',
      resumeFileSize: '168 KB',
      githubUrl: 'https://github.com/sophiachen-math',
      githubReposCount: 19,
      githubSkills: 'C++ / Python / Algorithms',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: '1st-round-scheduled',
    atsSynced: false,
    createdAt: '2025-09-20T11:45:00Z',
    updatedAt: '2025-09-20T13:55:00Z',
  },
  {
    id: 'app-006',
    candidateName: 'Elena Rostova',
    candidateAvatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    school: 'UW Seattle',
    degree: 'B.S. CS',
    major: 'Computer Science & Design Ops',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.84,
    track: 'new-grad',
    matchScore: 88,
    sentimentStatus: 'culture-fit',
    priority: false,
    specialization: 'Full-Stack & UI Systems',
    notes: 'Great culture fit. Bridging design tokens, accessibility standards, and web performance metrics.',
    roleSeeking: 'Frontend Design Technologist / SWE',
    evaluated: true,
    assets: {
      resumeFileName: 'Elena_Rostova_DesignEng.pdf',
      resumeFileSize: '195 KB',
      portfolioUrl: 'https://elenarostova.dev',
      githubUrl: 'https://github.com/erostova',
      githubReposCount: 22,
      githubSkills: 'TypeScript / Next.js / Tailwind',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T12:00:00Z',
    updatedAt: '2025-09-20T14:30:00Z',
  },
  {
    id: 'app-007',
    candidateName: 'Marcus Vance',
    candidateAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    school: 'Georgia Tech',
    degree: 'B.S. CS',
    major: 'Computer Science (Systems)',
    gradYear: '25',
    gradTerm: "Fall '25",
    gpa: 3.79,
    track: 'new-grad',
    matchScore: 86,
    sentimentStatus: 'infra-team',
    priority: false,
    specialization: 'Distributed Database Engines',
    notes: 'Refer to Infra team. Built a simplified LSM-tree persistent key-value store with compaction in Rust.',
    roleSeeking: 'Database Storage Systems Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Marcus_Vance_Systems_Resume.pdf',
      resumeFileSize: '172 KB',
      githubUrl: 'https://github.com/marcusvance',
      githubReposCount: 16,
      githubSkills: 'Rust / C / Linux Kernel',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T12:15:00Z',
    updatedAt: '2025-09-20T14:02:00Z',
  },
  {
    id: 'app-008',
    candidateName: 'Alex Chen',
    candidateAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    school: 'Stanford University',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.85,
    track: 'new-grad',
    matchScore: 93,
    sentimentStatus: 'fast-track',
    priority: true,
    specialization: 'Payments Infra & High Concurrency',
    notes: 'Ex-intern on Stripe ledger team. Deep familiarity with sub-millisecond transactional reconciliation pipelines.',
    roleSeeking: 'Backend Engineer - Core Payments',
    evaluated: true,
    assets: {
      resumeFileName: 'Alex_Chen_Resume_2025.pdf',
      resumeFileSize: '160 KB',
      githubUrl: 'https://github.com/alexchen-dev',
      githubReposCount: 31,
      githubSkills: 'Go / Java / Kafka',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: '1st-round-scheduled',
    atsSynced: false,
    createdAt: '2025-09-20T12:30:00Z',
    updatedAt: '2025-09-20T14:40:00Z',
  },
  {
    id: 'app-009',
    candidateName: 'Liam Nguyen',
    candidateAvatar:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    school: 'UT Austin',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.82,
    track: 'intern',
    matchScore: 85,
    sentimentStatus: 'tech-screen',
    priority: false,
    specialization: 'Systems & Networking',
    notes: 'Strong networking fundamentals, packet inspection, eBPF telemetry hooks experiment.',
    roleSeeking: 'Systems & Networking Intern',
    evaluated: true,
    assets: {
      resumeFileName: 'Liam_Nguyen_UT_Resume.pdf',
      resumeFileSize: '148 KB',
      githubUrl: 'https://github.com/liamnguyen-cs',
      githubReposCount: 14,
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'take-home-sent',
    atsSynced: false,
    createdAt: '2025-09-20T12:45:00Z',
    updatedAt: '2025-09-20T13:30:00Z',
  },
  {
    id: 'app-010',
    candidateName: 'Priya Sharma',
    candidateAvatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    school: 'Cornell University',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.89,
    track: 'new-grad',
    matchScore: 87,
    sentimentStatus: 'culture-fit',
    priority: false,
    specialization: 'API Platforms & Microservices',
    notes: 'Well-rounded engineer with API gateway redesign experience at fintech startup.',
    roleSeeking: 'Backend Software Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Priya_Sharma_Cornell_CV.pdf',
      resumeFileSize: '180 KB',
      githubUrl: 'https://github.com/priyasharma-code',
      githubReposCount: 20,
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T13:00:00Z',
    updatedAt: '2025-09-20T14:15:00Z',
  },
  {
    id: 'app-011',
    candidateName: 'Kevin Zhang',
    candidateAvatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    school: 'Princeton University',
    degree: 'B.S.E. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.91,
    track: 'new-grad',
    matchScore: 90,
    sentimentStatus: 'fast-track',
    priority: true,
    specialization: 'Distributed Caches & Concurrency',
    notes: 'Implemented Lock-free skip list and custom memory allocator in C++20. Impressive benchmarks.',
    roleSeeking: 'Core Infrastructure Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Kevin_Zhang_Princeton_SWE.pdf',
      resumeFileSize: '165 KB',
      githubUrl: 'https://github.com/kevinzhang-princeton',
      githubReposCount: 25,
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: '1st-round-scheduled',
    atsSynced: false,
    createdAt: '2025-09-20T13:10:00Z',
    updatedAt: '2025-09-20T14:20:00Z',
  },
  {
    id: 'app-012',
    candidateName: 'Rachel Kim',
    candidateAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    school: 'Caltech',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.93,
    track: 'intern',
    matchScore: 89,
    sentimentStatus: 'fast-track',
    priority: true,
    specialization: 'High-Performance Computing & GPU',
    notes: 'CUDA kernels for sparse matrix operations. Top student in Caltech parallel computing course.',
    roleSeeking: 'Compute Performance Intern',
    evaluated: true,
    assets: {
      resumeFileName: 'Rachel_Kim_Caltech.pdf',
      resumeFileSize: '190 KB',
      githubUrl: 'https://github.com/rachelkim-caltech',
      githubReposCount: 18,
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'interview-scheduled',
    atsSynced: false,
    createdAt: '2025-09-20T13:20:00Z',
    updatedAt: '2025-09-20T14:25:00Z',
  },
  {
    id: 'app-013',
    candidateName: 'Brandon Scott',
    candidateAvatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    school: 'UCLA',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.76,
    track: 'new-grad',
    matchScore: 82,
    sentimentStatus: 'tech-screen',
    priority: false,
    specialization: 'Site Reliability Engineering',
    notes: 'Terraform, Prometheus, and automated incident recovery runbooks enthusiast.',
    roleSeeking: 'Site Reliability Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Brandon_Scott_UCLA_SRE.pdf',
      resumeFileSize: '150 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T13:30:00Z',
    updatedAt: '2025-09-20T14:00:00Z',
  },
  {
    id: 'app-014',
    candidateName: 'Jessica Martinez',
    candidateAvatar:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    school: 'Columbia University',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.87,
    track: 'new-grad',
    matchScore: 88,
    sentimentStatus: 'culture-fit',
    priority: false,
    specialization: 'Security & Cryptography',
    notes: 'OAuth2 / WebAuthn protocol implementation and zero-knowledge proof interest.',
    roleSeeking: 'Product Security Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Jessica_Martinez_Columbia_Sec.pdf',
      resumeFileSize: '175 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T13:40:00Z',
    updatedAt: '2025-09-20T14:10:00Z',
  },
  {
    id: 'app-015',
    candidateName: 'Samuel O’Connor',
    candidateAvatar:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    school: 'Brown University',
    degree: 'Sc.B. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.78,
    track: 'new-grad',
    matchScore: 81,
    sentimentStatus: 'tech-screen',
    priority: false,
    specialization: 'Backend Web Platforms',
    notes: 'Node.js, Express, and PostgreSQL indexing experience.',
    roleSeeking: 'Backend Software Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Samuel_OConnor_Brown.pdf',
      resumeFileSize: '145 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T13:50:00Z',
    updatedAt: '2025-09-20T14:05:00Z',
  },
  {
    id: 'app-016',
    candidateName: 'Chloe Dupuis',
    candidateAvatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    school: 'McGill University',
    degree: 'B.S. Software Eng',
    major: 'Software Engineering',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.85,
    track: 'intern',
    matchScore: 83,
    sentimentStatus: 'culture-fit',
    priority: false,
    specialization: 'Mobile & Frontend UI',
    notes: 'React Native & iOS Swift developer, winner of McGill Hackathon 2024.',
    roleSeeking: 'Mobile Engineering Intern',
    evaluated: true,
    assets: {
      resumeFileName: 'Chloe_Dupuis_McGill.pdf',
      resumeFileSize: '162 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T14:00:00Z',
    updatedAt: '2025-09-20T14:30:00Z',
  },
  {
    id: 'app-017',
    candidateName: 'Daniel Tanaka',
    candidateAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    school: 'UIUC',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.89,
    track: 'new-grad',
    matchScore: 93,
    sentimentStatus: 'fast-track',
    priority: true,
    specialization: 'Distributed Consensus & Raft',
    notes: 'Wrote formal verification for Raft membership changes using TLA+.',
    roleSeeking: 'Distributed Systems Infrastructure Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Daniel_Tanaka_UIUC_Raft.pdf',
      resumeFileSize: '185 KB',
      githubUrl: 'https://github.com/danieltanaka-uiuc',
      githubReposCount: 26,
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: '1st-round-scheduled',
    atsSynced: false,
    createdAt: '2025-09-20T14:10:00Z',
    updatedAt: '2025-09-20T14:35:00Z',
  },
  {
    id: 'app-018',
    candidateName: 'Aisha Al-Mansoor',
    candidateAvatar:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
    school: 'Northwestern University',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.81,
    track: 'new-grad',
    matchScore: 84,
    sentimentStatus: 'infra-team',
    priority: false,
    specialization: 'Streaming Pipelines & Kafka',
    notes: 'Stream processing with Apache Flink and Kafka partitions optimization.',
    roleSeeking: 'Data Platform Engineer',
    evaluated: true,
    assets: {
      resumeFileName: 'Aisha_AlMansoor_DataEng.pdf',
      resumeFileSize: '170 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T14:15:00Z',
    updatedAt: '2025-09-20T14:28:00Z',
  },
  {
    id: 'app-019',
    candidateName: 'Tyler Brooks',
    candidateAvatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    school: 'Purdue University',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.77,
    track: 'intern',
    matchScore: 80,
    sentimentStatus: 'tech-screen',
    priority: false,
    specialization: 'Linux Systems & C',
    notes: 'Operating systems TA, solid understanding of virtual memory and file systems.',
    roleSeeking: 'Systems Engineering Intern',
    evaluated: true,
    assets: {
      resumeFileName: 'Tyler_Brooks_Purdue.pdf',
      resumeFileSize: '155 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T14:20:00Z',
    updatedAt: '2025-09-20T14:32:00Z',
  },
  // 9 Unevaluated leads to make total: 28 leads (19 evaluated, 8 priority, 19 New Grad, 9 Intern)
  {
    id: 'app-020',
    candidateName: 'Zoe Washington',
    candidateAvatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    school: 'Yale University',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.86,
    track: 'new-grad',
    matchScore: 85,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'Full-Stack Web',
    notes: 'Scanned at 2:40 PM. Awaiting initial recruiter review.',
    roleSeeking: 'Full-Stack Software Engineer',
    evaluated: false,
    assets: {
      resumeFileName: 'Zoe_Washington_Yale.pdf',
      resumeFileSize: '160 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T14:40:00Z',
    updatedAt: '2025-09-20T14:40:00Z',
  },
  {
    id: 'app-021',
    candidateName: 'Ethan Wright',
    candidateAvatar:
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    school: 'Dartmouth College',
    degree: 'A.B. CS',
    major: 'Computer Science',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.82,
    track: 'intern',
    matchScore: 81,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'Security & Networks',
    notes: 'Interested in penetration testing and secure software development lifecycle.',
    roleSeeking: 'Security Engineering Intern',
    evaluated: false,
    assets: {
      resumeFileName: 'Ethan_Wright_Dartmouth.pdf',
      resumeFileSize: '140 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T14:45:00Z',
    updatedAt: '2025-09-20T14:45:00Z',
  },
  {
    id: 'app-022',
    candidateName: 'Maya Thorne',
    candidateAvatar:
      'https://images.unsplash.com/photo-1534751516642-a171ed2c3f88?w=150&auto=format&fit=crop&q=80',
    school: 'Stanford University',
    degree: 'B.S. Symbolic Systems',
    major: 'Symbolic Systems',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.88,
    track: 'intern',
    matchScore: 87,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'HCI & Frontend Architecture',
    notes: 'Focus on accessible interfaces and cognitive ergonomics.',
    roleSeeking: 'Frontend Engineering Intern',
    evaluated: false,
    assets: {
      resumeFileName: 'Maya_Thorne_SymSys.pdf',
      resumeFileSize: '152 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T14:50:00Z',
    updatedAt: '2025-09-20T14:50:00Z',
  },
  {
    id: 'app-023',
    candidateName: 'Lucas Oliveira',
    candidateAvatar:
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&auto=format&fit=crop&q=80',
    school: 'NYU Courant',
    degree: 'B.S. CS & Math',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.79,
    track: 'new-grad',
    matchScore: 83,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'Data Pipelines & Python',
    notes: 'ETL pipelines and pandas performance tuning.',
    roleSeeking: 'Software Engineer - Data',
    evaluated: false,
    assets: {
      resumeFileName: 'Lucas_Oliveira_NYU.pdf',
      resumeFileSize: '158 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T14:55:00Z',
    updatedAt: '2025-09-20T14:55:00Z',
  },
  {
    id: 'app-024',
    candidateName: 'Mei-Ling Ho',
    candidateAvatar:
      'https://images.unsplash.com/photo-1521566652176-6c038358299d?w=150&auto=format&fit=crop&q=80',
    school: 'UC San Diego',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.84,
    track: 'intern',
    matchScore: 84,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'Distributed Storage',
    notes: 'Undergraduate researcher in non-volatile memory lab.',
    roleSeeking: 'Storage Systems Intern',
    evaluated: false,
    assets: {
      resumeFileName: 'MeiLing_Ho_UCSD.pdf',
      resumeFileSize: '164 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T15:00:00Z',
    updatedAt: '2025-09-20T15:00:00Z',
  },
  {
    id: 'app-025',
    candidateName: 'Gabriel Santos',
    candidateAvatar:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&auto=format&fit=crop&q=80',
    school: 'Waterloo',
    degree: 'B.C.S.',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Fall '25",
    gpa: 3.87,
    track: 'new-grad',
    matchScore: 88,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'Distributed Query Engines',
    notes: 'Multiple previous co-op terms at Canadian tech startups.',
    roleSeeking: 'Backend Software Engineer',
    evaluated: false,
    assets: {
      resumeFileName: 'Gabriel_Santos_Waterloo.pdf',
      resumeFileSize: '170 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T15:05:00Z',
    updatedAt: '2025-09-20T15:05:00Z',
  },
  {
    id: 'app-026',
    candidateName: 'Ananya Gupta',
    candidateAvatar:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    school: 'Duke University',
    degree: 'B.S. CS & ECE',
    major: 'Computer Science',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.89,
    track: 'intern',
    matchScore: 86,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'Embedded Systems & IoT',
    notes: 'Firmware development in Rust and C on ARM Cortex-M.',
    roleSeeking: 'Embedded Software Intern',
    evaluated: false,
    assets: {
      resumeFileName: 'Ananya_Gupta_Duke.pdf',
      resumeFileSize: '148 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T15:10:00Z',
    updatedAt: '2025-09-20T15:10:00Z',
  },
  {
    id: 'app-027',
    candidateName: 'Ryan Park',
    candidateAvatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    school: 'Johns Hopkins',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '25',
    gradTerm: "Spring '25",
    gpa: 3.82,
    track: 'new-grad',
    matchScore: 82,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'Distributed Cache & Infra',
    notes: 'Memcached protocol testing and benchmark suite author.',
    roleSeeking: 'Infrastructure Engineer',
    evaluated: false,
    assets: {
      resumeFileName: 'Ryan_Park_JHU.pdf',
      resumeFileSize: '154 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T15:15:00Z',
    updatedAt: '2025-09-20T15:15:00Z',
  },
  {
    id: 'app-028',
    candidateName: 'Olivia Taylor',
    candidateAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    school: 'Penn State',
    degree: 'B.S. CS',
    major: 'Computer Science',
    gradYear: '26',
    gradTerm: "Spring '26",
    gpa: 3.75,
    track: 'intern',
    matchScore: 79,
    sentimentStatus: 'pending',
    priority: false,
    specialization: 'Cloud DevOps',
    notes: 'CI/CD pipeline optimization and Docker container security.',
    roleSeeking: 'DevOps / Cloud Intern',
    evaluated: false,
    assets: {
      resumeFileName: 'Olivia_Taylor_PennState.pdf',
      resumeFileSize: '142 KB',
    },
    boothNumber: 'Booth B-14',
    recruiterName: 'Sarah Jenkins',
    interviewStatus: 'none',
    atsSynced: false,
    createdAt: '2025-09-20T15:20:00Z',
    updatedAt: '2025-09-20T15:20:00Z',
  },
];

// Active in-memory store
class ApplicationStore {
  private applications: ApplicationRecord[] = [...initialApplications];

  public calculateStats(): ApplicationStats {
    const total = this.applications.length;
    const priority = this.applications.filter((a) => a.priority).length;
    const newGrad = this.applications.filter((a) => a.track === 'new-grad').length;
    const intern = this.applications.filter((a) => a.track === 'intern').length;
    const evaluated = this.applications.filter((a) => a.evaluated).length;
    const fastTrack = this.applications.filter(
      (a) => a.sentimentStatus === 'fast-track'
    ).length;
    const atsSynced = this.applications.filter((a) => a.atsSynced).length;

    return {
      total,
      priority,
      newGrad,
      intern,
      evaluated,
      fastTrack,
      atsSynced,
    };
  }

  public getAll(filters: {
    status?: StatusFilter | string;
    search?: string;
    sort?: SortOption | string;
  }): { items: ApplicationRecord[]; stats: ApplicationStats } {
    let list = [...this.applications];

    // Status filter
    if (filters.status && filters.status !== 'all') {
      const s = filters.status.toLowerCase();
      if (s === 'priority') {
        list = list.filter((a) => a.priority);
      } else if (s === 'new-grad' || s === 'new_grad') {
        list = list.filter((a) => a.track === 'new-grad');
      } else if (s === 'intern') {
        list = list.filter((a) => a.track === 'intern');
      } else if (s === 'fast-track' || s === 'fast_track') {
        list = list.filter((a) => a.sentimentStatus === 'fast-track');
      } else if (s === 'tech-screen' || s === 'tech_screen') {
        list = list.filter((a) => a.sentimentStatus === 'tech-screen');
      } else if (s === 'evaluated') {
        list = list.filter((a) => a.evaluated);
      }
    }

    // Search query
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      list = list.filter((a) => {
        return (
          a.candidateName.toLowerCase().includes(q) ||
          a.school.toLowerCase().includes(q) ||
          a.specialization.toLowerCase().includes(q) ||
          a.roleSeeking.toLowerCase().includes(q) ||
          a.notes.toLowerCase().includes(q) ||
          a.sentimentStatus.toLowerCase().includes(q)
        );
      });
    }

    // Sorting
    const sort = filters.sort || 'match-desc';
    if (sort === 'match-desc') {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sort === 'match-asc') {
      list.sort((a, b) => a.matchScore - b.matchScore);
    } else if (sort === 'gpa-desc') {
      list.sort((a, b) => b.gpa - a.gpa);
    } else if (sort === 'name-asc') {
      list.sort((a, b) => a.candidateName.localeCompare(b.candidateName));
    } else if (sort === 'recent') {
      list.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }

    return {
      items: list,
      stats: this.calculateStats(),
    };
  }

  public getById(id: string): ApplicationRecord | undefined {
    return this.applications.find((a) => a.id === id);
  }

  public create(dto: CreateApplicationDTO): ApplicationRecord {
    const newId = `app-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .substring(2, 6)}`;
    const now = new Date().toISOString();

    const record: ApplicationRecord = {
      id: newId,
      candidateName: dto.candidateName.trim(),
      candidateAvatar:
        dto.candidateAvatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      school: dto.school.trim(),
      degree: dto.degree || 'B.S. CS',
      major: dto.major || 'Computer Science',
      gradYear: dto.gradYear || '25',
      gradTerm: dto.gradTerm || "Fall '25",
      gpa: typeof dto.gpa === 'number' ? dto.gpa : 3.85,
      track: dto.track || 'new-grad',
      matchScore:
        typeof dto.matchScore === 'number'
          ? dto.matchScore
          : Math.floor(Math.random() * 15) + 84,
      sentimentStatus: dto.sentimentStatus || 'fast-track',
      priority:
        dto.priority !== undefined
          ? dto.priority
          : dto.sentimentStatus === 'fast-track',
      specialization: dto.specialization || 'Software Engineering',
      notes: dto.notes || 'Lead scanned from Fall Tech Fair.',
      roleSeeking:
        dto.roleSeeking || 'Frontend Engineer / Full-Stack New Grad',
      evaluated: true,
      assets: {
        resumeFileName: `${dto.candidateName.replace(/\s+/g, '_')}_Resume.pdf`,
        resumeFileSize: '168 KB',
      },
      boothNumber: dto.boothNumber || 'Booth B-14',
      recruiterName: dto.recruiterName || 'Sarah Jenkins',
      interviewStatus: dto.interviewStatus || 'none',
      atsSynced: false,
      createdAt: now,
      updatedAt: now,
    };

    // Add to top of list
    this.applications.unshift(record);
    return record;
  }

  public update(
    id: string,
    dto: UpdateApplicationDTO
  ): ApplicationRecord | null {
    const index = this.applications.findIndex((a) => a.id === id);
    if (index === -1) {
      return null;
    }

    const current = this.applications[index];
    const updated: ApplicationRecord = {
      ...current,
      ...dto,
      // If sentiment is fast-track, auto-set priority true if not specified
      priority:
        dto.priority !== undefined
          ? dto.priority
          : dto.sentimentStatus === 'fast-track'
          ? true
          : current.priority,
      evaluated:
        dto.evaluated !== undefined ? dto.evaluated : current.evaluated,
      updatedAt: new Date().toISOString(),
    };

    this.applications[index] = updated;
    return updated;
  }

  public bulkSyncAts(candidateIds?: string[]): {
    syncedCount: number;
    totalSynced: number;
  } {
    let count = 0;
    this.applications = this.applications.map((app) => {
      if (!candidateIds || candidateIds.includes(app.id)) {
        if (!app.atsSynced) count++;
        return { ...app, atsSynced: true, updatedAt: new Date().toISOString() };
      }
      return app;
    });

    const totalSynced = this.applications.filter((a) => a.atsSynced).length;
    return { syncedCount: count, totalSynced };
  }

  public reset(): void {
    this.applications = [...initialApplications];
  }
}

export const applicationStore = new ApplicationStore();
