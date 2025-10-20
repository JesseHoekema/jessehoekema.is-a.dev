// src/routes/projects/+page.server.ts
import type { PageServerLoad } from './$types';

type Project = {
    title: string;
    description: string;
    link: string;
};

const USERNAME = 'jessehoekema';

async function fetchAllRepos(page = 1, repos: Project[] = []): Promise<Project[]> {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?page=${page}&per_page=100`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const data = await response.json();

    const formatted = data.map((repo: any) => ({
        title: repo.name,
        description: repo.description || 'No description available.',
        link: repo.html_url
    }));

    repos.push(...formatted);

    const nextPageLink = response.headers.get('Link');
    const hasNextPage = nextPageLink && nextPageLink.includes('rel="next"');
    if (hasNextPage) {
        return fetchAllRepos(page + 1, repos);
    }

    return repos;
}

export const load: PageServerLoad = async () => {
    try {
        const projects = await fetchAllRepos();
        return { projects };
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return { projects: [] };
    }
};
