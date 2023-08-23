import { promises as fs } from "fs"
import path from "path"

const packages = ["@handsontable/react", "handsontable"]

for (const pkg of packages) {
  const filePath = path.join(process.cwd(), `node_modules/${pkg}/package.json`)

  const data = await fs.readFile(filePath, "utf-8")
  const packageJson = JSON.parse(data)

  // Delete the exports field
  delete packageJson.exports

  // Write the modified package.json back
  await fs.writeFile(filePath, JSON.stringify(packageJson, null, 2))
}
