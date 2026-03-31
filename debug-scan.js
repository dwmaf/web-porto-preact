const fs = require('fs');
const path = require('path');

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];

function scanGalleries(publicDir) {
  const projectsDir = path.join(process.cwd(), publicDir, "projects");
  console.log(`Scanning: ${projectsDir}`);
  const manifest = {};

  if (!fs.existsSync(projectsDir)) {
    console.log(`Directory not found: ${projectsDir}`);
    return manifest;
  }

  const slugs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  console.log(`Found slugs: ${slugs.join(", ")}`);

  for (const slug of slugs) {
    const slugDir = path.join(projectsDir, slug);
    const files = fs.readdirSync(slugDir)
      .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort(); 

    manifest[slug] = files.map((f) => `/projects/${slug}/${f}`);
    console.log(`${slug}: ${manifest[slug].length} images found`);
    manifest[slug].forEach(img => console.log(`  - ${img}`));
  }

  return manifest;
}

scanGalleries("public");
