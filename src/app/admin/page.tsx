"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface CompetitionEntry {
  id: string;
  full_name: string;
  email: string;
  instagram_handle: string | null;
  tiktok_handle: string | null;
  caption: string | null;
  media_url: string | null;
  created_at: string;
  is_featured: boolean;
  is_winner: boolean;
  competition_id: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entries, setEntries] = useState<CompetitionEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchEntries();
      } else {
        alert("Invalid password");
      }
    } catch {
      alert("Error authenticating");
    } finally {
      setLoading(false);
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/admin/entries");
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch {
      console.error("Error fetching entries");
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/entries/${id}/featured`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_featured: !current }),
      });
      fetchEntries();
    } catch {
      alert("Error updating entry");
    }
  };

  const toggleWinner = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/entries/${id}/winner`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_winner: !current }),
      });
      fetchEntries();
    } catch {
      alert("Error updating entry");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <form onSubmit={handleLogin} className="max-w-md w-full px-4">
            <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] p-8">
              <h1 className="font-heading text-2xl font-bold mb-4">Admin Login</h1>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full rounded-lg bg-[#0B0B0C] border border-[#1A1B1F] px-4 py-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-heading text-4xl font-bold">Admin Dashboard</h1>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="rounded-full bg-[#111215] px-4 py-2 text-sm font-medium hover:bg-[#1A1B1F]"
              >
                Logout
              </button>
            </div>

            <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0B0B0C]">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Instagram</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Featured</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1B1F]">
                    {entries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-[#a1a1aa]">
                          No entries yet
                        </td>
                      </tr>
                    ) : (
                      entries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-[#0B0B0C]">
                          <td className="px-6 py-4 text-sm">{entry.full_name}</td>
                          <td className="px-6 py-4 text-sm text-[#a1a1aa]">{entry.email}</td>
                          <td className="px-6 py-4 text-sm text-[#a1a1aa]">
                            {entry.instagram_handle || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#a1a1aa]">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => toggleFeatured(entry.id, entry.is_featured)}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                entry.is_featured
                                  ? "bg-[#A78BFA] text-white"
                                  : "bg-[#1A1B1F] text-[#a1a1aa]"
                              }`}
                            >
                              {entry.is_featured ? "Yes" : "No"}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => toggleWinner(entry.id, entry.is_winner)}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                entry.is_winner
                                  ? "bg-[#6EE7F9] text-[#0B0B0C]"
                                  : "bg-[#1A1B1F] text-[#a1a1aa]"
                              }`}
                            >
                              {entry.is_winner ? "Yes" : "No"}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

