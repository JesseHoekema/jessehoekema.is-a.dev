if (typeof window !== 'undefined') {
  const root = document.documentElement;

  const updateTheme = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Apply immediately
  updateTheme();

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
}
