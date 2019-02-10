// Transcript from interactive session
var sdkPath = "~/Dev/mono-wasm";
var sdk = "~/Dev/sdk";
var files = new List<string>();
files.AddRange(Directory.GetFiles($@"{sdkPath}/framework/", "*.dll"));
files.AddRange(Directory.GetFiles($@"{sdkPath}/wasm-bcl/wasm/", "*.dll"));
files.AddRange(Directory.GetFiles($@"{sdkPath}/wasm-bcl/wasm/Facades/", "*.dll"));
Directory.CreateDirectory(sdk);
Directory.CreateDirectory($@"{sdk}/bin");
foreach (var file in files)
{
    File.Copy(file, $@"{sdk}/bin/{Path.GetFileName(file)}", true);
}

File.Copy($@"{sdkPath}/release/mono.js", $@"{sdk}/mono.js", true);
File.Copy($@"{sdkPath}/release/mono.wasm", $@"{sdk}/mono.wasm", true);
var text = File.ReadAllText($@"{sdk}/mono.js");
text = text.Replace("debugger", "");
File.WriteAllText($@"{sdk}/mono.js", text);

Console.WriteLine(
    string.Join($@"{Environment.NewLine}",
    files
        .Select(f => Path.GetFileName(f))
        .OrderBy(n => n)
        .ToArray())
); 
