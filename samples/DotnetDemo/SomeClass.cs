using System;

namespace DotnetDemo
{
    public class SomeClass
    {
        private static int _counter;

        static SomeClass()
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