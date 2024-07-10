const axios = require('axios');

// Configure the API key
const apiKey = 'AIzaSyCi0mbXfp0uEBZpK7n-YnqR9tXT0tyXSM0';

// Get the model
async function getModel() {
    try {
        const response = await axios.get('https://api.palm.ml/models', {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });

        const models = response.data.models.filter(model => model.supported_generation_methods.includes('generateText'));
        if (models.length > 0) {
            return models[0].name;
        } else {
            throw new Error('No models found that support text generation.');
        }
    } catch (error) {
        console.error('Error fetching models:', error.message);
        throw error;
    }
}

// Define the prompt template
const promptTemplate = `
You are an expert at solving diet issues of people. Analyze the variable p and answer
whatever they ask, considering they are Indian. First, ask if they are vegetarian or non-vegetarian
and then answer according to their needs.

User question: {user_question}
Dietary preference: {diet_preference}
`;

// Function to generate a response
async function generateResponse(user_question, diet_preference) {
    const model_name = await getModel();

    const prompt = promptTemplate.replace('{user_question}', user_question).replace('{diet_preference}', diet_preference);

    try {
        const response = await axios.post(`https://api.palm.ml/models/${model_name}/generateText`, {
            prompt,
            max_length: 200 // Adjust as per your requirement
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });

        return response.data.text;
    } catch (error) {
        console.error('Error generating text:', error.message);
        throw error;
    }
}

// Example usage
async function exampleUsage() {
    try {
        const userQuestion = 'What should I eat for breakfast?';
        const dietPreference = 'Vegetarian';

        const response = await generateResponse(userQuestion, dietPreference);
        console.log('Generated Response:', response);
    } catch (error) {
        console.error('Example usage error:', error.message);
    }
}

exampleUsage(); // Run example usage

