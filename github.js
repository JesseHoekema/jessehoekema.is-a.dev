async function fetchRepos(page = 1) {
    try {
      const response = await fetch(`https://api.github.com/users/jessehoekema/repos?page=${page}`);
      const data = await response.json();
      renderRepos(data);

      const nextPageLink = response.headers.get('Link');
      const hasNextPage = nextPageLink && nextPageLink.includes('rel="next"');
      if (hasNextPage) {
        const nextPage = page + 1;
        fetchRepos(nextPage);
      }
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
    }
  }

  function renderRepos(repos) {
    const root = document.getElementById('root');

    repos.forEach(repo => {
      const repoBox = document.createElement('div');
      repoBox.className = 'repo-box';

      const title = document.createElement('h2');
      title.textContent = repo.name;

      const description = document.createElement('p');
      description.textContent = repo.description || 'No description available.';

      repoBox.addEventListener('click', () => {
        window.open(repo.html_url, '_blank');
      });

      repoBox.appendChild(title);
      repoBox.appendChild(description);

      root.appendChild(repoBox);
    });
  }

  fetchRepos();