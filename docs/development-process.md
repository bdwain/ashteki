### Introduction
These notes are intended for an entry level developer who wishes to contribute to the ashteki code base.

### Development Process Guidelines
You will need a github account, from which you can fork the code from the main repository. Branch the code in your repository to a development/feature branch so that your main branch can keep up with the main repository's updates and you can develop your features separately.

VSCode installed on your computer is a useful tool for viewing the code base. With the appropriate feature branch selected, you can make edits to files, and then save them. Running 
```
npm test
```
from the repository root directory in a terminal prompt on your computer, or from inside VScode terminal will check functionality tests. If you are running ashteki using a Docker container, stopping and starting Docker will allow you to confirm functionality further by running a test game.

Once you are happy with your changes, commit them in VSCode. If the commit fixes a particular bug (e.g. #123) in the main repository, write 'fixes #123' (or fix, fixed, resolves or close) in your commit message then when  merge the pull request GitHub will link and close the issue that you are talking about. Synch to your Github repository, and from Github you can navigate to the main repository and make a Pull Request to have your changes incorporated into the main code base. Don't make new commits on that branch until the pull request has been resolved as your pull request will update automatically with the commits.