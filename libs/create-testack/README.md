# create-testack

to test the package:
```
cd $(mktemp -d -t ci-XXXXXXXXXX)
npm init testack@latest
```

to test locally:
```
npm run build
npm run create-testack
npm publish
```




test usage:
to execute the package you have two options:
1. using the wizard `npm run start`
2. using arguments (skip the wizard): `npm run start -- --name=testproject --template=js`
