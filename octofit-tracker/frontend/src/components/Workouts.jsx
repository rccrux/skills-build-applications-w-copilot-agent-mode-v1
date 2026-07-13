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

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
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
          setError(err.message || 'Failed to fetch workouts.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();

    return () => controller.abort();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h3 mb-3">Workouts</h2>
      {loading && <p className="text-body-secondary">Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <p className="text-body-secondary">No workouts found.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="row g-3">
          {items.map((workout) => (
            <div className="col-12 col-lg-6" key={workout._id ?? workout.title}>
              <article className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column gap-2">
                  <h3 className="h5 card-title mb-1">{workout.title}</h3>
                  <p className="mb-0 text-capitalize">
                    Level: <strong>{workout.level}</strong>
                  </p>
                  <p className="mb-0">Focus: {workout.focus}</p>
                  <p className="mb-0">Estimated minutes: {workout.estimatedMinutes}</p>
                  <p className="mb-0">
                    Equipment:{' '}
                    {Array.isArray(workout.equipment) && workout.equipment.length > 0
                      ? workout.equipment.join(', ')
                      : 'None'}
                  </p>
                  <p className="mb-0 small text-body-secondary">
                    Created by: {workout.createdBy?.name ?? 'Unknown'}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
