current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
node_image := node:gallium-alpine

install:
	@docker run --rm --interactive --workdir /app --user $(id -u):$(id -g) \
		--volume $(current-dir):/app \
		--volume $(HOME)/.npm:/root/.npm \
		$(node_image) \
			npm install


test:
	@docker run --rm --interactive --workdir /app --user $(id -u):$(id -g) \
		--volume $(current-dir):/app \
		--volume $(HOME)/.npm:/root/.npm \
		$(node_image) \
			npm run test:ci

shell:
	@docker run --rm -it --workdir /app --user $(id -u):$(id -g) \
		--volume $(current-dir):/app \
		--volume $(HOME)/.npm:/root/.npm \
		$(node_image) \
			/bin/sh