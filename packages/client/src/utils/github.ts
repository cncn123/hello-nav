interface GitHubRepo {
  stargazers_count: number;
  full_name: string;
}

const cache = new Map<string, { stars: number; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const extractGitHubRepo = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'github.com') {
      const parts = urlObj.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        const repoPath = `${parts[0]}/${parts[1]}`;
        console.log('Extracted repo path:', repoPath, 'from URL:', url);
        return repoPath;
      }
    }
    console.log('Not a valid GitHub URL:', url);
    return null;
  } catch (error) {
    console.error('Error parsing URL:', url, error);
    return null;
  }
};

export const getGitHubStars = async (url: string): Promise<number | null> => {
  const repoPath = extractGitHubRepo(url);
  if (!repoPath) {
    console.log('Could not extract repo path from URL:', url);
    return null;
  }

  // Check cache
  const cached = cache.get(repoPath);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Using cached stars for:', repoPath, cached.stars);
    return cached.stars;
  }

  try {
    console.log('Fetching stars for repo:', repoPath);
    const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add your GitHub token here if needed
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      }
    });
    
    if (!response.ok) {
      console.error('GitHub API error:', response.status, await response.text());
      return null;
    }
    
    const data: GitHubRepo = await response.json();
    console.log('Received data for:', repoPath, 'stars:', data.stargazers_count);
    
    // Update cache
    cache.set(repoPath, {
      stars: data.stargazers_count,
      timestamp: Date.now()
    });
    console.log('Updated cache for:', repoPath);
    
    return data.stargazers_count;
  } catch (error) {
    console.error('Error fetching GitHub stars for:', repoPath, error);
    return null;
  }
};
