(() => {
  const isAuthenticated = localStorage.getItem('authenticated');

  if (isAuthenticated !== 'true') {
    const next = encodeURIComponent(window.location.pathname.split('/').pop() || 'shop.html');
    window.location.replace(`login.html?next=${next}`);
  }
})();
