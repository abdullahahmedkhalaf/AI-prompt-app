const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create the app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint (to verify your server works)
app.get('/', (req, res) => {
    res.json({ message: 'AI Prompt API is running!' });
});

// Main endpoint
app.post('/api/prompt', async (req, res) => {
    try {
        // 1. Get the prompt
        const { prompt } = req.body;
        
        // 2. Validate it
        if (!prompt || prompt.trim() === '') {
            res.status(400).json({
                success: false,
                error: 'Prompt empty!'
            });
        }
        
        if (prompt.length > 5000) {
            res.status(400).json({
                success: false,
                error: 'Prompt is very long!'
            });
        }
        
        // 3. For now, just echo back (mock response)
        // Later, this will call n8n!
        res.json({
            success: true,
            answer: `You said: ${prompt} (AI response will come in Week 3!)`
        });
        
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});