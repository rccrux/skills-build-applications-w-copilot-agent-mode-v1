import { useEffect, useMemo, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && Array.isArray(payload.data.items)) return payload.data.items;
  if (payload.data && Array.isArray(payload.data.results)) return payload.data.results;

  return [];
}

function flattenEntries(items) {
  return items.flatMap((board) => {
    const entries = Array.isArray(board.entries) ? board.entries : [];
    return entries.map((entry) => ({
      id: `${board._id ?? board.generatedAt}-${entry.rank}-${entry.user?._id ?? entry.rank}`,
      scope: board.scope,
      period: board.period,
      generatedAt: board.generatedAt,
      ...entry,
    }));
  });
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = useMemo(
    () =>
      codespaceName
        ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
        : 'http://localhost:8000/api/leaderboard/',
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const boards = normalizeItems(payload);
        setEntries(flattenEntries(boards));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch leaderboard.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();

    return () => controller.abort();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h3 mb-3">Leaderboard</h2>
      {loading && <p className="text-body-secondary">Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <p className="text-body-secondary">No leaderboard entries found.</p>
      )}
      {!loading && !error && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
                <th>Scope</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.rank}</td>
                  <td>{entry.user?.name ?? 'Unknown'}</td>
                  <td>{entry.team?.name ?? 'Unknown'}</td>
                  <td>{entry.points}</td>
                  <td className="text-capitalize">{entry.scope}</td>
                  <td className="text-capitalize">{entry.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
