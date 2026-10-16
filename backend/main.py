import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="PromptFlow AI - Backend Core")

# Permitir conexión con el frontend de React (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    idea: str
    style: str
    camera: str
    aspect_ratio: str = "--ar 16:9"

@app.get("/")
def health_check():
    return {"status": "online", "ecosystem": "PromptFlow AI"}

@app.post("/api/generate-prompt")
async def generate_prompt(data: PromptRequest):
    if not data.idea.strip():
        raise HTTPException(status_code=400, detail="La idea no puede estar vacía.")

    api_key = os.getenv("OPENAI_API_KEY")

    # Mapeo de estilos y cámaras a descripciones técnicas de alta gama
    camera_descriptions = {
        "Slow Zoom In": "smooth dynamic slow push-in zoom camera movement towards the subject",
        "Dynamic Panning Left": "cinematic sweeping left pan camera movement revealing atmospheric depth",
        "Drone Shot Rotation": "overhead agile FPV drone 360-degree orbital rotation shot",
        "Hyper Slow Motion": "ultra high-speed 120fps slow-motion capture, suspended cinematic particles"
    }

    style_modifiers = {
        "Cinemático 8K": "35mm IMAX cinematography, photorealistic textures, dramatic volumetric lighting, 8k resolution, color graded",
        "Anime Shonen": "high-octane modern anime aesthetic, ufotable inspired, sharp dynamic line-art, vibrant visual effects",
        "Cyberpunk": "dystopian neo-tokyo aesthetics, neon reflections, rain-slicked streets, atmospheric fog, ray tracing",
        "3D Digital": "Unreal Engine 5 render, Octane render, clean stylized 3D surfaces, ambient occlusion"
    }

    cam_text = camera_descriptions.get(data.camera, data.camera)
    style_text = style_modifiers.get(data.style, data.style)

    # Si hay clave real de OpenAI configurada:
    if api_key and not api_key.startswith("sk-proj-tu_clave"):
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key)
            prompt_system = (
                "You are an elite AI Prompt Engineer for video generation models (Kling AI, Runway Gen-3, Sora). "
                "Transform the user's idea, style, and camera movement into a single, cohesive, ultra-detailed cinematic prompt in English. "
                "Output ONLY the final prompt without explanations or conversational text."
            )
            user_msg = f"Idea: {data.idea} | Visual Style: {style_text} | Camera: {cam_text}"
            
            completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": prompt_system},
                    {"role": "user", "content": user_msg}
                ],
                temperature=0.7
            )
            output_prompt = completion.choices[0].message.content.strip()
        except Exception:
            # Fallback en caso de corte o saldo agotado
            output_prompt = f"Cinematic shot of {data.idea}, {cam_text}, {style_text}, photorealistic, master shot --ar 16:9"
    else:
        # Fallback local inmediato
        output_prompt = f"Ultra-detailed cinematic masterwork depicting {data.idea}. {cam_text}. {style_text}, atmospheric haze, global illumination, 8k UHD --ar 16:9"

    return {
        "status": "success",
        "prompt": output_prompt,
        "style": data.style,
        "camera": data.camera
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)