type Theme = 'light' | 'dark' | 'system';

let currentTheme: Theme = (localStorage.getItem('theme') as Theme) || 'system';

export const applyTheme = () => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  const effective = currentTheme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : currentTheme;
  
  root.classList.add(effective);
};

export const setTheme = (theme: Theme) => {
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  applyTheme();
};

export const getTheme = (): Theme => currentTheme;

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (currentTheme === 'system') applyTheme();
});

applyTheme();
