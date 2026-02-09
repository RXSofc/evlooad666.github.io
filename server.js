const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// KONFIGURASI GITHUB - Token dan Username Anda
const GITHUB_TOKEN = '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';
const GITHUB_USERNAME = 'RXSofc';

// Middleware
app.use(cors());
app.use(express.json());

// Setup multer untuk upload file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint untuk membuat repo dan upload files
app.post('/create-repo', upload.array('files'), async (req, res) => {
    try {
        const { repoName, description, isPrivate } = req.body;
        const files = req.files;
        const paths = req.body.paths;
        
        console.log(`📦 Membuat repository: ${repoName}`);
        
        // Step 1: Buat repository
        const createRepoResponse = await fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
                'User-Agent': 'GitHub-Repo-Creator'
            },
            body: JSON.stringify({
                name: repoName,
                description: description || '',
                private: isPrivate === 'true',
                auto_init: true // Inisialisasi dengan README
            })
        });
        
        if (!createRepoResponse.ok) {
            const error = await createRepoResponse.json();
            throw new Error(error.message || 'Gagal membuat repository');
        }
        
        const repoData = await createRepoResponse.json();
        console.log(`✅ Repository ${repoName} berhasil dibuat`);
        
        // Tunggu sebentar agar repo ter-inisialisasi
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Step 2: Upload semua file
        const pathsArray = Array.isArray(paths) ? paths : [paths];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filePath = pathsArray[i] || file.originalname;
            
            console.log(`📤 Mengupload file: ${filePath}`);
            
            // Convert buffer ke base64
            const content = file.buffer.toString('base64');
            
            const uploadResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contents/${filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${GITHUB_TOKEN}`,
                        'Content-Type': 'application/json',
                        'User-Agent': 'GitHub-Repo-Creator'
                    },
                    body: JSON.stringify({
                        message: `Add ${filePath}`,
                        content: content
                    })
                }
            );
            
            if (!uploadResponse.ok) {
                const error = await uploadResponse.json();
                throw new Error(`Gagal upload ${filePath}: ${error.message}`);
            }
            
            console.log(`✅ File ${filePath} berhasil diupload`);
        }
        
        // Sukses!
        res.json({
            success: true,
            repoUrl: repoData.html_url,
            message: `Repository berhasil dibuat dan ${files.length} file telah diupload`
        });
        
        console.log(`🎉 Semua proses selesai!`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'Server berjalan',
        message: 'GitHub Repository Creator Backend',
        username: GITHUB_USERNAME
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`👤 GitHub Username: ${GITHUB_USERNAME}`);
    console.log(`🔑 Token tersimpan dengan aman di backend`);
});
