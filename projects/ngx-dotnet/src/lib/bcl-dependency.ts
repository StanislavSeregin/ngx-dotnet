export type BclDependency =
  'I18N'
  | 'I18N.CJK'
  | 'I18N.MidEast'
  | 'I18N.Other'
  | 'I18N.Rare'
  | 'I18N.West'
  | 'Microsoft.CSharp'
  | 'Microsoft.Win32.Primitives'
  | 'Microsoft.Win32.Registry'
  | 'Microsoft.Win32.Registry.AccessControl'
  | 'Mono.Security'
  | 'mscorlib'
  | 'netstandard'
  | 'nunitlite'
  | 'System'
  | 'System.AppContext'
  | 'System.Buffers'
  | 'System.Collections'
  | 'System.Collections.Concurrent'
  | 'System.Collections.NonGeneric'
  | 'System.Collections.Specialized'
  | 'System.ComponentModel'
  | 'System.ComponentModel.Annotations'
  | 'System.ComponentModel.Composition'
  | 'System.ComponentModel.DataAnnotations'
  | 'System.ComponentModel.EventBasedAsync'
  | 'System.ComponentModel.Primitives'
  | 'System.ComponentModel.TypeConverter'
  | 'System.Console'
  | 'System.Core'
  | 'System.Data'
  | 'System.Data.Common'
  | 'System.Data.DataSetExtensions'
  | 'System.Data.SqlClient'
  | 'System.Diagnostics.Contracts'
  | 'System.Diagnostics.Debug'
  | 'System.Diagnostics.FileVersionInfo'
  | 'System.Diagnostics.Process'
  | 'System.Diagnostics.StackTrace'
  | 'System.Diagnostics.TextWriterTraceListener'
  | 'System.Diagnostics.Tools'
  | 'System.Diagnostics.TraceEvent'
  | 'System.Diagnostics.TraceSource'
  | 'System.Diagnostics.Tracing'
  | 'System.Drawing.Common'
  | 'System.Drawing.Primitives'
  | 'System.Dynamic.Runtime'
  | 'System.Globalization'
  | 'System.Globalization.Calendars'
  | 'System.Globalization.Extensions'
  | 'System.IO'
  | 'System.IO.Compression'
  | 'System.IO.Compression.FileSystem'
  | 'System.IO.Compression.ZipFile'
  | 'System.IO.FileSystem'
  | 'System.IO.FileSystem.AccessControl'
  | 'System.IO.FileSystem.DriveInfo'
  | 'System.IO.FileSystem.Primitives'
  | 'System.IO.FileSystem.Watcher'
  | 'System.IO.IsolatedStorage'
  | 'System.IO.MemoryMappedFiles'
  | 'System.IO.Pipes'
  | 'System.IO.UnmanagedMemoryStream'
  | 'System.Linq'
  | 'System.Linq.Expressions'
  | 'System.Linq.Parallel'
  | 'System.Linq.Queryable'
  | 'System.Memory'
  | 'System.Net.AuthenticationManager'
  | 'System.Net.Cache'
  | 'System.Net.Http'
  | 'System.Net.HttpListener'
  | 'System.Net.Mail'
  | 'System.Net.NameResolution'
  | 'System.Net.NetworkInformation'
  | 'System.Net.Ping'
  | 'System.Net.Primitives'
  | 'System.Net.Requests'
  | 'System.Net.Security'
  | 'System.Net.ServicePoint'
  | 'System.Net.Sockets'
  | 'System.Net.Utilities'
  | 'System.Net.WebHeaderCollection'
  | 'System.Net.WebSockets'
  | 'System.Net.WebSockets.Client'
  | 'System.Numerics'
  | 'System.Numerics.Vectors'
  | 'System.ObjectModel'
  | 'System.Reflection'
  | 'System.Reflection.DispatchProxy'
  | 'System.Reflection.Emit'
  | 'System.Reflection.Emit.ILGeneration'
  | 'System.Reflection.Emit.Lightweight'
  | 'System.Reflection.Extensions'
  | 'System.Reflection.Primitives'
  | 'System.Reflection.TypeExtensions'
  | 'System.Resources.Reader'
  | 'System.Resources.ReaderWriter'
  | 'System.Resources.ResourceManager'
  | 'System.Resources.Writer'
  | 'System.Runtime'
  | 'System.Runtime.CompilerServices.Unsafe'
  | 'System.Runtime.CompilerServices.VisualC'
  | 'System.Runtime.Extensions'
  | 'System.Runtime.Handles'
  | 'System.Runtime.InteropServices'
  | 'System.Runtime.InteropServices.RuntimeInformation'
  | 'System.Runtime.InteropServices.WindowsRuntime'
  | 'System.Runtime.Loader'
  | 'System.Runtime.Numerics'
  | 'System.Runtime.Serialization'
  | 'System.Runtime.Serialization.Formatters'
  | 'System.Runtime.Serialization.Json'
  | 'System.Runtime.Serialization.Primitives'
  | 'System.Runtime.Serialization.Xml'
  | 'System.Security'
  | 'System.Security.AccessControl'
  | 'System.Security.Claims'
  | 'System.Security.Cryptography.Algorithms'
  | 'System.Security.Cryptography.Cng'
  | 'System.Security.Cryptography.Csp'
  | 'System.Security.Cryptography.DeriveBytes'
  | 'System.Security.Cryptography.Encoding'
  | 'System.Security.Cryptography.Encryption'
  | 'System.Security.Cryptography.Encryption.Aes'
  | 'System.Security.Cryptography.Encryption.ECDiffieHellman'
  | 'System.Security.Cryptography.Encryption.ECDsa'
  | 'System.Security.Cryptography.Hashing'
  | 'System.Security.Cryptography.Hashing.Algorithms'
  | 'System.Security.Cryptography.OpenSsl'
  | 'System.Security.Cryptography.Pkcs'
  | 'System.Security.Cryptography.Primitives'
  | 'System.Security.Cryptography.ProtectedData'
  | 'System.Security.Cryptography.RandomNumberGenerator'
  | 'System.Security.Cryptography.RSA'
  | 'System.Security.Cryptography.X509Certificates'
  | 'System.Security.Principal'
  | 'System.Security.Principal.Windows'
  | 'System.Security.SecureString'
  | 'System.ServiceModel.Internals'
  | 'System.ServiceProcess.ServiceController'
  | 'System.Text.Encoding'
  | 'System.Text.Encoding.CodePages'
  | 'System.Text.Encoding.Extensions'
  | 'System.Text.RegularExpressions'
  | 'System.Threading'
  | 'System.Threading.AccessControl'
  | 'System.Threading.Overlapped'
  | 'System.Threading.Tasks'
  | 'System.Threading.Tasks.Extensions'
  | 'System.Threading.Tasks.Parallel'
  | 'System.Threading.Thread'
  | 'System.Threading.ThreadPool'
  | 'System.Threading.Timer'
  | 'System.Transactions'
  | 'System.ValueTuple'
  | 'System.Xml'
  | 'System.Xml.Linq'
  | 'System.Xml.ReaderWriter'
  | 'System.Xml.XDocument'
  | 'System.Xml.XmlDocument'
  | 'System.Xml.XmlSerializer'
  | 'System.Xml.XPath'
  | 'System.Xml.XPath.XDocument'
  | 'System.Xml.XPath.XmlDocument'
  | 'System.Xml.Xsl.Primitives'
  | 'WebAssembly.Bindings'
  | 'WebAssembly.Net.Http'
  | 'WebAssembly.Net.WebSockets';
