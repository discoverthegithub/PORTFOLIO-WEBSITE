import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyBW5Wd3QjwpXZcy1rc8CyCE_7ww3rOVwZc';
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // Wait, GoogleGenerativeAI doesn't have a listModels method exposed.
        // Actually, one can just fetch from the REST API directly.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log(data.models.map(m => m.name));
    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
