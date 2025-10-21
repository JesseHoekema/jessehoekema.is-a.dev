import type { PageServerLoad } from './$types';

type Project = {
    title: string;
    description: string;
    link: string;
};
type GitHubRepo = {
    name: string;
    description: string | null;
    html_url: string;
};

const USERNAME = 'jessehoekema';
const SELECTED_REPOS = [
    'jessehoekema.is-a.dev',
    'BubbleCloud',
    'OpenHost',
    'SomtodayAuthToken',
    'AuthToday',
    'DesktopFloppa',
    'ScratchChatBot',
    'Dockify',
    'now-playing-spotify',
    'RadioNet',
    'ascii-os',
    'microOS',
    'game-console-100',
    'touchbarfun',
    '1Checkbox'
];

async function fetchAllRepos(): Promise<Project[]> {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const data: GitHubRepo[] = await response.json();

    const filtered = data.filter((repo: GitHubRepo) => SELECTED_REPOS.includes(repo.name));

    const sorted = SELECTED_REPOS
        .map(name => filtered.find((repo: GitHubRepo) => repo.name === name))
        .filter((repo): repo is GitHubRepo => !!repo) 
        .map((repo: GitHubRepo) => ({
            title: repo.name,
            description: repo.description || 'No description available.',
            link: repo.html_url
        }));

    return sorted;
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
