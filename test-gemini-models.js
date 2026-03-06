import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyBW5Wd3QjwpXZcy1rc8CyCE_7ww3rOVwZc';
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log('Available models:', data.models.map(m => m.name).filter(n => n.includes('gemini')));
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
