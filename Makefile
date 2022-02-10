current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
node_image := node:gallium-alpine

install: CMD=npm install
install_ci: CMD=npm ci
validate: CMD=npm run validate
test: CMD=npm run test:ci

node install install_ci validate test:
	@docker run --rm --interactive --workdir /app --user $(id -u):$(id -g) \
		--volume $(current-dir):/app \
		--volume $(HOME)/.npm:/root/.npm \
		$(node_image) \
			$(CMD)

shell:
	@docker run --rm -it --workdir /app --user $(id -u):$(id -g) \
		--volume $(current-dir):/app \
		--volume $(HOME)/.npm:/root/.npm \
		$(node_image) \
			/bin/sh