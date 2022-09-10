export function createRepos(repos) {
  repos.forEach((item) => {
    const reposList = document.querySelector('.main__user-repos');

    const reposItem = document.createElement('li');
    reposItem.classList.add('main__user-repos-item');

    const reposLink = document.createElement('a');
    reposLink.classList.add('main__user-repos-link');
    reposLink.innerText = `${item.name || "This repo doesn't have the name"}`;
    reposLink.setAttribute('href', item.html_url || '#');
    reposLink.setAttribute('target', '_blank');

    reposItem.append(reposLink);
    reposList.append(reposItem);
  });
}
