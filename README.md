# pencil-durability-kata
A code kata for practicing TDD and clean coding principles.
Running this code does require node to be installed, but if you are running it on a Mac then the install-mac make command will dispatch homebrew to handle the node installation for you.

Installing on a Mac:
Run the following terminal command in the project folder:
    $ make install-mac

Installing on Unix:
Run the following:
    $ make install

Then, to run the tests:
    $ make test

And to run a node Read-Eval-Print-Loop with the Pencil class already in context:
    $ make repl