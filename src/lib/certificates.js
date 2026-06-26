// Automatically import all PDFs from the src/assets folder using Vite.
// Import the default URL directly so every certificate resolves to a renderable src.
const modules = import.meta.glob('../assets/*.pdf', {
  eager: true,
  import: 'default',
  query: '?url',
});

const certificates = Object.entries(modules).map(([modulePath, mod]) => {
  // modulePath is relative to this file; extract the filename
  const segments = modulePath.split('/');
  const fileName = segments[segments.length - 1];
  const title = fileName.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
  const fileUrl = typeof mod === 'string' ? mod : mod?.default ?? '';
  return {
    title,
    file: fileUrl,
    fileName,
  };
});

export default certificates;
