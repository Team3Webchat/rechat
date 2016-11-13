# Rechat
Make sure to use an editor that has an eslint extension, so we can enforce a styleguide
on the code.
Recommended editors:  
* [VS Code](https://code.visualstudio.com/)  
* [Atom](https://atom.io/)

## Setup
* Clone the repository `git clone https://github.com/Team3Webchat/rechat.git`
* Make sure all dependencies are installed  
```sh
# If on windows
npm install
cd server
npm install
cd ../ui
npm install

# If on linux (should work on mac aswell)
sudo ./tools/install.sh n # replace n with y to use yarn instead of npm
```
* Setup database todo
* Seed database todo

Some global npm packages needs to be installed to get eslint
up and running, this is due to the nature of create-react-app and how
it hides the eslint dependency. Just copy paste the row below into your terminal

```sh
npm install -g eslint-config-react-app@0.3.0 eslint@3.8.1 babel-eslint@7.0.0 eslint-plugin-react@6.4.1 eslint-plugin-import@2.0.1 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-flowtype@2.21.0
```

## Running
### Server
Be sure to be in the server directory
* npm run start

### UI
Be sure to be in the ui directory
* npm run start

## Workflow
* Make sure you have the latest changes   
```sh
  git pull origin master
```
* Create a new local branch to work on
```sh
git checkout -b your-branch
```
* Stage your changes and commit them
```sh
git add . # or
git commit -am "Meaningful commitmessage that explains what you have done"
```
* Get the latest changes from master since someone else might have done changes to
the code since you started working
```sh
git pull origin master
```
* Solve possible conflicts TODO: info on how to solve merge conflicts
* Merge and push changes
```sh
  git checkout master
  git merge --no-ff your-branch
  git push origin master
  git branch -d your-branch # deletes local branch. optional. keep it if you want
```
OR IF YOU WANT SOMEONE ELSE TO REVIEW YOUR CODE BEFORE MERGING

```sh
  git push origin your-branch # pushes your local branch to github
  # and then go to github, create a pull request and tell someone else
  # to make a review and merge your pr into master.
```
