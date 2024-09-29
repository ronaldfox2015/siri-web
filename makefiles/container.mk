## CONTAINER VARS ##
USERNAME_LOCAL ?= "$(shell whoami)"
UID_LOCAL      ?= "$(shell id -u)"
GID_LOCAL      ?= "$(shell id -g)"

IMAGE_BUILD     = $(PROJECT_NAME):$(ENV)
CONTAINER_NAME  = $(PROJECT_NAME)_backend

DEV_TAG         ?= $(ENV)
IMAGE_DEV       = $(PROJECT_NAME):$(DEV_TAG)
PREFIX_PATH     = /$(VERSION)/$(SERVICE_NAME)
VIRTUAL_HOST	= /$(VERSION)/$(SERVICE_NAME)*
MODE			= image
IMAGE_DEPLOY_DEV = $(PROJECT_NAME):$(ENV)

YARN_ENVIRONMENT = "--production"

build:##@Global Build project : make build MODE=image, make build MODE=build-dist
ifeq ($(MODE), image)
	docker build --build-arg UID=$(USER_ID) --build-arg GID=$(GROUP_ID) -f docker/dev/Dockerfile --no-cache -t $(IMAGE_BUILD)  ./docker
endif
ifeq ($(MODE), build-dist)
	@docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_BUILD} \
		yarn build
	@ls -l ${PWD}/${APP_DIR}/dist
endif

install: ##@Global install dependencies : make install YARN_ENVIRONMENT="-save-dev @types/winston"
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_DEPLOY_DEV} \
		npm install $(YARN_ENVIROMMENT)

install-local:
	make install YARN_ENVIRONMENT="";


up: ##@Local Start the project
	export IMAGE_DEV="$(IMAGE_BUILD)" && CONTAINER_NAME="$(CONTAINER_NAME)" && PATH_SERVICE="$(PATH_SERVICE)" && NETWORK=${DOCKER_NETWORK} \
		docker-compose -p $(SERVICE_NAME) up backend

up-doc: ##@Local Start the project
	export SERVICE_NAME="$(SERVICE_NAME)doc" && IMAGE_DEV="$(IMAGE_DEPLOY_DEV)" && PROJECT_NAME="$(PROJECT_NAME)" && PATH_SERVICE="local.statistic-documentation.com" && NETWORK=${NETWORK} \
		docker-compose -p $(SERVICE_NAME)doc up -d frontend

down: ##@Local Destroy the project
	docker rm -f $(CONTAINER_NAME)

down-doc: ##@Local Destroy the project
	docker rm -f  neoauto-dev-paymentv2doc_frontend

log: ##@Local Show project logs
	@docker logs -f $(CONTAINER_NAME)

hooks-app: ##@Local hooks the project
	cp $(PWD)/hooks/pre-commit .git/hooks/ && chmod +x .git/hooks/pre-commit
	cp $(PWD)/hooks/prepare-commit-msg .git/hooks/ && chmod +x .git/hooks/prepare-commit-msg

ssh: ##@Local Access the docker container
	@docker container run -it --rm \
  	-u ${_LOCAL}:${GID_LOCAL} \
  			--network="neo_network" \
	-v "${PWD}/${APP_DIR}":/${APP_DIR} \
	$(IMAGE_DEPLOY_DEV) /bin/sh

lint: ##@Global install dependencies
	@docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
  	-u ${UID_LOCAL}:${GID_LOCAL} \
		${IMAGE_DEPLOY_DEV} \
		pnpm lint

format: ##@Global install dependencies
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
  	-u ${UID_LOCAL}:${GID_LOCAL} \
		${IMAGE_DEPLOY_DEV} \
		pnpm lint:format



doc: ##@Global Build project
	@docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		-p 8080:8080 \
		${IMAGE_DEPLOY_DEV} \
		pnpm doc

remove: ##@Local remove container
	@docker-compose rm -v

sync-container-config: ##@Deploy Sync configs files from S3
	aws s3 sync s3://$(INFRA_BUCKET)/config/container/$(OWNER)/$(ENV)/$(SERVICE_NAME)/ app/ --profile ${ACCOUNT_ENV}

push-config: ##@Deploy Sync configs files from S3
	aws s3 cp app/.env s3://$(INFRA_BUCKET)/config/container/$(OWNER)/$(ENV)/$(SERVICE_NAME)/.env --profile ${ACCOUNT_ENV}

container-upload-app-config: ##@Deploy Sync configs files from S3
	@aws s3 cp app/.env s3://$(INFRA_BUCKET)/config/container/$(OWNER)/$(ENV)/$(SERVICE_NAME)/ --profile ${ENV}

create-migration: ##@Global Create migration make create-migration MIGRATION=CreateTableEntityProduct
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		--network=${DOCKER_NETWORK} \
		${IMAGE_DEPLOY_DEV} \
		pnpm migrate:generate ${MIGRATION}

migrate:
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		--network=${DOCKER_NETWORK} \
		${IMAGE_DEPLOY_DEV} \
		pnpm migrate

rollback:
	@docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_DEPLOY_DEV} \
		--network=${NETWORK} \
			yarn rollback

development: up up-doc ##@Local Prepare the project for development
	@echo "The development environment is ready and running"
