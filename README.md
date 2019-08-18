# pencil-durability-kata
A code kata for practicing TDD and clean coding principles.

Running this code does require node to be installed, but if you are running it on a Mac with Homebrew installed, then the make mac-install command will dispatch Homebrew to handle the node installation for you. Otherwise, node has very straigthforward documentation for downloading:
    https://nodejs.org/en/download/
And if you are a Mac user that does not have Homebrew, I would highly reccomend it! Find it at:
    https://brew.sh

Installing on a Mac with Homebrew installed:
Run the following terminal command in the project folder:
    $ make mac-install

Installing on Unix, including a non-Homebrew Mac machine (this will require node to already be installed):
Run the following:
    $ make install

Then, to run the tests:
    $ make test

And to run a node Read-Eval-Print-Loop with the Pencil class already in context:
    $ make repl