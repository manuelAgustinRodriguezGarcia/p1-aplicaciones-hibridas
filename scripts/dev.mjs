import { execSync, spawn } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const port = 3333
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

function killPort() {
    try {
        const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" })
        const pids = new Set()
        for (const line of out.split(/\r?\n/)) {
            if (!line.includes("LISTENING")) continue
            const parts = line.trim().split(/\s+/)
            const pid = parts[parts.length - 1]
            if (/^\d+$/.test(pid)) pids.add(pid)
        }
        for (const pid of pids) {
            execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" })
        }
    } catch {
        // Puerto libre o sin procesos
    }
}

killPort()

const child = spawn(process.execPath, ["--watch", "main.js"], {
    cwd: root,
    stdio: "inherit",
    shell: false,
})

child.on("exit", (code) => process.exit(code ?? 0))
