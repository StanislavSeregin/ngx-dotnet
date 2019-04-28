# How to update 'ngx-dotnet' package
- Open [this](https://jenkins.mono-project.com/job/test-mono-mainline-wasm/label=ubuntu-1804-amd64/lastSuccessfulBuild/Azure/) link to get MONO WebAssembly Last Successful Build
- Download .zip file designated with sdks/wasm/mono-wasm-###########.zip
- Extract the contents of zip
- Execute script './projects/ngx-dotnet/build-script.cs' in C# interactive
- Copy content from 'build/' to './projects/ngx-dotnet/src/assets/'
- Actualize './projects/ngx-dotnet/src/lib/bcl-dependency.ts' by script output
- Actualize './projects/ngx-dotnet/src/lib/bcl-dependencies.ts' by script output
- Build ngx-dotnet package to './dist' by command: 'yarn build-lib'
- Increment version of package ('./projects/ngx-dotnet/package.json')
- Publish package by command: 'npm publish'

License
----

MIT
