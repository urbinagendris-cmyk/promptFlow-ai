import React, { useState } from "react";

export default function App() {
  const [idea, setIdea] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Cinemático 8K");
  const [selectedCamera, setSelectedCamera] = useState("Slow Zoom In");

  // Estado y opciones de Formato / Aspect Ratio
  const [aspectRatio, setAspectRatio] = useState("--ar 16:9");

  const aspectRatios = [
    { label: "TikTok / Reels (9:16)", value: "--ar 9:16" },
    { label: "YouTube / Cine (16:9)", value: "--ar 16:9" },
    { label: "Instagram (1:1)", value: "--ar 1:1" },
  ];
  
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [copied, setCopied] = useState(false);

  const trendingIdeas = [
    "Lobo cyber en lluvia de neón",
    "Portal interdimensional en el desierto",
    "Samurái en templo flotante",
    "Hypercar futurista a toda velocidad"
  ];

  const styles = [
    { name: "Cinemático 8K", desc: "Luz de película y texturas hiperrealistas" },
    { name: "Anime Shonen", desc: "Estilo animación japonesa dinámica" },
    { name: "Cyberpunk", desc: "Futurista, luces de neón y lluvia nocturna" },
    { name: "3D Digital", desc: "Estilo animación 3D estilizada y limpia" }
  ];

  const cameras = [
    "Slow Zoom In",
    "Dynamic Panning Left",
    "Drone Shot Rotation",
    "Hyper Slow Motion"
  ];

  const handleGenerate = async () => {
    if (!idea.trim()) return;

    setIsLoading(true);
    setGeneratedPrompt("");

    // Fases de carga para retención (Dwell Time frente a los anuncios)
    setLoadingStep("Sintetizando iluminación volumétrica...");
    await new Promise((r) => setTimeout(r, 900));

    setLoadingStep("Optimizando sintaxis para Kling AI & Runway Gen-3...");
    await new Promise((r) => setTimeout(r, 900));

    setLoadingStep("Estructurando movimiento de cámara en 8K...");
    await new Promise((r) => setTimeout(r, 700));

    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: idea,
          style: selectedStyle,
          camera: selectedCamera,
          aspect_ratio: aspectRatio,
        }),
      });

      if (!response.ok) throw new Error("Error en el servidor");
      const data = await response.json();
      setGeneratedPrompt(data.prompt);
    } catch (err) {
      // Fallback local por si el backend no está corriendo en ese instante
      setGeneratedPrompt(
        `Ultra-detailed cinematic masterwork depicting ${idea}. Dynamic ${selectedCamera} camera movement. ${selectedStyle} aesthetic, atmospheric haze, global illumination, 8k UHD ${aspectRatio}`
      );
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070711] text-gray-200 flex flex-col justify-between font-sans">
      
      {/* Banner superior de AdSense */}
      <header className="w-full py-4 flex justify-center border-b border-purple-950/40">
        <div className="w-[90%] max-w-4xl h-16 border border-dashed border-purple-900/50 rounded-lg flex items-center justify-center text-xs tracking-wider text-purple-400 bg-purple-950/10">
          [ ESPACIO PUBLICITARIO / GOOGLE ADSENSE 728x90 ]
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* Badge & Título */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs mb-4">
          ✨ El Secreto de los Videos Virales
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-center mb-2 tracking-tight text-white">
          PromptFlow <span className="text-purple-500">AI</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base text-center max-w-xl mb-10">
          Transforma ideas simples en prompts de ingeniería perfectos para Kling, Runway y Sora. ¡Evita videos deformes!
        </p>

        {/* Grid de 2 Columnas: Formulario a la izquierda | Anuncios + Afiliados a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          
          {/* Columna Izquierda: Generador */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* 1. Ideas Tendencia & Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  1. Describe tu idea simple (en español)
                </label>
              </div>

              {/* Píldoras de Tendencias rápidas */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <span className="text-[11px] text-purple-400 font-medium py-0.5">⚡ Tendencias:</span>
                {trendingIdeas.map((trend, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setIdea(trend)}
                    className="text-[11px] bg-purple-950/50 hover:bg-purple-900/60 border border-purple-800/40 text-purple-200 px-2.5 py-0.5 rounded-full transition-all"
                  >
                    {trend}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Ej: Un lobo solitario mirando la luna en una ciudad futurista..."
                className="w-full bg-[#0d0d1e] border border-purple-900/40 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-600 resize-none"
              />
            </div>

            {/* 2. Selector de Estilo Visual */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                2. Elige el estilo visual
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {styles.map((s) => (
                  <div
                    key={s.name}
                    onClick={() => setSelectedStyle(s.name)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedStyle === s.name
                        ? "border-purple-500 bg-purple-950/40 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]"
                        : "border-purple-900/30 bg-[#0d0d1e] hover:border-purple-800/60"
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{s.name}</div>
                    <div className="text-xs text-gray-400">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Selector de Cámara */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                3. Movimiento de cámara
              </label>
              <div className="flex flex-wrap gap-2">
                {cameras.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCamera(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedCamera === c
                        ? "border-purple-500 bg-purple-950/60 text-white"
                        : "border-purple-900/30 bg-[#0d0d1e] text-gray-400 hover:border-purple-800/60"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Selector de Formato / Aspect Ratio */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                4. Formato de video
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {aspectRatios.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAspectRatio(item.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      aspectRatio === item.value
                        ? "border-purple-500 bg-purple-950/60 text-white shadow-[0_0_12px_-2px_rgba(168,85,247,0.4)]"
                        : "border-purple-900/30 bg-[#0d0d1e] text-gray-400 hover:border-purple-800/60"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón Principal */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !idea.trim()}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 disabled:opacity-50 text-white transition-all shadow-[0_0_25px_-5px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {loadingStep}
                </span>
              ) : (
                "🪄 Generar Prompt Mágico"
              )}
            </button>

            {/* Terminal de Código con Prompt Generado */}
            {generatedPrompt && (
              <div className="p-4 rounded-xl border border-purple-500/40 bg-[#090915] shadow-[0_0_25px_-5px_rgba(168,85,247,0.2)] animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    <span className="font-mono text-purple-300 ml-2">PROMPT_ENGINEER.txt</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px]">● Listo para Kling / Runway</span>
                </div>

                <p className="my-4 font-mono text-sm text-gray-200 leading-relaxed break-words bg-black/50 p-3.5 rounded-lg border border-purple-950">
                  {generatedPrompt}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopy}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-950"
                    }`}
                  >
                    {copied ? "✓ ¡Copiado al Portapapeles!" : "📋 Copiar Prompt"}
                  </button>

                  <a
                    href="https://klingai.com"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-4 rounded-lg font-semibold text-xs bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white text-center transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/40"
                  >
                    🚀 Pegar en Kling AI ↗
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Columna Derecha: Banners Publicitarios y Enlaces de Afiliados */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Bloque Publicitario Lateral */}
            <div className="h-64 border border-dashed border-purple-900/50 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-purple-950/10">
              <span className="text-xs text-purple-400 font-bold mb-2">[ BLOQUE PUBLICITARIO ]</span>
              <p className="text-xs text-gray-500 max-w-xs">
                Los anuncios colocados aquí generarán ingresos pasivos cada vez que los usuarios interactúen con la app web.
              </p>
            </div>

            {/* Tarjetas de Afiliados */}
            <div className="border border-purple-900/30 rounded-xl p-4 bg-[#0d0d1e]">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">
                ⭐ IAs de Vídeo Recomendadas
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://klingai.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg border border-purple-900/30 bg-purple-950/20 hover:border-purple-600/50 transition-all block"
                >
                  <div className="text-xs font-bold text-white">Kling AI Pro</div>
                  <div className="text-[11px] text-gray-400">Prueba la mejor IA cinematográfica actual aquí.</div>
                </a>
                <a
                  href="https://runwayml.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg border border-purple-900/30 bg-purple-950/20 hover:border-purple-600/50 transition-all block"
                >
                  <div className="text-xs font-bold text-white">Runway Gen-3</div>
                  <div className="text-[11px] text-gray-400">Consigue créditos extra usando nuestro enlace.</div>
                </a>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Banner Inferior AdSense (Sticky Footer) */}
      <footer className="w-full py-3 border-t border-purple-950/40 bg-[#05050d] text-center text-xs text-gray-600">
        © 2026 PromptFlow AI. Desarrollado con Python + React.
      </footer>
    </div>
  );
}