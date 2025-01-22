import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Update CORS configuration
app.use(cors({
  origin: ['https://luminatewebsol.com', 'http://luminatewebsol.com'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());

app.use(express.json());
console.log("Backend Connected");


app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message);
    
    // Spawn Python process with explicit path
    const pythonPath = 'python'; // or 'python3' depending on your system
    const scriptPath = path.join(__dirname, 'app.py');
    
    console.log('Executing Python script:', scriptPath);
    
    const pythonProcess = spawn(pythonPath, [
      scriptPath,
      '--message', 
      message
    ]);
    
    let responseData = '';
    let errorData = '';
    
    // Collect data from Python script
    pythonProcess.stdout.on('data', (data) => {
      console.log('Python stdout:', data.toString());
      responseData += data.toString();
    });
    
    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
      console.error('Python stderr:', data.toString());
      errorData += data.toString();
    });
    
    // Handle completion
    pythonProcess.on('close', (code) => {
      console.log('Python process exited with code:', code);
      
      if (code !== 0) {
        console.error('Python error output:', errorData);
        return res.status(500).json({ 
          error: 'Chatbot process failed',
          details: errorData
        });
      }

      if (responseData.trim()) {
        res.json({ response: responseData.trim() });
      } else {
        res.status(500).json({ 
          error: 'No response from chatbot',
          details: errorData || 'No error details available'
        });
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// app.get('/marketing-cards', async (req, res) => {
//     const collection = db.collection('marketing');
//     const gettech = await collection.find({}).toArray(); 
//     res.status(200).json(gettech);
// });
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

