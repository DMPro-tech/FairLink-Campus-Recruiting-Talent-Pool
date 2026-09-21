import { Router, Request, Response } from 'express';
import { applicationStore } from './models.js';
import { CreateApplicationDTO, UpdateApplicationDTO } from '../src/types.js';

const router = Router();

/**
 * GET /api/applications
 * Query Parameters:
 *  - status: 'all' | 'priority' | 'new-grad' | 'intern' | 'fast-track' | 'tech-screen' | 'evaluated'
 *  - search: string (candidate name, university, skills, notes, or specialization)
 *  - sort: 'match-desc' | 'match-asc' | 'gpa-desc' | 'name-asc' | 'recent'
 * Status Code: 200 OK
 */
router.get('/applications', (req: Request, res: Response) => {
  try {
    const { status, search, sort } = req.query;

    const result = applicationStore.getAll({
      status: typeof status === 'string' ? status : 'all',
      search: typeof search === 'string' ? search : '',
      sort: typeof sort === 'string' ? sort : 'match-desc',
    });

    return res.status(200).json({
      success: true,
      count: result.items.length,
      total: result.stats.total,
      stats: result.stats,
      data: result.items,
    });
  } catch (err: any) {
    console.error('Error fetching applications:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error while retrieving applications',
    });
  }
});

/**
 * GET /api/applications/:id
 * Retrieve a single candidate record by ID
 * Status Codes: 200 OK | 404 Not Found | 500 Internal Server Error
 */
router.get('/applications/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = applicationStore.getById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: `Application record with ID '${id}' not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (err: any) {
    console.error('Error fetching application by ID:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error while retrieving application details',
    });
  }
});

/**
 * POST /api/applications
 * Create a new application record (e.g., from booth QR scanner or manual entry)
 * Status Codes: 201 Created | 400 Bad Request | 500 Internal Server Error
 */
router.post('/applications', (req: Request, res: Response) => {
  try {
    const body: CreateApplicationDTO = req.body;

    // Payload validation
    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Bad Request: JSON request payload body is required.',
      });
    }

    if (!body.candidateName || body.candidateName.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: candidateName is required.',
      });
    }

    if (!body.school || body.school.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: school is required.',
      });
    }

    if (body.gpa !== undefined) {
      const numGpa = Number(body.gpa);
      if (isNaN(numGpa) || numGpa < 0 || numGpa > 4.0) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error: gpa must be a number between 0.00 and 4.00.',
        });
      }
    }

    const created = applicationStore.create(body);

    return res.status(201).json({
      success: true,
      message: 'Application lead created and added to talent pool successfully.',
      data: created,
    });
  } catch (err: any) {
    console.error('Error creating application record:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error while creating application record',
    });
  }
});

/**
 * PUT /api/applications/:id
 * Update an existing candidate record (sentiment tags, notes, interview status, priority)
 * Status Codes: 200 OK | 400 Bad Request | 404 Not Found | 500 Internal Server Error
 */
router.put('/applications/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: UpdateApplicationDTO = req.body;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Bad Request: JSON request payload body is required.',
      });
    }

    // Check if record exists
    const existing = applicationStore.getById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: `Cannot update: Application record with ID '${id}' was not found.`,
      });
    }

    // Validation for updates
    if (body.gpa !== undefined) {
      const numGpa = Number(body.gpa);
      if (isNaN(numGpa) || numGpa < 0 || numGpa > 4.0) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error: gpa must be between 0.00 and 4.00.',
        });
      }
    }

    if (body.sentimentStatus !== undefined) {
      const validStatuses = [
        'fast-track',
        'tech-screen',
        'culture-fit',
        'infra-team',
        'archived',
        'pending',
      ];
      if (!validStatuses.includes(body.sentimentStatus)) {
        return res.status(400).json({
          success: false,
          error: `Validation Error: Invalid sentimentStatus '${body.sentimentStatus}'. Allowed: ${validStatuses.join(
            ', '
          )}`,
        });
      }
    }

    const updated = applicationStore.update(id, body);

    return res.status(200).json({
      success: true,
      message: `Application record '${id}' updated successfully.`,
      data: updated,
    });
  } catch (err: any) {
    console.error('Error updating application record:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error while updating application record',
    });
  }
});

/**
 * POST /api/applications/export-ats
 * Simulate syncing candidate pool to Greenhouse / Lever ATS
 * Status Code: 200 OK
 */
router.post('/applications/export-ats', (req: Request, res: Response) => {
  try {
    const { candidateIds } = req.body || {};
    const result = applicationStore.bulkSyncAts(
      Array.isArray(candidateIds) ? candidateIds : undefined
    );

    return res.status(200).json({
      success: true,
      message: `Successfully synchronized candidate leads to Greenhouse & Lever ATS.`,
      syncedCount: result.syncedCount,
      totalSynced: result.totalSynced,
      provider: 'Greenhouse & Lever Enterprise Webhook',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error syncing to ATS:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error during ATS synchronization',
    });
  }
});

/**
 * POST /api/applications/reset
 * Reset talent pool back to initial state (28 leads)
 * Status Code: 200 OK
 */
router.post('/applications/reset', (_req: Request, res: Response) => {
  applicationStore.reset();
  const result = applicationStore.getAll({ status: 'all' });
  return res.status(200).json({
    success: true,
    message: 'Talent pool reset to default 28 records.',
    data: result.items,
    stats: result.stats,
  });
});

export default router;
