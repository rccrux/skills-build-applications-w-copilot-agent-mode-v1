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

export default function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = useMemo(
    () =>
      codespaceName
        ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
        : 'http://localhost:8000/api/teams/',
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeItems(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch teams.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadTeams();

    return () => controller.abort();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h3 mb-3">Teams</h2>
      {loading && <p className="text-body-secondary">Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <p className="text-body-secondary">No teams found.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="row g-3">
          {items.map((team) => (
            <div className="col-12 col-md-6 col-xl-4" key={team._id ?? team.name}>
              <article className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h5 card-title">{team.name}</h3>
                  <p className="card-text mb-2">{team.city}</p>
                  <p className="card-text fst-italic">"{team.motto}"</p>
                </div>
                <div className="card-footer bg-transparent border-0 pt-0">
                  <small className="text-body-secondary">
                    Members: {team.membersCount ?? 0} | Points: {team.totalPoints ?? 0}
                  </small>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
