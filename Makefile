BIN=./node_modules/.bin

mac-install:
	brew install node
	NODE_ENV="development"

test: jest

jest:
	NODE_ENV="development"
	BABEL_ENV=test ${BIN}/jest

build:
	chmod +x index.js

repl:
	./index.js