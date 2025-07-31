const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const appDir = path.dirname(process.execPath);

const app = express();
const PORT = 3001;

const noCache = {
	etag: false,
	lastModified: false,
	cacheControl: false,
	maxAge: 0,
};

// Where to extract everything
const tempDir = path.join(os.tmpdir(), 'PACS_temp');

// Serve files from ./public
app.use(express.static(path.join(__dirname, 'public')));

// Serve generated and extracted files from temp dir
app.use(express.static(tempDir));

// Files to extract individually
const singleFiles = [
  'convert_shell',
  'convert_hyphen',
  'cs.html',
  'cs.q',
  'download_shell',
  'launch',
  'search_shell',
  'sentence1.tmp',
  'sentence2.tmp',
  'sentenceout.txt'
];

// Helper to copy a single file from bundled __dirname to tempDir
async function extractSingleFile(fileName) {
  const src = path.join(__dirname, fileName);
  const dest = path.join(tempDir, fileName);
  const data = await fs.promises.readFile(src);
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  await fs.promises.writeFile(dest, data);
}

// Helper to recursively copy a directory
async function copyRecursive(srcDir, destDir) {
  await fs.promises.mkdir(destDir, { recursive: true });
  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else {
      const data = await fs.promises.readFile(srcPath);
      await fs.promises.writeFile(destPath, data);
    }
  }
}

// Extract everything before your server starts
async function extractAllAssets() {
  try {
    await Promise.all(singleFiles.map(file => extractSingleFile(file)));
    console.log('Assets extracted to:', tempDir);
  } catch (err) {
    console.error('Failed to extract assets:', err.message);
    process.exit(1);
  }
}

// Kick off the extraction early
(async () => {
	await extractAllAssets();
	console.log('All assets extracted');
	startUpLaunch();
	console.log('launch script executed');
})();

function startUpLaunch() {
	const launchScriptPath = path.join(tempDir, 'launch');

	// Then run the extracted script from disk, with TMPDIR env var
	exec(`TMPDIR="${tempDir}" bash "${launchScriptPath}"`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Startup script error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`Startup script stderr: ${stderr}`);
		}
		console.log(`Startup script stdout: ${stdout}`);
	});
}

app.use((req, res, next) => {
	res.set('Cache-Control', 'no-store');
	next();
});

app.use(express.static(path.join(__dirname, 'public'), noCache));
app.use(express.text());

app.use(express.static(__dirname, noCache));

app.post('/convert', (req, res) => {
	const content = req.body;
	const execDir = path.dirname(process.execPath);
	const filePath = path.join(tempDir, 'sentence1.tmp');

	fs.writeFile(filePath, content, (err) => {
		if (err) {
			console.error('Error saving file:', err);
			//return res.status(500).send('Failed to save file');
		}
		console.log('Text saved to sentence1.tmp');
		console.log(content);
	});
	const scriptPath = path.join(__dirname, 'convert_shell');

	// Read the script from the bundled asset
	fs.readFile(scriptPath, 'utf8', (readErr, data) => {
		if (readErr) {
			console.error(`Error reading bundled script: ${readErr.message}`);
			return res.status(500).send('Failed to read script');
		}

		// Write to a temp file
		const tempPath = path.join(os.tmpdir(), 'convert_shell');
		fs.writeFile(tempPath, data, { mode: 0o755 }, (writeErr) => {
			if (writeErr) {
				console.error(`Error writing temp script: ${writeErr.message}`);
				return res.status(500).send('Failed to write temp script');
			}

			// Execute the script from the temp location
			exec(`TMPDIR="${tempDir}" APPDIR="${appDir}" bash "${tempPath}"`, (error, stdout, stderr) => {
				if (error) {
					console.error('Script error:', error);
					return res.status(500).send('Script failed');
				}
				console.log('Convert script complete');

				const targetFile = path.join(tempDir, 'sentenceout.txt');

				const maxWait = 5000; // wait this many milliseconds
				const interval = 100;
				let waited = 0;

				const waitForFile = setInterval(() => {
					if (fs.existsSync(targetFile)) {
						const stats = fs.statSync(targetFile);
						if (stats.size > 10) {
							clearInterval(waitForFile);
							console.log('Sentence created!');
							res.send('Sentence ready');
							return;
						}
					}
					waited += interval;
					if (waited >= maxWait) {
						clearInterval(waitForFile);
						console.warn('Timed out waiting for sentence');
						res.status(500).send('Timeout: sentence not ready');
					}
				}, interval);
			});
		});
	});
});

