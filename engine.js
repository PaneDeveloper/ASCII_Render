// engine.js - O "Cérebro" do Server.js agora rodando no navegador

export const MAPS = {
    classic: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
    hires: " .:-=+*#%@BWM#",
    blocks: "█▓▒░ ",
    particles: "●",
    binary: "01"
};

// Simulação do sistema de arquivos que antes ficava no Node
window.LOCAL_STORAGE_FILES = JSON.parse(localStorage.getItem('ascii_gallery') || '[]');

export function getDeviceType() {
    const ua = navigator.userAgent;
    if (/smart-tv|googletv|appletv|hbbtv|netcast|viera/i.test(ua)) return "TV";
    if (/Watch/i.test(ua)) return "Relógio";
    if (/tablet|ipad/i.test(ua)) return "Tablet";
    if (/mobile|android|iphone|ipad/i.test(ua)) return "Telefone";
    return "PC";
}

export function getHardwareSpecs() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    let gpu = "GPU Não detectada";
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        gpu = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "GPU Genérica (Browser)";
    }
    const cpu = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "Desconhecido";
    const ram = navigator.deviceMemory ? `~${navigator.deviceMemory}GB` : "Desconhecido";
    const screen = `${window.screen.width}x${window.screen.height} (@${window.devicePixelRatio}x)`;
    const device = getDeviceType();

    return {
        device, cpu, ram, gpu, screen,
        fullString: `[ DISPOSITIVO: ${device} | CPU: ${cpu} | RAM: ${ram} | GPU: ${gpu} | TELA: ${screen} ]`
    };
}

export async function getRemoteFiles() {
    // Tenta detectar o dono e o repositório a partir da URL do GitHub Pages
    // Formato esperado: username.github.io/repo/ ou similar
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const repoName = pathParts[0] || 'NOME_DO_REPOSITORIO';
    const owner = window.location.hostname.split('.')[0];
    
    // Se não estiver no GitHub Pages (localhost), você pode definir manualmente aqui:
    const folderPath = 'ASCII_Render/Arquivos_Render';
    const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${folderPath}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.warn("Não foi possível listar arquivos via GitHub API (Pode ser o limite de requisições ou lista.json vazio).");
            return [];
        }
        
        const items = await response.json();
        
        // Filtra apenas arquivos de imagem e vídeo, ignorando o lista.json
        return items.filter(item => 
            item.type === 'file' && 
            item.name !== 'lista.json' &&
            /\.(mp4|webm|jpg|jpeg|png|gif)$/i.test(item.name)
        ).map(f => ({
            name: f.name,
            type: /\.(mp4|webm)$/i.test(f.name) ? 'video' : 'image',
            url: f.download_url, // URL direta para o arquivo bruto (raw)
            isRemote: true
        }));
    } catch (e) {
        console.error("Erro ao escanear pasta do GitHub:", e);
        return [];
    }
}

export async function saveToLocalGallery(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = {
                name: file.name,
                type: file.type.includes('image') ? 'image' : 'video',
                url: e.target.result,
                isRemote: false
            };
            window.LOCAL_STORAGE_FILES.push(fileData);
            localStorage.setItem('ascii_gallery', JSON.stringify(window.LOCAL_STORAGE_FILES));
            resolve(fileData);
        };
        reader.readAsDataURL(file);
    });
}

export async function getBatteryManager() {
    if (!navigator.getBattery) return null;
    return navigator.getBattery().catch(() => null);
}