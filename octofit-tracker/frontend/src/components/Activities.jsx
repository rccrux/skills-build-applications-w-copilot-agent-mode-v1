import { useEffect, useMemo, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

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

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = useMemo(() => `${apiBaseUrl}/activities/`, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
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
          setError(err.message || 'Failed to fetch activities.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadActivities();

    return () => controller.abort();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h3 mb-3">Activities</h2>
      {loading && <p className="text-body-secondary">Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <p className="text-body-secondary">No activities found.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Team</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id ?? `${activity.user?._id}-${activity.performedAt}`}>
                  <td>{activity.user?.name ?? 'Unknown'}</td>
                  <td>{activity.team?.name ?? 'Unknown'}</td>
                  <td className="text-capitalize">{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>
                    {activity.performedAt
                      ? new Date(activity.performedAt).toLocaleDateString()
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