app.post('/convert_hyphen', (req, res) => {
	const content = req.body;
	const execDir = path.dirname(process.execPath);
	const filePath = path.join(tempDir, 'sentence1.tmp');

	fs.writeFile(filePath, content, (err) => {
		if (err) {
			console.error('Error saving file:', err);
			//return res.status(500).send('Failed to save file');
		}
		console.log('Text saved to sentence1.tmp');
		console.log(content);
	});
	const scriptPath = path.join(__dirname, 'convert_hyphen');

	// Read the script from the bundled asset
	fs.readFile(scriptPath, 'utf8', (readErr, data) => {
		if (readErr) {
			console.error(`Error reading bundled script: ${readErr.message}`);
			return res.status(500).send('Failed to read script');
		}

		// Write to a temp file
		const tempPath = path.join(os.tmpdir(), 'convert_hyphen');
		fs.writeFile(tempPath, data, { mode: 0o755 }, (writeErr) => {
			if (writeErr) {
				console.error(`Error writing temp script: ${writeErr.message}`);
				return res.status(500).send('Failed to write temp script');
			}

			// Execute the script from the temp location
			exec(`TMPDIR="${tempDir}" APPDIR="${appDir}" bash "${tempPath}"`, (error, stdout, stderr) => {
				if (error) {
					console.error('Script error:', error);
					return res.status(500).send('Script failed');
				}
				console.log('Convert script complete');

				const targetFile = path.join(tempDir, 'sentenceout.txt');

				const maxWait = 5000; // wait this many milliseconds
				const interval = 100;
				let waited = 0;

				const waitForFile = setInterval(() => {
					if (fs.existsSync(targetFile)) {
						const stats = fs.statSync(targetFile);
						if (stats.size > 10) {
							clearInterval(waitForFile);
							console.log('Sentence created!');
							res.send('Sentence ready');
							return;
						}
					}
					waited += interval;
					if (waited >= maxWait) {
						clearInterval(waitForFile);
						console.warn('Timed out waiting for sentence');
						res.status(500).send('Timeout: sentence not ready');
					}
				}, interval);
			});
		});
	});
});

app.post('/search', (req, res) => {
	const content = req.body;
	const execDir = path.dirname(process.execPath);
	const filePath = path.join(appDir, 'cs.q');

	fs.writeFile(filePath, content, (err) => {
		if (err) {
			console.error('Error saving file:', err);
			//return res.status(500).send('Failed to save file');
		}
		console.log('Query saved to cs.q');
		console.log(content);
	});
	const scriptPath = path.join(__dirname, 'search_shell');

	// Read the script from the bundled asset
	fs.readFile(scriptPath, 'utf8', (readErr, data) => {
		if (readErr) {
			console.error(`Error reading bundled script: ${readErr.message}`);
			return res.status(500).send('Failed to read script');
		}

		// Write to a temp file
		const tempPath = path.join(os.tmpdir(), 'search_shell');
		fs.writeFile(tempPath, data, { mode: 0o755 }, (writeErr) => {
			if (writeErr) {
				console.error(`Error writing temp script: ${writeErr.message}`);
				return res.status(500).send('Failed to write temp script');
			}

			// Execute the script from the temp location
			exec(`TMPDIR="${tempDir}" APPDIR="${appDir}" bash "${tempPath}"`, (error, stdout, stderr) => {
				if (error) {
					console.error('Script error:', error);
					return res.status(500).send('Script failed');
				}
				console.log('Search script complete');

				const targetFile = path.join(tempDir, 'cs.html');

				const maxWait = 990000; // wait this many milliseconds
				const interval = 500;
				let waited = 0;

				const waitForFile = setInterval(() => {
					if (fs.existsSync(targetFile)) {
						const stats = fs.statSync(targetFile);
						if (stats.size > 10) {
							clearInterval(waitForFile);
							console.log('Search results created!');
							res.send('Search results ready');
							return;
						}
					}
					waited += interval;
					if (waited >= maxWait) {
						clearInterval(waitForFile);
						console.warn('Timed out waiting for search results');
						res.status(500).send('Timeout: search results not ready');
					}
				}, interval);
			});
		});
	});
});

app.post('/download', (req, res) => {
	const scriptPath = path.join(__dirname, 'download_shell');

	// Read the script from the bundled asset
	fs.readFile(scriptPath, 'utf8', (readErr, data) => {
		if (readErr) {
			console.error(`Error reading bundled script: ${readErr.message}`);
			return res.status(500).send('Failed to read script');
		}

		// Write to a temp file
		const tempPath = path.join(os.tmpdir(), 'download_shell');
		fs.writeFile(tempPath, data, { mode: 0o755 }, (writeErr) => {
			if (writeErr) {
				console.error(`Error writing temp script: ${writeErr.message}`);
				return res.status(500).send('Failed to write temp script');
			}

			// Execute the script from the temp location
			exec(`TMPDIR="${tempDir}" APPDIR="${appDir}" bash "${tempPath}"`, (error, stdout, stderr) => {
				if (error) {
					console.error('Script error:', error);
					return res.status(500).send('Script failed');
				}
				console.log('Download script complete');
				res.send('Download script complete');
			});
		});
	});
});

app.post('/quit_exit', (req, res) => {
	res.send('Server shutting down...');
	console.log('Received /quit_exit request. Shutting down server...');
	process.exit(0); // Exit the Node process
});

const server = app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});