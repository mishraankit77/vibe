import { ArrowLeft, Check, Rocket, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deployLoadingId, setDeployLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const handleGetAllWebsites = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await axios.get(`${serverUrl}/api/website/get-all`, {
          withCredentials: true,
        });

        console.log("Websites fetched:", result.data);
        setWebsites(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        console.error("Error fetching websites:", err);
        setError(err.response?.data?.message || "Something went wrong on the server");
      } finally {
        setLoading(false);
      }
    };

    handleGetAllWebsites();
  }, []);

  const handleDeploy = async (id) => {
    try {
      setDeployLoadingId(id);

      const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, {
        withCredentials: true,
      });

      if (result?.data?.url) {
        window.open(result.data.url, "_blank");

        setWebsites((prev) =>
          prev.map((w) =>
            w._id === id
              ? {
                  ...w,
                  deployed: true,
                  deployUrl: result.data.url,
                }
              : w
          )
        );
      }
    } catch (err) {
      console.error("Error deploying website:", err);
      alert(err.response?.data?.message || "Failed to deploy website");
    } finally {
      setDeployLoadingId(null);
    }
  };

  const handleCopy = async (site) => {
    try {
      if (!site?.deployUrl) return;

      await navigator.clipboard.writeText(site.deployUrl);
      setCopiedId(site._id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg p-2 transition hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          <button
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
            onClick={() => navigate("/generate")}
          >
            + New Website
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="mb-1 text-sm text-zinc-400">Welcome Back</p>
          <h1 className="text-3xl font-bold">{userData?.name || "User"}</h1>
        </motion.div>

        {loading && (
          <div className="mt-24 text-center text-zinc-400">
            Loading Your Websites...
          </div>
        )}

        {error && !loading && (
          <div className="mt-24 text-center text-red-400">{error}</div>
        )}

        {!loading && !error && websites.length === 0 && (
          <div className="mt-24 text-center text-zinc-400">
            You have no websites
          </div>
        )}

        {!loading && !error && websites.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {websites.map((w, i) => {
              const copied = copiedId === w._id;
              const deploying = deployLoadingId === w._id;

              return (
                <motion.div
                  key={w._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
                >
                  <div
                    className="relative h-40 cursor-pointer bg-black"
                    onClick={() => navigate(`/editor/${w._id}`)}
                  >
                    <iframe
                      srcDoc={w.latestCode || ""}
                      title={w.title || "Website Preview"}
                      className="absolute inset-0 h-[140%] w-[140%] origin-top-left scale-[0.72] bg-white pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <h3 className="line-clamp-2 text-base font-semibold">
                      {w.title || "Untitled Website"}
                    </h3>

                    <p className="text-xs text-zinc-400">
                      Last Updated{" "}
                      {w.updatedAt
                        ? new Date(w.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </p>

                    {!w.deployed ? (
                      <button
                        className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => handleDeploy(w._id)}
                        disabled={deploying}
                      >
                        <Rocket size={18} />
                        {deploying ? "Deploying..." : "Deploy"}
                      </button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(w)}
                        className={`mt-auto flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                          copied
                            ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                            : "border border-white/10 bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            Link Copied
                          </>
                        ) : (
                          <>
                            <Share2 size={14} />
                            Share Link
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;