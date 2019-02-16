// Transcript from interactive session
var wasmSDK = "~/Dev/mono-wasm";
var build = "~/Dev/build";
var files = new List<string>();
files.AddRange(Directory.GetFiles($@"{wasmSDK}/framework/", "*.dll"));
files.AddRange(Directory.GetFiles($@"{wasmSDK}/wasm-bcl/wasm/", "*.dll"));
files.AddRange(Directory.GetFiles($@"{wasmSDK}/wasm-bcl/wasm/Facades/", "*.dll"));
Directory.CreateDirectory(build);
Directory.CreateDirectory($@"{build}/bin");
File.Copy($@"{wasmSDK}/release/mono.js", $@"{build}/mono.js", true);
File.Copy($@"{wasmSDK}/release/mono.wasm", $@"{build}/mono.wasm", true);
foreach (var file in files)
{
  File.Copy(file, $@"{build}/bin/{Path.GetFileName(file)}", true);
}

var text = File.ReadAllText($@"{build}/mono.js");
text = text.Replace("debugger", "");
File.WriteAllText($@"{build}/mono.js", text);
Console.WriteLine(
  string.Join(
    Environment.NewLine,
    files
      .Select(f => Path.GetFileName(f))
      .Select(f => f?.Replace(".dll", ""))
      .OrderBy(n => n)
      .ToArray())
);
