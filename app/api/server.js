// /pages/api/run-script.js
import { exec } from 'child_process';

export default function handler(res) {
  exec('python3 app/functions/writeToDb.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).json({ error: 'Error executing script' });
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).json({ message: 'Script executed successfully', output: stdout });
  });
}
