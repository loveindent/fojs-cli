> /!\ WORK IN PROGRESS

# Install
```shell
git clone this repository

cd fojs-cli

npm link
```

# Usage
```shell
fo # print man
fo start app <app-name> # create a new app in current directory
fo create component <name> # create a component in ./src/commons/components
```

# Configuration
Add a `.forc` file a the root of your repo.

## Available & Default values
```js
{
  "rootPath": "./src/commons"
}
```
