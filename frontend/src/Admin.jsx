import { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const ADMIN_PASSWORD = '0612';

const CHART_COLORS = ['#f59e0b', '#06b6d4', '#8b5cf6', '#10b981', '#f43f5e', '#6366f1'];

function useChartData(pageViews, events) {
  return useMemo(() => {
    const viewsByDay = {};
    const eventsByDay = {};
    const pathCounts = {};
    const eventTypeCounts = {};
    const uniqueIpsViews = new Set();
    const uniqueIpsEvents = new Set();

    pageViews.forEach((v) => {
      const day = v.timestamp ? v.timestamp.slice(0, 10) : '';
      viewsByDay[day] = (viewsByDay[day] || 0) + 1;
      pathCounts[v.path || '/'] = (pathCounts[v.path || '/'] || 0) + 1;
      if (v.ip && v.ip !== 'unknown') uniqueIpsViews.add(v.ip);
    });

    events.forEach((e) => {
      const day = e.timestamp ? e.timestamp.slice(0, 10) : '';
      eventsByDay[day] = (eventsByDay[day] || 0) + 1;
      const name = e.eventName || 'other';
      eventTypeCounts[name] = (eventTypeCounts[name] || 0) + 1;
      if (e.ip && e.ip !== 'unknown') uniqueIpsEvents.add(e.ip);
    });

    const viewsTimeSeries = Object.entries(viewsByDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, views: count, fullDate: date }));

    const eventsTimeSeries = Object.entries(eventsByDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, events: count, fullDate: date }));

    const topPaths = Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([path, count]) => ({ path: path.length > 20 ? path.slice(0, 20) + '…' : path, count, fullPath: path }));

    const eventTypePie = Object.entries(eventTypeCounts).map(([name, value], i) => ({
      name,
      value,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    }));

    return {
      viewsTimeSeries,
      eventsTimeSeries,
      topPaths,
      eventTypePie,
      uniqueViews: uniqueIpsViews.size,
      uniqueEvents: uniqueIpsEvents.size,
    };
  }, [pageViews, events]);
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pageViews, setPageViews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTables, setShowTables] = useState(false);

  const chartData = useChartData(pageViews, events);

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    fetch(`${API_URL}/admin/analytics`, {
      headers: { Authorization: 'Bearer 0612' },
    })
      .then((res) => {
        if (res.status === 401) {
          sessionStorage.removeItem('adminAuth');
          setAuthenticated(false);
          throw new Error('Session expired');
        }
        return res.json();
      })
      .then((data) => {
        setPageViews(data.pageViews || []);
        setEvents(data.events || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true');
      setAuthenticated(true);
      setPassword('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setAuthenticated(false);
  };

  const refreshData = () => {
    setLoading(true);
    fetch(`${API_URL}/admin/analytics`, {
      headers: { Authorization: 'Bearer 0612' },
    })
      .then((res) => res.json())
      .then((data) => {
        setPageViews(data.pageViews || []);
        setEvents(data.events || []);
      })
      .finally(() => setLoading(false));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-400 text-sm mb-6">TowBotics analytics</p>
          <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter password"
            autoFocus
          />
          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  const conversionRate = pageViews.length > 0
    ? ((events.length / pageViews.length) * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
              <p className="text-slate-400 text-sm mt-0.5">Page views, reserve clicks, and traffic</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={refreshData}
                disabled={loading}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium disabled:opacity-50 transition"
              >
                {loading ? 'Loading…' : 'Refresh'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-5">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Page views</p>
            <p className="text-2xl font-bold mt-1 text-white">{pageViews.length}</p>
            <p className="text-slate-500 text-xs mt-1">Total visits</p>
          </div>
          <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-5">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Reserve clicks</p>
            <p className="text-2xl font-bold mt-1 text-amber-400">{events.length}</p>
            <p className="text-slate-500 text-xs mt-1">Pay / reserve attempts</p>
          </div>
          <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-5">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Unique visitors</p>
            <p className="text-2xl font-bold mt-1 text-cyan-400">{chartData.uniqueViews}</p>
            <p className="text-slate-500 text-xs mt-1">By IP (page views)</p>
          </div>
          <div className="bg-slate-800/80 rounded-xl border border-slate-700/50 p-5">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Conversion</p>
            <p className="text-2xl font-bold mt-1 text-emerald-400">{conversionRate}%</p>
            <p className="text-slate-500 text-xs mt-1">Reserve / views</p>
          </div>
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Page views over time</h2>
            {chartData.viewsTimeSeries.length === 0 ? (
              <p className="text-slate-500 text-sm h-[220px] flex items-center justify-center">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData.viewsTimeSeries} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#475569" />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#475569" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    labelStyle={{ color: '#cbd5e1' }}
                    formatter={(value) => [value, 'Views']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area type="monotone" dataKey="views" stroke="#f59e0b" fill="url(#viewsGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Reserve / pay clicks over time</h2>
            {chartData.eventsTimeSeries.length === 0 ? (
              <p className="text-slate-500 text-sm h-[220px] flex items-center justify-center">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData.eventsTimeSeries} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#475569" />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#475569" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    formatter={(value) => [value, 'Clicks']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Bar dataKey="events" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Clicks" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Top pages (by views)</h2>
            {chartData.topPaths.length === 0 ? (
              <p className="text-slate-500 text-sm h-[220px] flex items-center justify-center">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={chartData.topPaths}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#475569" allowDecimals={false} />
                  <YAxis type="category" dataKey="path" tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#475569" width={80} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    formatter={(value) => [value, 'Views']}
                    labelFormatter={(_, payload) => payload?.[0]?.payload?.fullPath ?? ''}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Views" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Events by type</h2>
            {chartData.eventTypePie.length === 0 ? (
              <p className="text-slate-500 text-sm h-[220px] flex items-center justify-center">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={chartData.eventTypePie}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: '#64748b' }}
                  >
                    {chartData.eventTypePie.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} stroke="#1e293b" strokeWidth={1} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    formatter={(value, name) => [value, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Detail tables (collapsible) */}
        <div className="border border-slate-700/50 rounded-xl overflow-hidden bg-slate-800/30">
          <button
            type="button"
            onClick={() => setShowTables((s) => !s)}
            className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-semibold text-slate-300 hover:bg-slate-800/50 transition"
          >
            {showTables ? 'Hide' : 'Show'} raw data (page views & events)
            <span className="text-slate-500">{showTables ? '▼' : '▶'}</span>
          </button>
          {showTables && (
            <div className="border-t border-slate-700/50 divide-y divide-slate-700/50">
              <section className="p-4">
                <h3 className="text-sm font-medium text-slate-400 mb-3">Page views</h3>
                <div className="overflow-x-auto rounded-lg border border-slate-700/50">
                  {pageViews.length === 0 ? (
                    <p className="p-4 text-slate-500 text-sm">No page views recorded yet.</p>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-700 bg-slate-800/50">
                          <th className="p-3 font-medium text-slate-400">Time</th>
                          <th className="p-3 font-medium text-slate-400">Path</th>
                          <th className="p-3 font-medium text-slate-400">IP</th>
                          <th className="p-3 font-medium text-slate-400 hidden md:table-cell">User agent</th>
                          <th className="p-3 font-medium text-slate-400 hidden lg:table-cell">Referrer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...pageViews].reverse().slice(0, 50).map((v, i) => (
                          <tr key={i} className="border-b border-slate-700/30">
                            <td className="p-3 text-slate-300">{new Date(v.timestamp).toLocaleString()}</td>
                            <td className="p-3">{v.path || '/'}</td>
                            <td className="p-3 font-mono text-amber-400/90">{v.ip}</td>
                            <td className="p-3 text-slate-500 hidden md:table-cell max-w-xs truncate" title={v.userAgent}>{v.userAgent}</td>
                            <td className="p-3 text-slate-500 hidden lg:table-cell max-w-xs truncate" title={v.referrer}>{v.referrer || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {pageViews.length > 50 && (
                    <p className="p-3 text-slate-500 text-xs border-t border-slate-700/30">Showing latest 50 of {pageViews.length}</p>
                  )}
                </div>
              </section>
              <section className="p-4">
                <h3 className="text-sm font-medium text-slate-400 mb-3">Events (reserve / pay clicks)</h3>
                <div className="overflow-x-auto rounded-lg border border-slate-700/50">
                  {events.length === 0 ? (
                    <p className="p-4 text-slate-500 text-sm">No events recorded yet.</p>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-700 bg-slate-800/50">
                          <th className="p-3 font-medium text-slate-400">Time</th>
                          <th className="p-3 font-medium text-slate-400">Event</th>
                          <th className="p-3 font-medium text-slate-400">IP</th>
                          <th className="p-3 font-medium text-slate-400 hidden md:table-cell">Path</th>
                          <th className="p-3 font-medium text-slate-400 hidden lg:table-cell">User agent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...events].reverse().slice(0, 50).map((e, i) => (
                          <tr key={i} className="border-b border-slate-700/30">
                            <td className="p-3 text-slate-300">{new Date(e.timestamp).toLocaleString()}</td>
                            <td className="p-3 text-amber-400/90 font-medium">{e.eventName || '—'}</td>
                            <td className="p-3 font-mono">{e.ip}</td>
                            <td className="p-3 text-slate-500 hidden md:table-cell">{e.path || '—'}</td>
                            <td className="p-3 text-slate-500 hidden lg:table-cell max-w-xs truncate" title={e.userAgent}>{e.userAgent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {events.length > 50 && (
                    <p className="p-3 text-slate-500 text-xs border-t border-slate-700/30">Showing latest 50 of {events.length}</p>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
