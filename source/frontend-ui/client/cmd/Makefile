VERSION_FILE := ./version/version.go
PROJECT_NAME := apowine-client
BUILD_NUMBER := latest
VERSION := 0.11
REVISION=$(shell git log -1 --pretty=format:"%H")
DOCKER_REGISTRY?= aporeto
DOCKER_IMAGE_NAME?=$(PROJECT_NAME)
DOCKER_IMAGE_TAG?=$(BUILD_NUMBER)

build:
	env GOOS=linux GOARCH=386 go build

package: build
	mv cmd frontend
	cp -a ../../templates/. templates

clean:
	rm -rf vendor
	rm -rf frontend
	rm -rf templates

docker_build: package
		docker \
			build \
			-t $(DOCKER_REGISTRY)/$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG) .

docker_push: docker_build
		docker \
			push \
			$(DOCKER_REGISTRY)/$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)
