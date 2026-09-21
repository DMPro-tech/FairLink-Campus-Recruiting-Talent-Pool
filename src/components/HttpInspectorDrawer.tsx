import React, { useState, useEffect } from 'react';
import {
  X,
  Terminal,
  Clock,
  Trash2,
  Send,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Code,
} from 'lucide-react';
import { HttpLogEntry } from '../types.js';
import {
  subscribeHttpLogs,
  clearHttpLogs,
  fetchApplications,
  createApplication,
  updateApplication,
} from '../services/api.js';

interface HttpInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerRefresh: () => void;
}

export const HttpInspectorDrawer: React.FC<HttpInspectorDrawerProps> = ({
  isOpen,
  onClose,
  onTriggerRefresh,
}) => {
  const [logs, setLogs] = useState<HttpLogEntry[]>([]);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'logs' | 'test-console'>('logs');

  // Test Console state
  const [testMethod, setTestMethod] = useState<'GET' | 'POST' | 'PUT'>('GET');
  const [testScenario, setTestScenario] = useState<string>('get-priority');
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeHttpLogs((updatedLogs) => {
      setLogs(updatedLogs);
      if (updatedLogs.length > 0 && !expandedLogId) {
        setExpandedLogId(updatedLogs[0].id);
      }
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleRunScenario = async (scenario: string) => {
    setIsExecuting(true);
    try {
      if (scenario === 'get-priority') {
        await fetchApplications({ status: 'priority' });
      } else if (scenario === 'get-newgrad') {
        await fetchApplications({ status: 'new-grad' });
      } else if (scenario === 'post-lead') {
        await createApplication({
          candidateName: 'Carlos Ramirez',
          school: 'Stanford University',
          roleSeeking: 'Full-Stack New Grad',
          gpa: 3.91,
          sentimentStatus: 'fast-track',
          specialization: 'Distributed Systems',
          notes: 'Tested via API Inspector Console',
        });
        onTriggerRefresh();
      } else if (scenario === 'put-status') {
        await updateApplication('app-001', {
          interviewStatus: 'interview-scheduled',
          notes: 'Interview scheduled via API console',
        });
        onTriggerRefresh();
      } else if (scenario === 'test-404') {
        // Trigger a 404 to prove status code handling
        await fetch('/api/applications/non-existent-id-999', {
          method: 'GET',
        });
        await fetchApplications({ status: 'all' });
      } else if (scenario === 'test-400') {
        // Trigger a 400 Bad Request to prove validation handling
        await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidateName: '' }),
        });
        await fetchApplications({ status: 'all' });
      }
    } catch (err) {
      console.log('Test scenario completed with error as expected:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-[#dae2fd] text-[#131b2e] border-[#c7c4d8]';
      case 'POST':
        return 'bg-[#6ffbbe] text-[#002113] border-[#006e4b]';
      case 'PUT':
        return 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]';
      default:
        return 'bg-[#eaedff] text-[#464555]';
    }
  };

  const getStatusBadge = (code: number) => {
    if (code >= 200 && code < 300) {
      return 'bg-[#006e4b] text-white';
    }
    if (code >= 400 && code < 500) {
      return 'bg-[#ba1a1a] text-white';
    }
    return 'bg-[#777587] text-white';
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-[#eaedff]">
        {/* Header */}
        <div className="p-4 bg-[#eaedff] border-b border-[#dae2fd] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#3525cd]" />
            <div>
              <h2 className="font-bold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans']">
                Express API Flow &amp; HTTP Inspector
              </h2>
              <p className="text-[11px] text-[#5b598c]">
                Live request log, status codes &amp; JSON payloads
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#dae2fd] text-[#464555] hover:bg-[#c7c4d8] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center border-b border-[#eaedff] bg-[#faf8ff] px-4 pt-2">
          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'logs'
                ? 'border-[#3525cd] text-[#3525cd]'
                : 'border-transparent text-[#777587] hover:text-[#131b2e]'
            }`}
          >
            Live Logs ({logs.length})
          </button>
          <button
            onClick={() => setActiveTab('test-console')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'test-console'
                ? 'border-[#3525cd] text-[#3525cd]'
                : 'border-transparent text-[#777587] hover:text-[#131b2e]'
            }`}
          >
            HTTP Test Console
          </button>
          <div className="ml-auto pb-2">
            <button
              onClick={clearHttpLogs}
              className="text-[11px] text-[#777587] hover:text-[#ba1a1a] flex items-center gap-1 font-medium"
              title="Clear log history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf8ff]">
          {activeTab === 'logs' ? (
            logs.length === 0 ? (
              <div className="text-center py-12 text-[#777587] space-y-2">
                <Code className="w-8 h-8 mx-auto text-[#c7c4d8]" />
                <p className="text-xs">No HTTP requests captured yet.</p>
                <p className="text-[11px] text-[#5b598c]">
                  Click a filter tab, schedule an interview, or scan a lead to see
                  the API flow!
                </p>
              </div>
            ) : (
              logs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                return (
                  <div
                    key={log.id}
                    className="bg-white rounded-xl border border-[#eaedff] shadow-xs overflow-hidden text-xs"
                  >
                    {/* Log Row Header */}
                    <button
                      onClick={() =>
                        setExpandedLogId(isExpanded ? null : log.id)
                      }
                      className="w-full p-3 flex items-center justify-between gap-2 text-left hover:bg-[#f2f3ff] transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${getMethodBadge(
                            log.method
                          )}`}
                        >
                          {log.method}
                        </span>
                        <span className="font-mono text-[#131b2e] truncate text-xs font-medium">
                          {log.endpoint}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${getStatusBadge(
                            log.statusCode
                          )}`}
                        >
                          {log.statusCode} {log.statusText}
                        </span>
                        <span className="text-[10px] text-[#777587] flex items-center gap-0.5 font-mono">
                          <Clock className="w-3 h-3" />
                          {log.durationMs}ms
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-[#777587]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#777587]" />
                        )}
                      </div>
                    </button>

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] space-y-2 font-mono text-[11px]">
                        <div className="text-[10px] text-[#5b598c] flex items-center justify-between">
                          <span>Timestamp: {log.timestamp}</span>
                          <span>Duration: {log.durationMs}ms</span>
                        </div>

                        {/* Request Payload */}
                        {log.requestPayload && (
                          <div>
                            <span className="font-bold text-[#131b2e] block mb-1">
                              Request Payload (JSON):
                            </span>
                            <pre className="p-2 rounded bg-white text-[#131b2e] border border-[#dae2fd] overflow-x-auto text-[10px] leading-tight">
                              {JSON.stringify(log.requestPayload, null, 2)}
                            </pre>
                          </div>
                        )}

                        {/* Response Payload */}
                        <div>
                          <span className="font-bold text-[#131b2e] block mb-1">
                            Response Payload ({log.statusCode}):
                          </span>
                          <pre className="p-2 rounded bg-white text-[#131b2e] border border-[#dae2fd] overflow-x-auto text-[10px] leading-tight max-h-48">
                            {JSON.stringify(log.responsePayload, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )
          ) : (
            /* Test Console Tab */
            <div className="space-y-4">
              <div className="p-3.5 bg-white rounded-xl border border-[#eaedff] space-y-3">
                <h3 className="font-bold text-xs text-[#131b2e] font-['Plus_Jakarta_Sans']">
                  Pre-configured HTTP Scenarios
                </h3>
                <p className="text-xs text-[#5b598c]">
                  Execute real requests to test status codes, payload handling, and
                  validation flows:
                </p>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleRunScenario('get-priority')}
                    disabled={isExecuting}
                    className="p-2.5 rounded-lg border border-[#dae2fd] bg-[#f2f3ff] hover:bg-[#e2e7ff] text-left text-xs transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#3525cd] flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 bg-[#3525cd] text-white rounded text-[10px] font-mono">
                          GET
                        </span>
                        <span>/api/applications?status=priority</span>
                      </div>
                      <p className="text-[11px] text-[#464555] mt-0.5">
                        Status filter query returning 200 OK with filtered leads.
                      </p>
                    </div>
                    <Send className="w-4 h-4 text-[#3525cd]" />
                  </button>

                  <button
                    onClick={() => handleRunScenario('post-lead')}
                    disabled={isExecuting}
                    className="p-2.5 rounded-lg border border-[#dae2fd] bg-[#f2f3ff] hover:bg-[#e2e7ff] text-left text-xs transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#006e4b] flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 bg-[#006e4b] text-white rounded text-[10px] font-mono">
                          POST
                        </span>
                        <span>/api/applications</span>
                      </div>
                      <p className="text-[11px] text-[#464555] mt-0.5">
                        Creates a new candidate record, returning 201 Created.
                      </p>
                    </div>
                    <Send className="w-4 h-4 text-[#006e4b]" />
                  </button>

                  <button
                    onClick={() => handleRunScenario('put-status')}
                    disabled={isExecuting}
                    className="p-2.5 rounded-lg border border-[#dae2fd] bg-[#f2f3ff] hover:bg-[#e2e7ff] text-left text-xs transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#ba1a1a] flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 bg-[#ba1a1a] text-white rounded text-[10px] font-mono">
                          PUT
                        </span>
                        <span>/api/applications/app-001</span>
                      </div>
                      <p className="text-[11px] text-[#464555] mt-0.5">
                        Updates Maya Lin's interview status, returning 200 OK.
                      </p>
                    </div>
                    <Send className="w-4 h-4 text-[#ba1a1a]" />
                  </button>

                  <button
                    onClick={() => handleRunScenario('test-404')}
                    disabled={isExecuting}
                    className="p-2.5 rounded-lg border border-[#dae2fd] bg-[#f2f3ff] hover:bg-[#e2e7ff] text-left text-xs transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#ba1a1a] flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 bg-[#ba1a1a] text-white rounded text-[10px] font-mono">
                          GET
                        </span>
                        <span>/api/applications/non-existent-id</span>
                      </div>
                      <p className="text-[11px] text-[#464555] mt-0.5">
                        Tests error handling, returning 404 Not Found.
                      </p>
                    </div>
                    <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
                  </button>

                  <button
                    onClick={() => handleRunScenario('test-400')}
                    disabled={isExecuting}
                    className="p-2.5 rounded-lg border border-[#dae2fd] bg-[#f2f3ff] hover:bg-[#e2e7ff] text-left text-xs transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#ba1a1a] flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 bg-[#ba1a1a] text-white rounded text-[10px] font-mono">
                          POST
                        </span>
                        <span>/api/applications (missing fields)</span>
                      </div>
                      <p className="text-[11px] text-[#464555] mt-0.5">
                        Tests schema validation, returning 400 Bad Request.
                      </p>
                    </div>
                    <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
