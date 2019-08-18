BIN=./node_modules/.bin

install-mac:
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

repl:
	node .