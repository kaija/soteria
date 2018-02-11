IMG='soteria'
TAG='latest'
.PHONY: all build
all: build

build:
	docker build -t ${IMG}:${TAG} -f cicd/Dockerfile .

run:
	docker run -it --rm -p 3000:3000 -e LD_LIBRARY_PATH=/usr/src/app/node_modules/cares/build/Release  ${IMG}:${TAG}
