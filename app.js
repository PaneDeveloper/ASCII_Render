// app.js - Lógica portada do Server.js para rodar 100% no navegador

const ASCII_MAPS = {
    classic: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
    hires: " .:-=+*#%@BWM#",
    blocks: "█▓▒░ ",
    binary: "01"
};

// Substitui o /api/hardware (lspci não funciona no browser por segurança)
async function getHardwareInfo() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return { hasGPU: false, gpus: ["WebGL não suportado"] };

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "GPU Genérica (Browser)";

    return {
        hasGPU: true,
        gpus: [renderer]
    };
}

// Substitui os POSTs /api/process-image-simple e /api/process-video-frame
function renderAscii(pixels, settings) {
    const { style, brightness, inverted } = settings;
    let asciiChars = ASCII_MAPS[style] || ASCII_MAPS.classic;
    if (inverted) asciiChars = asciiChars.split("").reverse().join("");
    
    const br = brightness || 1.1;
    let result = "";
    
    for (let i = 0; i < pixels.length; i += 4) {
        // Cálculo do brilho (mesma lógica do servidor)
        const avg = ((pixels[i] + pixels[i+1] + pixels[i+2]) / 3) * br;
        const charIndex = Math.floor((avg / 255) * (asciiChars.length - 1));
        result += asciiChars[charIndex] || " ";
    }
    return result;
}

// Detecção de dispositivo via UserAgent
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/smart-tv|googletv|appletv|hbbtv|netcast|viera/i.test(ua)) return "TV";
    if (/mobile|android|iphone|ipad/i.test(ua)) return "Celular";
    return "PC";
}

// Simulação de sistema de arquivos (Local)
let localFiles = [];

function saveFileLocally(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = {
                name: file.name,
                size: file.size,
                url: e.target.result,
                type: file.type.includes('image') ? 'image' : 'video'
            };
            localFiles.push(fileData);
            resolve(fileData);
        };
        reader.readAsDataURL(file);
    });
}

// Interface global para o seu HTML antigo (AG.html) chamar
window.ASCII_SERVICE = {
    process: (pixels, settings) => {
        console.log(`[RENDER] Rodando engine ${settings.style} no ${getDeviceType()}`);
        return renderAscii(pixels, settings);
    },
    getHardware: getHardwareInfo,
    getDevice: getDeviceType,
    saveFile: saveFileLocally,
    getFiles: async () => {
        try {
            const response = await fetch('/api/files');
            const serverFiles = await response.json();
            return [...localFiles, ...serverFiles];
        } catch (error) {
            console.error("Erro ao buscar arquivos da galeria:", error);
            return localFiles;
        }
    }
};