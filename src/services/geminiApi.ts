const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function sendMessageToGemini(message: string, image?: string): Promise<string> {
  const payload: any = {
    contents: [{
      parts: []
    }]
  };

  // Add text if provided
  if (message.trim()) {
    payload.contents[0].parts.push({
      text: message
    });
  }

  // Add image if provided
  if (image) {
    // Remove data URL prefix to get just the base64 data
    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];
    
    payload.contents[0].parts.push({
      inline_data: {
        mime_type: mimeType,
        data: base64Data
      }
    });
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Resposta inválida da API');
    }
  } catch (error) {
    console.error('Erro ao chamar API do Gemini:', error);
    throw new Error('Não foi possível processar sua mensagem. Tente novamente.');
  }
}