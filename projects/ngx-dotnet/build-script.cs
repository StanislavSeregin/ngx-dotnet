// Transcript from interactive session
var wasmSDK = "C:/Users/stas_/Downloads/mono-wasm";
var build = "C:/Users/stas_/Downloads/build";
var files = new List<string>();
files.AddRange(Directory.GetFiles($@"{wasmSDK}/framework/", "*.dll"));
files.AddRange(Directory.GetFiles($@"{wasmSDK}/wasm-bcl/wasm/", "*.dll"));
files.AddRange(Directory.GetFiles($@"{wasmSDK}/wasm-bcl/wasm/Facades/", "*.dll"));
Directory.CreateDirectory(build);
Directory.CreateDirectory($@"{build}/bin");
File.Copy($@"{wasmSDK}/builds/release/dotnet.js", $@"{build}/dotnet.js", true);
File.Copy($@"{wasmSDK}/builds/release/dotnet.wasm", $@"{build}/dotnet.wasm", true);
foreach (var file in files)
{
  File.Copy(file, $@"{build}/bin/{Path.GetFileName(file)}", true);
}

var text = File.ReadAllText($@"{build}/dotnet.js");
text = text.Replace("debugger", "");
File.WriteAllText($@"{build}/dotnet.js", text);
Console.WriteLine(
  string.Join(
    Environment.NewLine,
    files
      .Select(f => Path.GetFileName(f))
      .Select(f => f?.Replace(".dll", ""))
      .OrderBy(n => n)
      .ToArray())
);
