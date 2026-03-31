import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"];

/**
 * Vite plugin that scans public/projects/{slug}/ folders
 * and generates a virtual module `virtual:gallery-manifest`
 * exporting { [slug]: ["/projects/slug/img1.png", ...] }
 *
 * Usage in code:
 *   import galleryManifest from "virtual:gallery-manifest";
 *   // galleryManifest.saputipu => ["/projects/saputipu/1.png", "/projects/saputipu/2.png"]
 */
export default function galleryPlugin() {
  const virtualModuleId = "virtual:gallery-manifest";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  function scanGalleries(publicDir) {
    const projectsDir = path.join(publicDir, "projects");
    console.log(`[GalleryPlugin] Scanning: ${projectsDir}`);
    const manifest = {};

    if (!fs.existsSync(projectsDir)) {
      console.log(`[GalleryPlugin] Directory not found: ${projectsDir}`);
      return manifest;
    }

    const slugs = fs.readdirSync(projectsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    console.log(`[GalleryPlugin] Found project slugs: ${slugs.join(", ")}`);

    for (const slug of slugs) {
      const slugDir = path.join(projectsDir, slug);
      const files = fs.readdirSync(slugDir)
        .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

      manifest[slug] = files.map((f) => `/projects/${slug}/${f}`);
      console.log(`[GalleryPlugin] Project "${slug}" gallery: ${manifest[slug].length} images`);
    }

    return manifest;
  }

  let publicDir;

  return {
    name: "vite-plugin-gallery",

    configResolved(config) {
      publicDir = config.publicDir;
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        const manifest = scanGalleries(publicDir);
        return `export default ${JSON.stringify(manifest, null, 2)};`;
      }
    },

    // Re-scan when files change in public/projects during dev
    configureServer(server) {
      const projectsDir = path.join(publicDir, "projects");
      if (fs.existsSync(projectsDir)) {
        server.watcher.add(projectsDir);
        server.watcher.on("all", (event, filePath) => {
          // Normalize paths for comparison
          const normalizedFilePath = path.resolve(filePath);
          const normalizedProjectsDir = path.resolve(projectsDir);

          if (normalizedFilePath.startsWith(normalizedProjectsDir)) {
            // Invalidate the virtual module so it gets re-loaded
            const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
            if (mod) {
              server.moduleGraph.invalidateModule(mod);
              server.ws.send({ type: "full-reload" });
            }
          }
        });
      }
    },
  };
}
