BIN=./node_modules/.bin

mac-install:
	brew install yarn
	yarn install
	NODE_ENV="development" yarn --ignore-engines

install:
	curl -o- -L https://yarnpkg.com/install.sh | bash
	yarn install
	NODE_ENV="development" yarn --ignore-engines

test: jest

jest:
	BABEL_ENV=test ${BIN}/jest

build:
	chmod +x index.js

repl:
	./index.js