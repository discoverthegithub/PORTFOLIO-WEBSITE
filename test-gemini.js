import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyBW5Wd3QjwpXZcy1rc8CyCE_7ww3rOVwZc';
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result = await model.generateContent('Hi');
        console.log('Success:', result.response.text());
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
