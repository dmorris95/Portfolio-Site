import { useEffect, useState } from "react";

const featuredProjects = [
  {
    id: "advanced-react-web-application",
    title: "Advanced React Web Application",
    description:
      "A modern React app demonstrating component composition, routing, state management, and clean UI patterns.",
    tech: ["React", "Vite", "Bootstrap"],
    repoUrl: "https://github.com/dmorris95/advanced-react-web-application",
    demoUrl: "", // STILL NEED TO ADD
    coverUrl: "", 
    snippetTitle: "Custom hook example",
    snippet: "" // ENTER SNIPPET
  },
  {
    id: "mechanic-shop-flask",
    title: "Mechanic Shop (Flask)",
    description:
      "Flask + SQL project for managing customers, vehicles, work orders, and service history with clean REST endpoints.",
    tech: ["Python", "Flask", "SQLAlchemy", "SQLite/PostgreSQL"],
    repoUrl: "https://github.com/dmorris95/Mechanic_Shop_Flask",
    demoUrl: "", // STILL NEED TO ADD
    coverUrl: "",
    snippetTitle: "Example Flask route",
    snippet: "" // USE DIFFERENT SNIPPET
  }, 
  {
    id: "nyc-wifi-map",
    title: "NYC Wi-Fi Map",
    description:
      "Interactive map visualizing public Wi-Fi locations in NYC with clustering and friendly popups.",
    tech: ["JavaScript", "Leaflet", "Pandas"],
    repoUrl: "https://github.com/dmorris95/NYC_Wifi_Map",
    demoUrl: "",
    coverUrl: "",
    snippetTitle: "Leaflet init + cluster",
    snippet: `import L from "leaflet";
    import "leaflet.markercluster";

    const map = L.map("map").setView([40.7128, -74.0060], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    const markers = L.markerClusterGroup();
    geojson.features.forEach(f => {
    const [lng, lat] = f.geometry.coordinates;
    const m = L.marker([lat, lng]).bindPopup(\`<b>\${f.properties.ssid}</b>\`);
    markers.addLayer(m);
    });
    map.addLayer(markers);`,
  },
];


const GITHUB_USERNAME = "dmorris95";
async function fetchRepos(username) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((r) => ({
      id: r.id,
      title: r.name,
      description: r.description || "No description",
      tech: [],
      repoUrl: r.html_url,
      demoUrl: r.homepage || "",
      snippetTitle: "README excerpt",
      snippet: r.description || "// See repository for details",
    }));
  } catch {
    return [];
  }
}

function ProjectCard({ p }) {
  const [showCode, setShowCode] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:bg-zinc-900 transition">
      {p.coverUrl && (
        <img
          src={p.coverUrl}
          alt={`${p.title} cover`}
          className="w-full aspect-video object-cover rounded-xl mb-3 border border-zinc-800"
          loading="lazy"
        />
      )}
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm opacity-90">{p.description}</p>

      {p.tech?.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li key={t} className="text-xs px-2 py-1 rounded-full bg-zinc-800">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex gap-3 flex-wrap">
        {p.repoUrl && (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 hover:opacity-90"
          >
            View Repo
          </a>
        )}
        {p.demoUrl && (
          <button
            onClick={() => setShowDemo((s) => !s)}
            className="text-xs px-3 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800"
          >
            {showDemo ? "Hide Demo" : "Live Demo"}
          </button>
        )}
        {p.snippet && (
          <button
            onClick={() => setShowCode((s) => !s)}
            className="text-xs px-3 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800"
          >
            {showCode ? "Hide Snippet" : "Show Snippet"}
          </button>
        )}
      </div>

      {showCode && p.snippet && (
        <div className="mt-3 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
          {p.snippetTitle && (
            <div className="px-3 py-2 text-xs border-b border-zinc-800 opacity-80">
              {p.snippetTitle}
            </div>
          )}
          <pre className="p-3 overflow-auto text-xs leading-relaxed">
            <code>{p.snippet}</code>
          </pre>
        </div>
      )}

      {showDemo && p.demoUrl && (
        <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-zinc-800">
          <iframe
            src={p.demoUrl}
            title={`${p.title} demo`}
            className="w-full h-full"
            loading="lazy"
            allow="clipboard-write; encrypted-media; fullscreen; geolocation; microphone; camera"
          />
        </div>
      )}
    </article>
  );
}

function Projects() {
  const [autoRepos, setAutoRepos] = useState([]);

  useEffect(() => {
    if (!GITHUB_USERNAME) return;
    fetchRepos(GITHUB_USERNAME).then(setAutoRepos);
  }, []);

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      <p className="mt-2 opacity-80">
        A selection of things I’ve built. Click “Show Snippet” for a peek, or “Live Demo” when available.
      </p>

      {/* Featured (curated) */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {featuredProjects.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>

      {/* Auto recent repos */}
      {autoRepos.length > 0 && (
        <>
          <h3 className="mt-10 text-xl font-semibold opacity-90">Recent GitHub Activity</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {autoRepos.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Projects;