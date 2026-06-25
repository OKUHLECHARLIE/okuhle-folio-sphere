// Automatically import all PDFs from the src/assets folder using Vite
// Use a relative glob and eager loading so the result is available synchronously.
const modules = import.meta.glob('../assets/*.pdf', { eager: true });

const certificates = Object.entries(modules).map(([modulePath, mod]) => {
  // modulePath is relative to this file; extract the filename
  const segments = modulePath.split('/');
  const fileName = segments[segments.length - 1];
  const title = fileName.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
  const fileUrl = mod && mod.default ? mod.default : '';
  return {
    title,
    file: fileUrl,
    fileName,
  };
});

export default certificates;
