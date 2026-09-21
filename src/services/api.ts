import {
  ApplicationRecord,
  ApiResponse,
  CreateApplicationDTO,
  UpdateApplicationDTO,
  StatusFilter,
  SortOption,
  HttpLogEntry,
} from '../types.js';

type LogListener = (logs: HttpLogEntry[]) => void;
const logListeners: Set<LogListener> = new Set();
let httpLogs: HttpLogEntry[] = [];

export function subscribeHttpLogs(listener: LogListener): () => void {
  logListeners.add(listener);
  listener([...httpLogs]);
  return () => {
    logListeners.delete(listener);
  };
}

function recordHttpLog(entry: Omit<HttpLogEntry, 'id'>) {
  const newLog: HttpLogEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ...entry,
  };
  httpLogs = [newLog, ...httpLogs].slice(0, 50); // keep latest 50
  logListeners.forEach((fn) => fn([...httpLogs]));
}

export function clearHttpLogs() {
  httpLogs = [];
  logListeners.forEach((fn) => fn([]));
}

/**
 * GET /api/applications
 * Retrieves candidate applications with optional status filter, search query, and sort order.
 */
export async function fetchApplications(params: {
  status?: StatusFilter | string;
  search?: string;
  sort?: SortOption | string;
}): Promise<ApiResponse<ApplicationRecord[]>> {
  const startTime = Date.now();
  const query = new URLSearchParams();
  if (params.status && params.status !== 'all') {
    query.set('status', params.status);
  }
  if (params.search && params.search.trim()) {
    query.set('search', params.search.trim());
  }
  if (params.sort) {
    query.set('sort', params.sort);
  }

  const queryString = query.toString();
  const endpoint = `/api/applications${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const durationMs = Date.now() - startTime;
    const data: ApiResponse<ApplicationRecord[]> = await response.json();

    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'GET',
      endpoint,
      statusCode: response.status,
      statusText: response.statusText || (response.status === 200 ? 'OK' : 'Error'),
      requestPayload: null,
      responsePayload: data,
      durationMs,
    });

    if (!response.ok) {
      throw new Error(data.error || `HTTP error ${response.status}`);
    }

    return data;
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'GET',
      endpoint,
      statusCode: 500,
      statusText: 'Network / Client Error',
      requestPayload: null,
      responsePayload: { error: error.message },
      durationMs,
    });
    throw error;
  }
}

/**
 * GET /api/applications/:id
 * Retrieves a single application record by ID.
 */
export async function fetchApplicationById(
  id: string
): Promise<ApiResponse<ApplicationRecord>> {
  const startTime = Date.now();
  const endpoint = `/api/applications/${id}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const durationMs = Date.now() - startTime;
    const data: ApiResponse<ApplicationRecord> = await response.json();

    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'GET',
      endpoint,
      statusCode: response.status,
      statusText: response.statusText || (response.status === 200 ? 'OK' : 'Not Found'),
      requestPayload: null,
      responsePayload: data,
      durationMs,
    });

    if (!response.ok) {
      throw new Error(data.error || `HTTP error ${response.status}`);
    }

    return data;
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'GET',
      endpoint,
      statusCode: 500,
      statusText: 'Network / Client Error',
      requestPayload: null,
      responsePayload: { error: error.message },
      durationMs,
    });
    throw error;
  }
}

/**
 * POST /api/applications
 * Creates a new application record (e.g. booth scan or candidate capture).
 * Responds with HTTP 201 Created on success.
 */
export async function createApplication(
  dto: CreateApplicationDTO
): Promise<ApiResponse<ApplicationRecord>> {
  const startTime = Date.now();
  const endpoint = '/api/applications';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dto),
    });

    const durationMs = Date.now() - startTime;
    const data: ApiResponse<ApplicationRecord> = await response.json();

    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'POST',
      endpoint,
      statusCode: response.status,
      statusText: response.statusText || (response.status === 201 ? 'Created' : 'Bad Request'),
      requestPayload: dto,
      responsePayload: data,
      durationMs,
    });

    if (!response.ok) {
      throw new Error(data.error || `HTTP error ${response.status}`);
    }

    return data;
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'POST',
      endpoint,
      statusCode: 500,
      statusText: 'Network / Client Error',
      requestPayload: dto,
      responsePayload: { error: error.message },
      durationMs,
    });
    throw error;
  }
}

/**
 * PUT /api/applications/:id
 * Updates an existing application record (e.g. sentiment tag, interview schedule, notes).
 * Responds with HTTP 200 OK on success.
 */
export async function updateApplication(
  id: string,
  dto: UpdateApplicationDTO
): Promise<ApiResponse<ApplicationRecord>> {
  const startTime = Date.now();
  const endpoint = `/api/applications/${id}`;

  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dto),
    });

    const durationMs = Date.now() - startTime;
    const data: ApiResponse<ApplicationRecord> = await response.json();

    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'PUT',
      endpoint,
      statusCode: response.status,
      statusText: response.statusText || (response.status === 200 ? 'OK' : 'Error'),
      requestPayload: dto,
      responsePayload: data,
      durationMs,
    });

    if (!response.ok) {
      throw new Error(data.error || `HTTP error ${response.status}`);
    }

    return data;
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'PUT',
      endpoint,
      statusCode: 500,
      statusText: 'Network / Client Error',
      requestPayload: dto,
      responsePayload: { error: error.message },
      durationMs,
    });
    throw error;
  }
}

/**
 * POST /api/applications/export-ats
 * Synchronizes talent pool to Greenhouse / Lever ATS.
 */
export async function syncToAts(
  candidateIds?: string[]
): Promise<any> {
  const startTime = Date.now();
  const endpoint = '/api/applications/export-ats';
  const body = { candidateIds };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const durationMs = Date.now() - startTime;
    const data = await response.json();

    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'POST',
      endpoint,
      statusCode: response.status,
      statusText: response.statusText || 'OK',
      requestPayload: body,
      responsePayload: data,
      durationMs,
    });

    if (!response.ok) {
      throw new Error(data.error || `HTTP error ${response.status}`);
    }

    return data;
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'POST',
      endpoint,
      statusCode: 500,
      statusText: 'Network / Client Error',
      requestPayload: body,
      responsePayload: { error: error.message },
      durationMs,
    });
    throw error;
  }
}

/**
 * POST /api/applications/reset
 * Resets candidate store back to initial 28 leads.
 */
export async function resetTalentPool(): Promise<ApiResponse<ApplicationRecord[]>> {
  const startTime = Date.now();
  const endpoint = '/api/applications/reset';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    const durationMs = Date.now() - startTime;
    const data: ApiResponse<ApplicationRecord[]> = await response.json();

    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'POST',
      endpoint,
      statusCode: response.status,
      statusText: response.statusText || 'OK',
      requestPayload: null,
      responsePayload: data,
      durationMs,
    });

    return data;
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    recordHttpLog({
      timestamp: new Date().toLocaleTimeString(),
      method: 'POST',
      endpoint,
      statusCode: 500,
      statusText: 'Error',
      requestPayload: null,
      responsePayload: { error: error.message },
      durationMs,
    });
    throw error;
  }
}
