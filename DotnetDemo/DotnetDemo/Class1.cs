using System;

namespace DotnetDemo
{
    public class Class1
    {
        private static int _counter;

        static Class1()
        {
            _counter = 0;
        }

        public static int CounterNext()
        {
            _counter++;
            return _counter;
        }

        public static string GetNewGuid()
        {
            var guid = Guid.NewGuid();
            return guid.ToString();
        }
    }
}